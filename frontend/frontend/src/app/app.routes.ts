import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Propiedades } from './pages/propiedades/propiedades';


export const routes: Routes = [
{path: '', component: Home },
{path: 'login', component: Login },
{path: 'propiedades', component: Propiedades },

];

