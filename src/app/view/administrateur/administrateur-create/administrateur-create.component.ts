import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

import {AdministrateurService} from '../../../controller/service/administrateur.service';


import {Ticket} from '../../../controller/model/ticket.model';

interface com {
    environnement: string;
}

interface priorite {
    priorite: string;
}

@Component({
    selector: 'app-administrateur-create',
    templateUrl: './administrateur-create.component.html',
    styleUrls: ['./administrateur-create.component.scss']
})
export class AdministrateurCreateComponent implements OnInit {
    environnements = new Array<com>();
    environnementSelected: com;
    priorites = new Array<priorite>();
    prioriteSelected: priorite;

    constructor(private messageService: MessageService, private service: AdministrateurService) {
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

    ngOnInit(): void {
        console.log('entred to create modal');
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public save() {
        this.submitted = true;
        this.selected.environnement = this.environnementSelected.environnement;
        this.selected.priorite = this.prioriteSelected.priorite;

        this.service.save().subscribe(
            data => {
                console.log('admin saved');
                this.ngOnInit();
            }, error => {
                console.log(error);
            }
        );

        this.items.push({...this.selected});
        this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Admin créée',
            life: 3000
        });
        //  });
        this.createDialog = false;
        this.selected = new Ticket();
        //  }
    }

    get selected(): Ticket {
        return this.service.selected;
    }

    set selected(value: Ticket) {
        this.service.selected = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Ticket> {
        return this.service.items;
    }

    set items(value: Array<Ticket>) {
        this.service.items = value;
    }

}
