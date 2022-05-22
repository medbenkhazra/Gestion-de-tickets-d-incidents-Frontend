import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import {TokenStorageService} from "./Security/_services/token-storage.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[];
    isLoggedIn = false;

    constructor(public app: AppComponent, public appMain: AppMainComponent, private tokenStorageService: TokenStorageService) { }

    ngOnInit() {

        this.isLoggedIn = !!this.tokenStorageService.getToken();

        this.model = [
            {
                label: 'Home', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            {
                label: 'User', icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Liste des tickets', icon: 'pi pi-fw pi-list', routerLink: ['client']
                    },


                ]
            },
            {
                label: 'Developpeur', icon: 'pi pi-fw pi-paperclip',
                items: [
                    {
                        label: 'Liste des tickets', icon: 'pi pi-fw pi-list', routerLink: ['developpeur']
                    },


                ]
            },
            {
                label: 'Administrateur', icon: 'pi pi-fw pi-user-edit\n',
                items: [
                    {
                        label: 'Affectation des tickets', icon: 'pi pi-fw pi-list', routerLink: ['administrateurs']
                    },


                ]
            },




    ];
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
