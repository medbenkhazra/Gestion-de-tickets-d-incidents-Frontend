import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../../Security/_services/token-storage.service';
import {environment} from '../../../environments/environment';
import {Ticket} from '../model/ticket.model';
import {TicketVo} from '../model/ticket-vo.model';
import {Observable} from 'rxjs';

import {Developpeur} from '../model/developpeur.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloppeurService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }


  private url = environment.baseUrl + 'ticket/';
  private _items: Array<Ticket>;
  private _selected: Ticket;
  private _selectes: Array<Ticket>;
  private API_URL = 'http://localhost:8036/api/test/';
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;
  private _ticketVo:TicketVo;

  public deleteMultipleIndexById() {
    for (const item of this.selectes){
      this.deleteIndexById(item.id);
      console.log('entred to delet multiple');
      console.log(item.id);
      this.deleteByIdselectedItems(item.id).subscribe(
          data=>{
            console.log("deleted"+item.id);
          },error => {
            console.log(error);
          }
      )

    }
  }

/*  public updateStatut():Observable<any>{
    return this.http.put();
  }*/

  public edit(): Observable <any>{

    return this.http.post<Ticket>(environment.baseUrl + 'ticket/',this.selected);
  }

  public editStatut(): Observable <any>{
    this.selected.statut="résolu";
    console.log(this.selected);
    return this.http.patch<Ticket>(environment.baseUrl + 'ticket/',this.selected);
  }

  public deleteByIdselectedItems(id:number): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'ticket/id/' + id);
  }
  public deleteIndexById(id: number) {
    this.items.splice(this.findIndexById(id), 1);
  }


  public findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }


  public findAll(): Observable<Array<Ticket>> {
    return this.http.get<Array<Ticket>>(environment.baseUrl + 'ticket/');
  }
  public findDeveloppeurById(): Observable<Developpeur> {
    return this.http.get<Developpeur>(environment.baseUrl + 'developpeur/id/'+1);
  }
  public deleteById(): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'ticket/id/' + this.selected.id);
  }
  public save(): Observable<any> {
    const now = new Date();
    this.selected.dateOuverture=now;
    this.selected.statut="en cours de traitement";
    return this.http.post<Ticket>(environment.baseUrl + 'ticket/',this.selected);
  }

  get ticketVo(): TicketVo {
    if (this._ticketVo == null){
      this._ticketVo = new TicketVo();
    }
    return this._ticketVo;
  }

  set ticketVo(value: TicketVo) {
    this._ticketVo = value;
  }

  get items(): Array<Ticket> {
    return this._items;
  }

  set items(value: Array<Ticket>) {
    this._items = value;
  }


  get selected(): Ticket {

    return this._selected;
  }

  set selected(value: Ticket) {
    this._selected = value;
  }

  get selectes(): Array<Ticket> {
    return this._selectes;
  }

  set selectes(value: Array<Ticket>) {
    this._selectes = value;
  }


  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    console.log("enrede to service");
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }
}
