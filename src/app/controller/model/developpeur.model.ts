import {Ticket} from './ticket.model';

export class Developpeur {
    public id:number;
    public nom:string;
    public prenom:string;
    public age:string;
    public email:string;
    public specialite:string;
    public tickets:Array<Ticket>;
}
