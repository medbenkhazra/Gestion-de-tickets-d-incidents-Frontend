import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ClientService} from '../../../controller/service/client.service';
import {Ticket} from '../../../controller/model/ticket.model';
import {DeveloppeurService} from '../../../controller/service/developpeur.service';
interface com{
  environnement: string;
}
interface priorite{
  priorite: string;
}
interface statut{
  statut: string;
}
@Component({
  selector: 'app-developpeur-edit',
  templateUrl: './developpeur-edit.component.html',
  styleUrls: ['./developpeur-edit.component.scss']
})
export class DeveloppeurEditComponent implements OnInit {
  environnements=new Array<com>();
  environnementSelected: com;
  priorites=new Array<priorite>();
  prioriteSelected: priorite;
  status=new Array<statut>();
  statutSelected: statut;
  constructor(private messageService: MessageService, private service: DeveloppeurService) {
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
  }

  public edit() {
    this.submitted = true;

    if (this.selected.id!=null) {
      this.items[this.service.findIndexById(this.selected.id)] = this.selected;
      this.selected.environnement=this.environnementSelected.environnement;
      this.selected.priorite=this.prioriteSelected.priorite;
      this.service.edit().subscribe(
          data=>{
            console.log("edited");
            this.ngOnInit();
          },error => {
            console.log("noot edited");
          }
      );

      this.messageService.add({
        severity: 'success',
        summary: 'succès',
        detail: 'ticket mise à jour',
        life: 3000
      });


    }
    this.editDialog = false;
    this.selected = new Ticket();
    //  }
  }

  public hideEditDialog() {
    this.editDialog = false;
  }
  get selected(): Ticket {
    return this.service.selected;
  }

  set selected(value: Ticket) {
    this.service.selected = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
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
