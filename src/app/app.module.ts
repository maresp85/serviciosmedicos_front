import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ConfiguracionService } from './services/configuracion.service';
//Componentes shared
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TitleComponent } from './components/title/title.component';
//Componentes
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    TitleComponent,    
    HomeComponent,    
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [ProcesosService, 
              UsuarioService, 
              ConfiguracionService,
              { provide: LOCALE_ID, useValue: "es" },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
