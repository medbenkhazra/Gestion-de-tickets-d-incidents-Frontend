import {Role} from './role.model';
import {Administrateur} from './administrateur.model';
import {Developpeur} from './developpeur.model';
import {Client} from './client.model';

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Array<Role>;
    administrateur: Administrateur;
    developpeur: Developpeur;
    client: Client;
}
