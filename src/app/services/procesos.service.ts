import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  url: any;

  constructor(private http: HttpClient, 
              private _usService: UsuarioService) { 
    this.url = environment.url;
  }

  getQuery(query: string) {
    const url = `${ this.url }/${ query }/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 
                                      'Authorization': this._usService.leerToken() });  

    return this.http.get(url, { headers });
  }

  // Consulta citas por paciente
  getCita(paciente: any) {    
    return this.getQuery(`cita/listar/${ paciente }`);
  }

   // Consulta los servicios médicos ofrecidos
  getServicio() {    
    return this.getQuery(`servicio/listar`);
  }  

    // Crear orden de trabajo
  crearCita(fecha: any,
            hora: any,                
            servicio: any,
            medico: any, 
            paciente: any) {

    const myObj = {
      "fecha": fecha,
      "hora": hora,
      "servicio": servicio,
      "medico": medico,
      "paciente": paciente,
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/cita/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                      'Authorization': this._usService.leerToken() });  

    return this.http.post(url, params, { headers });
  }
  
}
