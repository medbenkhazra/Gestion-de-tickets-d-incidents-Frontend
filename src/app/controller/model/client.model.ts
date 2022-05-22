import {Ticket} from './ticket.model';

export class Client {
    public id:number;
    public nom:string;
    public prenom:string;
    public age:string;
    public email:string;
    public tickets:Array<Ticket>;
}
