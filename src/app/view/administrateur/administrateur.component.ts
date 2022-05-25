import {Component, OnInit} from '@angular/core';

import {ConfirmationService, MessageService} from 'primeng/api';

import {AdministrateurService} from '../../controller/service/administrateur.service';

import {DatePipe} from '@angular/common';
import {TicketVo} from '../../controller/model/ticket-vo.model';
import {Ticket} from '../../controller/model/ticket.model';
import {Developpeur} from '../../controller/model/developpeur.model';
interface com{
    environnement: string;
}
interface priorite{
    priorite: string;
}
@Component({
    selector: 'app-administrateur',
    templateUrl: './administrateur.component.html',
    styleUrls: ['./administrateur.component.scss']
})
export class AdministrateurComponent implements OnInit {

    cols: any[];
    environnements=new Array<com>();
    environnementSelected: com;
    priorites=new Array<priorite>();
    prioriteSelected: priorite;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: AdministrateurService, public datepipe: DatePipe) {
        this.environnements = [
            {environnement: 'Windows'},
            {environnement: 'Linux'},
            {environnement: 'Android'},
            {environnement: 'IOS'},
            {environnement: 'Mac Os'},
        ];

        this.priorites = [
            {priorite: 'critique'},
            {priorite: 'urgent'},
            {priorite: 'non urgent'},
            {priorite: 'normal'},

        ];
    }


    get developpeurs(): Array<Developpeur> {
        return this.service.developpeurs;
    }

    set developpeurs(value: Array<Developpeur>) {
        this.service.developpeurs = value;
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'titre', header: 'Titre'},
            {field: 'dateOuverture', header: 'DateOuverture'},
            {field: 'dateFermeture', header: 'DateFermeture'},
            {field: 'environnement', header: 'Environnement'},
            {field: 'logiciel', header: 'Logiciel'},
            {field: 'statut', header: 'Statut'},
            {field: 'priorite', header: 'Priorite'},

        ];

    }

    get ticketVo(): TicketVo {

        return this.service.ticketVo;
    }

    set ticketVo(value: TicketVo) {
        this.service.ticketVo = value;
    }

    public openCreate() {
        this.selected = new Ticket();
        console.log('marra mni hunaa');
        this.submitted = false;
        this.createDialog = true;
        console.log(this.createDialog);
    }

    public edit(ticket: Ticket) {
        this.selected = {...ticket};
        this.editDialog = true;
    }

    public view(ticket: Ticket) {
        this.selected = {...ticket};
        this.viewDialog = true;
    }

    public delete(selected: Ticket) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Etes-vous sûr que vous voulez supprimer cette ticket ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.items = this.items.filter(val => val.id !== this.selected.id);
                this.service.deleteById().subscribe(
                    data => {
                        console.log('admin deleted');

                    }, error => {
                        console.log(error);
                    }
                );
                //  this.service.calculTotal();
                this.selected = new Ticket();
                this.messageService.add({
                    severity: 'success',
                    summary: 'succès',
                    detail: 'ticket Supprimée',
                    life: 3000
                });

            }
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer ticket sélectionnée ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.service.deleteMultipleIndexById();
                // this.service.calculTotal();
                this.selectes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'ticket supprimées',
                    life: 3000
                });

            }
        });
    }

    get selected(): Ticket {
        return this.service.selected;
    }

    set selected(value: Ticket) {
        this.service.selected = value;
    }

    get items(): Array<Ticket> {
        return this.service.items;
    }

    set items(value: Array<Ticket>) {
        this.service.items = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get selectes(): Array<Ticket> {
        return this.service.selectes;
    }

    set selectes(value: Array<Ticket>) {
        this.service.selectes = value;
    }
    public rechercheMultiCritere(){
        this.ticketVo.environnement=this.environnementSelected.environnement;
        this.ticketVo.priorite=this.prioriteSelected.priorite;
        this.service.rechercheMultiCritere().subscribe(
            data=>{
                console.log("recheeeeerche multi critere");
                console.log(data);
                this.items=data;

            },error => {
                console.log(error);
            }
        );
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAllNonAffected().subscribe(
            data => {
                console.log('thiis is all tickets');
                console.log(data);
                this.items = data;
            }, error => {
                console.log(error);
            }
        );
        this.service.getAllDevelopers().subscribe(
            data => {
                console.log(data);
                this.developpeurs = data;
            }, error => {
                console.log(error);
            }
        );
        /* this.service.findClientById().subscribe(
             data=>{
               console.log(data);
               this.items=data['tickets'];
               console.log("********");
               console.log(data['tickets']);
             },error=>{
               console.log(error);
             }
         );*/
    }


}
