import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiRestService, Persona } from 'src/app/Services/API/api-rest.service';

@Component({
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.page.html',
  styleUrls: ['./olvidar-contrasena.page.scss'],
})
export class OlvidarContrasenaPage implements OnInit {

  public credencial: FormGroup;

  constructor(
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    public principal: NavController,
    public loadingCtrl: LoadingController,
    public apiRestService: ApiRestService,
  ) {}

  get email() {
    return this.credencial.get('email'); 
  }

  ngOnInit() {
    this.credencial = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
    });
  }

  async recuperar() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando correo...',
      spinner: 'crescent',
      showBackdrop: true
    });
    try {
      await loading.present();
      this.apiRestService.getPersona().subscribe((personas: Persona[]) => {
        const usuarioEncontrado = personas.find(
          persona => persona.email === this.email.value
        );

        if (usuarioEncontrado) {
          this.principal.navigateForward('/home');
          this.mensaje('Se ha enviado un correo a su cuenta', 'success');
        } else {
          if (!this.email.value) { 
            this.mensaje('Ingrese correo', 'danger');
          } else {
            this.mensaje('Correo no registrado', 'danger');
          }
        }
      });
    } catch (error) {
      console.error('Error Para Enviar el Correo:', error);
      this.mensaje('Enviar Correo fallido', 'danger');
    } finally {
      await loading.dismiss();
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
