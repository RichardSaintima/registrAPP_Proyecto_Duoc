import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.page.html',
  styleUrls: ['./olvidar-contrasena.page.scss'],
})
export class OlvidarContrasenaPage implements OnInit {

  email: String = '';

  emailSimulado = 'alumno@duoc.cl'; 
  constructor(private toastController: ToastController,
              private principal: NavController) { }

  async recuperar() {
    if (this.email === this.emailSimulado) {
      this.principal.navigateForward('/home');
  
      const toast = await this.toastController.create({
        message: 'Se ha enviado la solicitud a su correo!',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
  
    }
  
    else{
  
      const toast = await this.toastController.create({
        message: 'Email no válido!',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
      
    }

  ngOnInit() {
  }

}
