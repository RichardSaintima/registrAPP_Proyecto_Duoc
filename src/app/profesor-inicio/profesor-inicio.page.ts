import { Component, OnInit } from '@angular/core';
import { ApiRestService, Persona } from '../Services/api-rest.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profesor-inicio',
  templateUrl: './profesor-inicio.page.html',
  styleUrls: ['./profesor-inicio.page.scss'],
})
export class ProfesorInicioPage implements OnInit {

  persona: Persona;
  asignaturas: any;
  userId: string;
  
  constructor( 
    private apirest: ApiRestService,
    private activatedRoute: ActivatedRoute,) {
      this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtener usuario actual
    this.persona = JSON.parse(localStorage.getItem('usuarioActual'));
    this.persona = apirest.usuarioActual;

    // Obtener asignaturas
    this.apirest.getAsignatura().subscribe(res => {
      this.asignaturas = res;
    });
  }

  ngOnInit() {
    
  }
}
