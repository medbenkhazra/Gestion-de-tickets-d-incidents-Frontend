import {Component, OnInit} from '@angular/core';

import {MessageService} from 'primeng/api';
import {AdministrateurService} from '../../../controller/service/administrateur.service';

import {Ticket} from '../../../controller/model/ticket.model';

@Component({
    selector: 'app-administrateur-view',
    templateUrl: './administrateur-view.component.html',
    styleUrls: ['./administrateur-view.component.scss']
})
export class AdministrateurViewComponent implements OnInit {

    constructor(private messageService: MessageService, private service: AdministrateurService) {
    }

    ngOnInit(): void {
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get selected(): Ticket {
        return this.service.selected;
    }

    set selected(value: Ticket) {
        this.service.selected = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

}
