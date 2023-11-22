import { Component, OnInit } from '@angular/core';
import { ApiRestService, Persona, Asignatura } from '../Services/API/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profesor-inicio',
  templateUrl: './profesor-inicio.page.html',
  styleUrls: ['./profesor-inicio.page.scss'],
})
export class ProfesorInicioPage implements OnInit {

  persona: Persona;
  asignaturas: Asignatura[] = [];
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
      this.asignaturas = this.filterAsignaturas(res, this.persona.nombre);
    });
  }

  filterAsignaturas(asignaturas: Asignatura[], nombre: string): Asignatura[] {
    if (nombre === 'Diana') {
      return asignaturas.filter(asignatura => asignatura.asignacion === '01' || asignatura.asignacion === '02');
    } else if (nombre === 'Juan') {
      return asignaturas.filter(asignatura => asignatura.asignacion === '03' || asignatura.asignacion === '04');
    } else if (nombre === 'www') {
      return asignaturas.filter(asignatura => asignatura.asignacion === '05' || asignatura.asignacion === '06');
    } else {
      return asignaturas;
    }
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
