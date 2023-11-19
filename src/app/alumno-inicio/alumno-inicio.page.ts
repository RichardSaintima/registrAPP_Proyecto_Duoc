import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/Crud/crud-services.service';
import { ApiRestService, Persona } from '../Services/api-rest.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumno-inicio',
  templateUrl: './alumno-inicio.page.html',
  styleUrls: ['./alumno-inicio.page.scss'],
})
export class AlumnoInicioPage implements OnInit {

  persona: Persona;
  asignaturas: any;
  userId: string;

  constructor(public crudService: CrudServicesService, 
    private apirest: ApiRestService,
    private activatedRoute: ActivatedRoute,) {
      this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtener usuario actual
    this.persona = JSON.parse(localStorage.getItem('usuarioActual'));
    this.persona = apirest.usuarioActual;

    this.apirest.getAsignatura().subscribe(res => {
      this.asignaturas = res;
    });
  }

  ngOnInit() {
    
  }
}
