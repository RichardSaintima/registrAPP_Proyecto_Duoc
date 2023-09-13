import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno-inicio',
  templateUrl: './alumno-inicio.page.html',
  styleUrls: ['./alumno-inicio.page.scss'],
})
export class AlumnoInicioPage implements OnInit {

  nombre = "Alumno";
  constructor() { }

  ngOnInit() {
  }

}
