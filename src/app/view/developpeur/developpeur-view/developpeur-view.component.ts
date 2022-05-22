import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ClientService} from '../../../controller/service/client.service';
import {Ticket} from '../../../controller/model/ticket.model';
import {DeveloppeurService} from '../../../controller/service/developpeur.service';

@Component({
  selector: 'app-developpeur-view',
  templateUrl: './developpeur-view.component.html',
  styleUrls: ['./developpeur-view.component.scss']
})
export class DeveloppeurViewComponent implements OnInit {

  constructor(private messageService: MessageService, private service: DeveloppeurService) { }

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
