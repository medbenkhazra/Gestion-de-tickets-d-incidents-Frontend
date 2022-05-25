import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';

import {ClientService} from '../../../controller/service/client.service';
import {Ticket} from '../../../controller/model/ticket.model';
import {User} from '../../../controller/model/user.model';
import {Router} from '@angular/router';

interface com{
  environnement: string;
}
interface priorite{
  priorite: string;
}
@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {
  environnements=new Array<com>();
  environnementSelected: com;
  priorites=new Array<priorite>();
  prioriteSelected: priorite;
  constructor(private messageService: MessageService, private service: ClientService, private router: Router) {
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
    console.log("entred to create modal");
  }

  public hideCreateDialog() {
    this.createDialog = false;
    this.submitted = false;
  }

  get currentUser(): User {
    return this.service.currentUser;
  }

  set currentUser(value: User) {
    this.service.currentUser = value;
  }

 /* public invokeOninitParent():void{
    this.service.invokeOninitParent();
  }
*/
  public save() {
    this.submitted = true;
    this.selected.environnement = this.environnementSelected.environnement;
    this.selected.priorite = this.prioriteSelected.priorite;



    this.service.save().subscribe(
        data=>{
          console.log("admin saved");

        },error => {
          console.log(error);
        }
    );

    this.items.push({...this.selected});
   // this.invokeOninitParent();
   // this.router.navigate(['client']);
    window.location.reload();
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
