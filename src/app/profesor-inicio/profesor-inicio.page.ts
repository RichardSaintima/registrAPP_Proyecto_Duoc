import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/crud-services.service';

@Component({
  selector: 'app-profesor-inicio',
  templateUrl: './profesor-inicio.page.html',
  styleUrls: ['./profesor-inicio.page.scss'],
})
export class ProfesorInicioPage implements OnInit {

  persona: any;
  asignaturas: any;
  
  constructor(public crudService: CrudServicesService) {
    this.persona = crudService.personas.find(persona => persona.nombre === crudService.usuarioActual.nombre),
    this.asignaturas = crudService.asignatura;
  }



  ngOnInit() {
  }

}
