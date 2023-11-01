import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/crud-services.service';

@Component({
  selector: 'app-alumno-inicio',
  templateUrl: './alumno-inicio.page.html',
  styleUrls: ['./alumno-inicio.page.scss'],
})
export class AlumnoInicioPage implements OnInit {

  persona: any; 
  
  constructor(public crudService: CrudServicesService) {
    this.persona = crudService.personas.find(persona => persona.nombre === crudService.usuarioActual.nombre);
  }

  ngOnInit() {
  }

}
