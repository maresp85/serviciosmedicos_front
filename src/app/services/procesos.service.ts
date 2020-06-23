import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  url: any;

  constructor(private http: HttpClient) { 
    this.url = environment.url;
  }

  getQuery(query: string) {
    const url = `${ this.url }/${ query }/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

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
  
}
