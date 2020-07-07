import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-crearcita',
  templateUrl: './crearcita.component.html',
  styleUrls: []
})
export class CrearCitaComponent implements OnInit {

  title: string = "PEDIR CITA MÉDICA";
  title2: string = "Pida su cita médica";
  optionsCalendar: any = { timepicker: false, format12h: true, language: 'es' };  
  listado: any = [{'h1': '07:00', 'h2': '07:00 a.m'}, {'h1': '08:00', 'h2': '08:00 a.m'},
                  {'h1': '09:00', 'h2': '09:00 a.m'}, {'h1': '10:00', 'h2': '10:00 a.m'}, 
                  {'h1': '11:00', 'h2': '11:00 a.m'}, {'h1': '12:00', 'h2': '12:00 m'},
                  {'h1': '13:00', 'h2': '01:00 p.m'}, {'h1': '14:00', 'h2': '02:00 p.m'},
                  {'h1': '15:00', 'h2': '03:00 p.m'}, {'h1': '16:00', 'h2': '16:00 p.m'}];
  flagServicio: boolean = false;
  flagMedico: boolean = false;
  loading: boolean = false;
  medicos: any = [];
  servicios: any = [];
  fecha: any;
  medico: any;
  servicio: any;
  paciente: any;
  
  constructor(private router: Router,
              private _orService: ProcesosService,
              private _usService: UsuarioService) { 
    this.fecha = new Date(Date.now()).toLocaleDateString()
  }

  // Se obtienen los Médicos y Servicios
  ngOnInit() {
    this.loading = true;
    this.paciente = this._usService.leerIDUsuario();
    this._usService.getMedico()
                   .subscribe((res: any) => {  
                      this.medicos = res.usuarioDB;                      
                      this._orService.getServicio()
                                     .subscribe((res: any) => {  
                                        this.servicios = res.servicioDB;
                                        this.loading = false;        
                                     }, error => { this.loading = false });                      
                   }, err => { 
                      if (err.error.err.message == "Token no válido") {
                        this.router.navigate(["/login"]);
                      } 
                      this.loading = false 
                    }); 
  }

   // Se captura la fecha seleccionada en el calendario 
  dateChanged (date: any) {  
    if (date < Date.now()) {
      Swal.fire({    
        text: 'Fecha no disponible',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then((result) => {
        this.flagServicio = false;
        this.flagMedico = false;
      });       
    } else {
      this.fecha = date.toLocaleDateString();
    }
  }  

   // Se revisa si se selecciona algún Servicio
  onChangeServicio(id: any) {
    this.flagServicio = true;
    this.servicio = id;
  } 

   // Se revisa si se selecciona algún Médico
  onChangeMedico(id: any) {
    this.flagMedico = true;
    this.medico = id;
  } 

   // Se agenda cita
  agendarCita(hora: any) {
    this.loading = true;
    this._orService.crearCita(this.fecha, hora, this.servicio, this.medico, this.paciente)
                   .subscribe((res: any) => {  
                     this.loading = false; 
                     if (res.ok == true) {
                      Swal.fire({    
                        text: 'Cita Agendada. Recuerde presentarse 10 minutos antes de la hora seleccionada',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                      }).then((result) => {
                        this.router.navigate(['/miscitas']);
                      });           
                     }                    
                    }, error => { 
                      console.log(error);                      
                      this.loading = false 
                    }); 
  }

}
