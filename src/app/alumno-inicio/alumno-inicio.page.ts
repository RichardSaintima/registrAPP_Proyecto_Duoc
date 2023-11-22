import { Component, OnInit } from '@angular/core';
import { ApiRestService, Persona } from '../Services/API/api-rest.service';

import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-inicio',
  templateUrl: './alumno-inicio.page.html',
  styleUrls: ['./alumno-inicio.page.scss'],
})
export class AlumnoInicioPage implements OnInit {
  persona: Persona;
  asignaturas: any;
  userId: string;

  constructor(
    public apirest: ApiRestService,
    public activatedRoute: ActivatedRoute,
    public principal: NavController,
    public loadingCtrl: LoadingController,
    public apiRestService: ApiRestService,
    public toastController: ToastController,
  ) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiRestService.usuarioActual$.subscribe((usuario: Persona | null) => {
      this.persona = usuario;
    });
    this.apirest.getAsignatura().subscribe(res => {
      this.asignaturas = res;
    });
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
      spinner: 'crescent',
      showBackdrop: true
    });

    try {
      await loading.present();

      this.apiRestService.setUsuarioActual(null);
      localStorage.removeItem('usuarioActual');
      this.principal.navigateRoot('/home');
      this.mensaje('Cierre de sesión exitoso', 'success', 'checkmark-done-outline');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      this.mensaje('Cierre de sesión fallado', 'danger', 'close-outline');
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


  ngOnInit() {
    
  }
}