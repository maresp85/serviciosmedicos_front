import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2AirDatepickerModule } from 'angular2-air-datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

//Fechas
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import localeEsCo from '@angular/common/locales/es-CO'; 
registerLocaleData(localePy, 'es');
registerLocaleData(localeEsCo, 'es-Co');

//Rutas
import { ROUTES } from "./app.routes";
//Servicios
import { ProcesosService } from './services/procesos.service';
import { UsuarioService } from './services/usuario.service';
//Components
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardTitleComponent } from './components/cardtitle/cardtitle.component';
//Screens
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { CrearCitaComponent } from './screens/crearcita/crearcita.component';
import { ConsultaMedicosComponent } from './screens/consultamedicos/consultamedicos.component';
import { CotizarServiciosComponent } from './screens/cotizarservicios/cotizarservicios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    CardTitleComponent,    
    HomeComponent,    
    LoginComponent,
    CrearCitaComponent,
    ConsultaMedicosComponent,
    CotizarServiciosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Angular2AirDatepickerModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [ProcesosService, 
              UsuarioService,
              { provide: LOCALE_ID, useValue: "es" },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
