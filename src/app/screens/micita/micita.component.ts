import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-micita',
  templateUrl: './micita.component.html',
  styleUrls: []
})
export class MiCitaComponent implements OnInit {

  title: string = "CITAS MÉDICAS";
  title2: string = "Estado de mis citas médicas";
  loading: boolean = false;
  listado: any = [];
  p: number = 1;

  constructor(private _orService: ProcesosService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.loading = true;
    let _id: any = this._usService.leerIDUsuario();
    this._orService.getCita(_id)
                   .subscribe((res: any) => {  
                      this.listado = res.citaDB;                      
                      this.loading = false;        
                   }, error => { 
                     this.loading = false 
                    }); 
  }

}
