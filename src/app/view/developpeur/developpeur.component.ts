import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';

import {DatePipe} from '@angular/common';
import {TicketVo} from '../../controller/model/ticket-vo.model';
import {Ticket} from '../../controller/model/ticket.model';
import {DeveloppeurService} from '../../controller/service/developpeur.service';
import {TokenStorageService} from '../../Security/_services/token-storage.service';
import {element} from 'protractor';
interface com{
  environnement: string;
}
interface priorite{
  priorite: string;
}
@Component({
  selector: 'app-developpeur',
  templateUrl: './developpeur.component.html',
  styleUrls: ['./developpeur.component.scss']
})
export class DeveloppeurComponent implements OnInit {
  cols: any[];
  environnements=new Array<com>();
  environnementSelected: com;
  priorites=new Array<priorite>();
  prioriteSelected: priorite;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: DeveloppeurService,public datepipe: DatePipe,private tokenStorageService: TokenStorageService) {

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




 /* public updateStatut()*/


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
    console.log("marra mni hunaa");
    this.submitted = false;
    this.createDialog = true;
    console.log(this.createDialog);
  }
  public edit(ticket: Ticket) {
    this.selected = {...ticket};
    this.editDialog = true;
  }

  public editStatut(ticket: Ticket) {
    this.selected = {...ticket};
    this.confirmationService.confirm({
      message: 'Etes-vous s??r que vous voulez valider cette ticket ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.service.editStatut().subscribe(
            data=>{
              console.log("staatut edited");
              this.selected=new Ticket();
              this.ngOnInit();
            },error => {
              console.log(error);
            }
        );





        this.selected = new Ticket();
        this.messageService.add({
          severity: 'success',
          summary: 'succ??s',
          detail: 'ticket Valid??e',
          life: 3000
        });

      }
    });



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

  public view(ticket: Ticket) {
    this.selected = {...ticket};
    this.viewDialog = true;
  }
  public delete(selected: Ticket) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Etes-vous s??r que vous voulez supprimer cette ticket ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.items = this.items.filter(val => val.id !== this.selected.id);
        this.service.deleteById().subscribe(
            data=>{
              console.log("admin deleted");

            },error=>{
              console.log(error);
            }
        );
        //  this.service.calculTotal();
        this.selected = new Ticket();
        this.messageService.add({
          severity: 'success',
          summary: 'succ??s',
          detail: 'ticket Supprim??e',
          life: 3000
        });

      }
    });
  }

  public deleteMultiple() {
    this.confirmationService.confirm({
      message: '??tes-vous s??r de vouloir supprimer ticket s??lectionn??e ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.service.deleteMultipleIndexById();
        // this.service.calculTotal();
        this.selectes = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Succ??s',
          detail: 'ticket supprim??es',
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

  ngOnInit(): void {
    this.initCol();
    /*   this.service.findAll().subscribe(
           data=>{
             console.log("thiis is all tickets");
             console.log(data);
             this.items=data;
           },error=>{
             console.log(error);
           }
       );*/
    this.tokenStorageService.findUserByUsername(this.tokenStorageService.getUser().username).subscribe(
        data=>{
          console.log("jaab data actual user");
          console.log(data);
          this.items=data['developpeur']['tickets'];
          this.items=this.items.filter(element=>element.statut=="en cours de traitement")
          console.log(this.items);
        },error=>{
          console.log(error);
        }
    );
  /*  this.service.findDeveloppeurById().subscribe(
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
