import { Routes } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
]