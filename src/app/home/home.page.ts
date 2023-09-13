import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

usuario: string = '';
contrasena: string = '';

alumnoSimulado = 'alumno';
contrasenaAlumnoSimulada = 'contrasena';

constructor(private principal: NavController) {}

login() {
  if (this.usuario === this.alumnoSimulado && this.contrasena === this.contrasenaAlumnoSimulada) {
    this.principal.navigateForward('/profesor-cursos');
  }
    console.log('Credenciales incorrectas');
  }

}
