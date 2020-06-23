import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-crearcita',
  templateUrl: './crearcita.component.html',
  styleUrls: []
})
export class CrearCitaComponent implements OnInit {

  loading: boolean = false;
  optionsCalendar: any = { timepicker: false, format12h: true, language: 'es' };  
  servicio: any = [];
  listado: any = ['07:00 a.m', '08:00 a.m', '09:00 a.m', '10:00 a.m', '11:00 a.m', '12:00 m', 
                  '01:00 p.m', '02:00 p.m', '03:00 p.m', '04:00 p.m', '05:00 p.m', '06:00 p.m'];

  constructor(private _orService: ProcesosService,
              private _usService: UsuarioService) { 

    
              }

  ngOnInit() {
    this.loading = true;
    let _id: any = this._usService.leerIDUsuario();
    this._orService.getServicio()
                   .subscribe((res: any) => {  
                      this.servicio = res.servicioDB;
                      console.log(this.servicio);
                      this.loading = false;        
                   }, error => { this.loading = false }); 
  }
 
  dateChanged (date) {  
      console.log(date);  
  }  

}
