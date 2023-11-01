import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {
  usuarioActual: any;
  personas = [
    {
      id    : 1,
      nombre: 'Juan',
      contrasena:'contrasena',
      edad  : 25,
      email :'juan@gmail.com',
      ocupacion :'profesor',
      foto  : 'https://img.freepik.com/foto-gratis/retrato-estudio-hombre-moreno-confianza_1187-5799.jpg?w=2000'
    },
    {
      id    : 2,
      nombre: 'Diana',
      contrasena:'contrasena',
      edad  : 30,
      email :'diana@gmail.com',
      ocupacion :'profesor',
      foto  : 'https://image.shutterstock.com/image-photo/happy-young-woman-sitting-on-260nw-2018571389.jpg'
    },
    {
      id    : 3,
      nombre: 'Pedro',
      contrasena:'contrasena',
      edad  : 45,
      email :'pedro@gmail.com',
      ocupacion :'alumno',
      foto  : 'https://img.freepik.com/foto-gratis/apuesto-hombre-empresario-sonriendo-alegre_176420-17877.jpg?w=2000'
    }
  ]

  asignatura = [
    {
      id    : 1,
      nombre: 'Arquitectura',
    },
    {
      id    : 2,
      nombre: 'Calidad de Software',
    },
    {
      id    : 3,
      nombre: 'Estadistica Descritiva',
    },
    {
      id    : 4,
      nombre: 'Ética Profesional',
    },
    {
      id    : 5,
      nombre: 'Inglés Intermedio',
    },
    {
      id    : 6,
      nombre: 'Programación de Aplicaciones Moviles',
    }
  ]


  constructor() { }
}
