import { Routes } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { CrearCitaComponent } from './screens/crearcita/crearcita.component';
import { ConsultaMedicosComponent } from './screens/consultamedicos/consultamedicos.component';
import { CotizarServiciosComponent } from './screens/cotizarservicios/cotizarservicios.component';

export const ROUTES: Routes = [
    { path: 'miscitas', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'crearcita', component: CrearCitaComponent, canActivate: [ AuthGuard ] },
    { path: 'consultamedicos', component: ConsultaMedicosComponent, canActivate: [ AuthGuard ] },    
    { path: 'cotizarservicios', component: CotizarServiciosComponent, canActivate: [ AuthGuard ] },    
    { path: 'login', component: LoginComponent },

    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
]