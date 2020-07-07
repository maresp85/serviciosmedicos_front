import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ProcesosService } from './procesos.service';

describe('ProcesosService', () => {
  let service: ProcesosService;

  const mockResponse = {
    ok: 'true',
    citaDB: {     
      estado: 'PENDIENTE_PAGO',
      fecha: "2020-07-16T19:00:00.000Z",
      id: 27,
      medico: {
        email: 'mvargas@gmail.com',
        especialista: false,
        estado: true,
        fechanacimiento: '1977-12-04T05:00:00.000Z',
        identificacion: 21568930,
        nombre: 'Margarita Vargas',
        role: 'MEDICO',
        telefono: 3083796383,
        _id: "5ef11176a9f6ff5bc0bbb383"
      },
      paciente: {
        email: "soniacortesbedoya@gmail.com",
        especialista: false,
        estado: true,
        fechanacimiento: "1985-08-14T05:00:00.000Z",
        identificacion: "24339860",
        nombre: "Sonia Cortes",
        role: "PACIENTE",
        telefono: "3103796358", 
        _id: "5eee7460413e3341e8b00fee",    
        servicio: {
          nombre: "Médico General",
          _id: "5eee8d3651f55f2fac7d0608"
        }
      },
      _id: "5f039ac65999fa254cb16a76"
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProcesosService);
  });

  it('Servicio creado', () => {
    expect(service).toBeTruthy();
  });

  describe('obtiene resultados', () => {
    it('resultados',
    inject([HttpTestingController, ProcesosService],
           async (httpMock: HttpTestingController, myServiceTested: ProcesosService) => {
 
      await myServiceTested.getCita("5eee7460413e3341e8b00fee")
      .subscribe(
        (res) => {
          expect(res).toEqual(mockResponse);         
        }
      );
    })
  );
  });

});
