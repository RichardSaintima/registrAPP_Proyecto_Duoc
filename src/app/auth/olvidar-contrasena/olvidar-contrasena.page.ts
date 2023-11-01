import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CrudServicesService } from 'src/app/Services/crud-services.service';

@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.page.html',
  styleUrls: ['./olvidar-contrasena.page.scss'],
})
export class OlvidarContrasenaPage implements OnInit {

  email: String = '';
 
  constructor(private toastController: ToastController,
              private principal: NavController,
              private crudService: CrudServicesService) { }

  async recuperar() {
    const usuarioEncontrado = this.crudService.personas.find(persona => persona.email === this.email);
    if (usuarioEncontrado) {
      this.principal.navigateForward('/home');
                     
      this.mensaje('Se ha enviado un correo a su cuenta', 'success');
    }
  
    else{
      if (!this.email) {
        this.mensaje('Ingrese correo', 'danger');
      }
      else{
        this.mensaje('Correo no registrado', 'danger');
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
  ngOnInit() {
  }

}
