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
      foto  : 'https://img.freepik.com/foto-gratis/retrato-estudio-hombre-moreno-confianza_1187-5799.jpg?w=2000'
    },
    {
      id    : 2,
      nombre: 'Diana',
      contrasena:'contrasena',
      edad  : 30,
      foto  : 'https://image.shutterstock.com/image-photo/happy-young-woman-sitting-on-260nw-2018571389.jpg'
    },
    {
      id    : 3,
      nombre: 'Pedro',
      contrasena:'contrasena',
      edad  : 45,
      foto  : 'https://img.freepik.com/foto-gratis/apuesto-hombre-empresario-sonriendo-alegre_176420-17877.jpg?w=2000'
    }
  ]


  constructor() { }
}
