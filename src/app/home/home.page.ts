import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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

constructor(private principal: NavController,
            private toastController: ToastController) {}

async login() {
  if (this.usuario === this.alumnoSimulado && this.contrasena === this.contrasenaAlumnoSimulada) {
    this.principal.navigateForward('/alumno-inicio');

    const toast = await this.toastController.create({
      message: 'Ha ingresado exitosamente!',
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();

  }

  else{

    const toast = await this.toastController.create({
      message: 'Credenciales no válidas!',
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
    
  }

}//clase
