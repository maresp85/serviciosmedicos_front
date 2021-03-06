import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultamedicos',
  templateUrl: './consultamedicos.component.html',
  styleUrls: []
})
export class ConsultaMedicosComponent implements OnInit {

  title: string = "MÉDICOS ESPECIALISTAS";
  title2: string = "Consulta los Médicos Especialistas";
  loading: boolean = false;
  listado: any = [];
  urluploadimg: any = environment.url + environment.uploadimages;
  p: number = 1;
  
  constructor(private router: Router,
              private _orService: ProcesosService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.loading = true;
    this._usService.getMedicoEspecialista()
                   .subscribe((res: any) => {  
                      this.listado = res.usuarioDB;
                      this.loading = false;        
                    }, err => { 
                      if (err.error.err.message == "Token no válido") {
                        this.router.navigate(["/login"]);
                      } 
                      this.loading = false 
                    }); 
  }

}
