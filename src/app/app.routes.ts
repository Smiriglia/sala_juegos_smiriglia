import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';


export const routes: Routes = [
    // Si le ponemos 'prefix' nos va a arrojar un error en la consola de redireccion infinita
    { path: '', redirectTo: 'home', pathMatch: "full" },
    {
        path: 'home', loadComponent: () => import('./componentes/home/home.component').then(
            x => x.HomeComponent
        )
    },
    {
        path: 'login', loadComponent: () => import('./componentes/login/login.component').then(
            x => x.LoginComponent
        )
    },
    {
        path: 'about', loadComponent: () => import('./componentes/about/about.component').then(
            x => x.AboutComponent
        )
    },

    {
        path: 'chat', loadComponent: () => import('./componentes/chat/chat.component').then(
            x => x.ChatComponent
        )
    },

    {
        path: 'ahorcado', loadComponent: () => import('./componentes/ahorcado/ahorcado.component').then(
            x => x.AhorcadoComponent
        )
    },

    {
        path: 'mayor_menor', loadComponent: () => import('./componentes/mayor-menor/mayor-menor.component').then(
            x => x.MayorMenorComponent
        )
    },

    {
        path: 'preguntados', loadComponent: () => import('./componentes/preguntados/preguntados.component').then(
            x => x.PreguntadosComponent
        )
    },

    {
        path: 'generala', loadComponent: () => import('./componentes/generala/generala.component').then(
            x => x.GeneralaComponent
        )
    },


    {
        path: '**', loadComponent: () => import('./componentes/page-not-found/page-not-found.component').then(
            x => x.PageNotFoundComponent
        )
    },

];