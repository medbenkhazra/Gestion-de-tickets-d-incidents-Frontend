import {Client} from './client.model';
import {Developpeur} from './developpeur.model';

export class Ticket {
    public  id:number;
    public titre:string;
    public dateOuverture:Date;
    public dateFermeture:Date;
    public description:string;
    public environnement:string;
    public logiciel:string;
    public statut:string;
    public priorite:string;
    public client:Client;
    public developpeur:Developpeur;
}
