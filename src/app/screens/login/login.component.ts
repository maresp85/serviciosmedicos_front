import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  loadingButton: boolean = false;
  
  constructor(private router: Router,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }  

    // Login de usuario
  onSubmit(form: NgForm) { 
    
    if (form.invalid) { return; }

    this.loadingButton = true;

    this._usService.autenticarUsuario(this.usuario.identificacion, 
                                      this.usuario.fechanacimiento)
                   .subscribe((res: any) => { 
                      console.log(res)
                      if (res.ok == true) {
                        this.loadingButton = false;
                        this._usService
                            .guardarLocalUsuario(res.usuarioDB._id,
                                                 res.usuarioDB.email,
                                                 res.usuarioDB.role,
                                                 res.usuarioDB.nombre,
                                                 res.usuarioDB.identificacion,
                                                 res.token)
                            .then(() => {
                              this.router.navigate(["/miscitas"]);
                            }).catch(() => {});
                      } else {
                        this.error();
                      }         
    }, error => {
      this.error();
    }); 

  }

  error() {
    this.loadingButton = false;
    Swal.fire({    
      text: 'Datos incorrectos',
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    });               
  }


}