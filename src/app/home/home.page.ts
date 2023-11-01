import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { CrudServicesService } from '../Services/crud-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string = '';
  contrasena: string = '';

  constructor(
    private principal: NavController,
    private toastController: ToastController,
    public crudService: CrudServicesService
  ) {}

  async login() {
    const usuarioEncontrado = this.crudService.personas.find(persona => persona.nombre === this.usuario && persona.contrasena === this.contrasena);

    if (usuarioEncontrado) {
      if (usuarioEncontrado.ocupacion === 'profesor') {
        this.principal.navigateForward('/profesor-inicio');
      } 
      else if (usuarioEncontrado.ocupacion === 'alumno') 
      {this.principal.navigateForward('/alumno-inicio'); }

      this.crudService.usuarioActual = usuarioEncontrado;  
    } 

    else {
      if (!this.usuario) {
        this.mensaje('Ingrese usuario', 'danger');
      } else if (!this.contrasena) {
        this.mensaje('Ingrese contraseña', 'danger');
      } else {
        this.mensaje('Usuario y contraseña incorrectos', 'danger');
      }
    }
  }

  async mensaje(alerta: string, color: string) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 2000, 
      icon: 'alert-outline',
      position: 'bottom', 
      color: color,
    });
    await toast.present();
  }
}
