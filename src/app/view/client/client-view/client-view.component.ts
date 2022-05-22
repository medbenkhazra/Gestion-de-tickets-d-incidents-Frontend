import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {AdministrateurService} from '../../../controller/service/administrateur.service';
import {Administrateur} from '../../../controller/model/administrateur.model';
import {ClientService} from '../../../controller/service/client.service';
import {Ticket} from '../../../controller/model/ticket.model';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  constructor(private messageService: MessageService, private service: ClientService) { }

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
