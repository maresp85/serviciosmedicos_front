import { Component, OnInit } from '@angular/core';
import { ProcesosService } from 'src/app/services/procesos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProcedimientoModel } from '../../models/procedimiento.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cotizarservicios',
  templateUrl: './cotizarservicios.component.html',
  styleUrls: []
})
export class CotizarServiciosComponent implements OnInit {

  title: string = "COTIZAR PROCEDIMIENTOS";
  title2: string = "Consulta los Médicos Especialistas";
  loading: boolean = false;
  listado: any = [];
  procedimiento: ProcedimientoModel;
  nombre: string;
  email: string;

  constructor(private _orService: ProcesosService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.procedimiento = new ProcedimientoModel();
    this.nombre = this._usService.leerNombreUsuario();
    this.email = this._usService.leerEmailUsuario();
  }


  // Login de usuario
  onSubmit(form: NgForm) {     
    if (form.invalid) { return; }
    this.loading = true;
    this.getDocument();
    this.loading = false;
  }

  getDocument() {
    
    var content: any[] = [
      {
        table: {   
          headerRows: 1,
          widths: [180, '*'],  
          body: [
            [ 
              { text: 'SERVICIOS MÉDICOS', alignment: 'center', fontSize: 11 }, 
              { text: 'COTIZACIÓN DE PROCEDIMIENTO', alignment: 'center', fontSize: 11, bold: true },
            ],
            [ 
              { text: 'FECHA DE PROCEDIMIENTO', alignment: 'center', fontSize: 11 }, 
              { text: this.procedimiento.fecha, alignment: 'center', fontSize: 11, bold: false },
            ],
            [ 
              { text: 'CLIENTE', alignment: 'center', fontSize: 11 }, 
              { text: this.nombre, alignment: 'center', fontSize: 11, bold: false },
            ],
            [ 
              { text: 'CORREO ELECTRÓNICO', alignment: 'center', fontSize: 11 }, 
              { text: this.email, alignment: 'center', fontSize: 11, bold: false },
            ]
          ]
        },
        margin: [0, 0, 0, 10]
      }        
    ];

    content.push({table: {
      widths: [300, 200],
      headerRows: 1,
        body: [
          [
           { text: 'ITEM', alignment: 'center', fontSize: 10, bold: true },
           { text: 'VALOR', alignment: 'center', fontSize: 10, bold: true },
          ],
          ['', '']
        ]
    }, margin: [0, 0, 0, 0], layout: 'headerLineOnly'});


    content.push({table: {
      widths: [300, 220],
      headerRows: 1,
        body: [
          [
           { text: 'Procedimiento ' + this.procedimiento.procedimiento, alignment: 'justify', fontSize: 10 },     
           { text: "$ 5.000.000", fontSize: 10, alignment: 'center' }
          ]
        ]
    }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 2]});

    content.push({table: {
      widths: [300, 220],
      headerRows: 1,
        body: [
          [
           { text: 'Anestesia ' + this.procedimiento.anestesia, alignment: 'justify', fontSize: 10 },     
           { text: "$ 2.000.000", fontSize: 10, alignment: 'center' }
          ]
        ]
    }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 2]});

    content.push({table: {
      widths: [300, 220],
      headerRows: 1,
        body: [
          [
           { text: 'Habitación ' + this.procedimiento.habitacion, alignment: 'justify', fontSize: 10 },     
           { text: "$ 1.000.000", fontSize: 10, alignment: 'center' }
          ]
        ]
    }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 2]});

    content.push({table: {
      widths: [300, 220],
      headerRows: 1,
        body: [
          [
           { text: 'TOTAL', alignment: 'justify', fontSize: 11, bold: true },     
           { text: "$ 8.000.000", fontSize: 11, bold: true, alignment: 'center' }
          ]
        ]
    }, layout: 'lightHorizontalLines', margin: [0, 0, 0, 2]});

    content.push({ ul: [
      { text: 'Observaciones', fontSize: 9, bold: true, margin: [0, 15, 0, 5] }
    ]});

    content.push({ text: this.procedimiento.observaciones, fontSize: 9 });

    setTimeout(function () {
      
      let docDefinition = {
        content: content,
        styles: {
          filledText: {
            fontSize: 18,
            bold: true,
            fillColor: '#ddd'
          },
          name: {
            fontSize: 16,
            bold: true
          }
        }
      }      
      pdfMake.createPdf(docDefinition).open();
    }, 1000);

    return content;

  }

}
