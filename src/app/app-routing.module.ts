import {Route, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppLoginComponent} from './pages/app.login.component';


import {SignUpComponent} from './pages/sign-up/sign-up.component';

import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';

import {AdministrateurComponent} from './view/administrateur/administrateur.component';
import {ClientComponent} from './view/client/client.component';
import {DeveloppeurComponent} from './view/developpeur/developpeur.component';


@NgModule({
    imports: [
        RouterModule.forRoot([

            {
                path: '', component: AppMainComponent,
                children: [

                    {path: '', component: DashboardDemoComponent},

                    {path: 'administrateurs', component: AdministrateurComponent},
                    {path: 'client', component: ClientComponent},
                    {path: 'developpeur', component: DeveloppeurComponent},

                ]
            },
            {path: 'sign-up', component: SignUpComponent},
            {path: 'error', component: AppErrorComponent},
            {path: '404', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/404'},
        ], {scrollPositionRestoration: 'enabled'}),
    ],

    exports: [RouterModule]
})
export class AppRoutingModule {
}
