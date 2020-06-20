import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  listado: any = [];

  constructor(private _orService: ProcesosService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.loading = true;
    let _id: any = this._usService.leerIDUsuario();
    this._orService.getCita(_id)
                   .subscribe((res: any) => {  
                      this.listado = res.citaDB;
                      console.log(res);
                      this.loading = false;        
                   }, error => { this.loading = false }); 
  }

}
