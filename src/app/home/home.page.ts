import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiRestService, Persona } from '../Services/API/api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public credencial: FormGroup;

  constructor(
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    public principal: NavController,
    public loadingCtrl: LoadingController,
    public apiRestService: ApiRestService,
  ) {}

  get nombre() {
    return this.credencial.get('nombre');
  }
  get password() {
    return this.credencial.get('password');
  }

  ngOnInit() {
    this.credencial = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
      showBackdrop: true
    });
  
    try {
      await loading.present();
  
      this.apiRestService.getPersona().subscribe((personas: Persona[]) => {
        const usuarioEncontrado = personas.find(
          persona => persona.nombre === this.nombre.value
        );
  
        if (usuarioEncontrado) {
          if (usuarioEncontrado.password === this.password.value) {
            this.apiRestService.setUsuarioActual(usuarioEncontrado);
            
            if (usuarioEncontrado.ocupacion === 'profesor') {
              this.principal.navigateForward(`/profesor-inicio/${usuarioEncontrado.id}`);
            } else if (usuarioEncontrado.ocupacion === 'estudiente') {
              this.principal.navigateForward(`/alumno-inicio/${usuarioEncontrado.id}`);
            }
            
            this.mensaje('Inicio de sesión exitoso', 'success', 'checkmark-done-outline');
          } else {
            this.mensaje('Contraseña incorrecta', 'danger', 'close-outline');
          }
        } else {
          this.mensaje('Usuario no existe', 'danger', 'close-outline');
        }
      });
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      this.mensaje('Inicio de sesión fallado', 'danger', 'close-outline');
    } finally {
      await loading.dismiss();
    }
  }


  async mensaje(alerta: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: alerta,
      duration: 2000,
      icon: icon,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }
}