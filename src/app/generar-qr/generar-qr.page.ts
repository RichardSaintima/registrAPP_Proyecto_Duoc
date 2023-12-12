import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiRestService, Asignatura, Persona } from '../Services/API/api-rest.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  texto: any;
  id: any;
  asignatura: Asignatura;
  esProfesor: boolean = false;
  esAlumno: boolean = false;
  usuarioActualSubject: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public apiRestService: ApiRestService,
  ) {
    this.texto = '';
    this.id = null;

    const asignaturaId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiRestService.usuarioActual$.subscribe((usuario: Persona | null) => {
      if (usuario) {
        if (usuario.ocupacion === 'profesor') {
          this.esProfesor = true;
        } else {
          this.esAlumno = true;
        }
      }
    });

    this.apiRestService.getAsignaturaById(asignaturaId).subscribe(
      (asignatura: Asignatura | undefined) => {
        if (asignatura) {
          this.asignatura = asignatura;
          this.texto = asignatura.nombre;
          this.id = asignatura.id;
        } else {
          console.error('Asignatura no encontrada.');
        }
      },
      (error) => {
        console.error('Error al obtener la asignatura:', error);
      }
    );
  }

  ionViewDidEnter() {
    if (this.esProfesor) {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Código QR generado con éxito!',
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  ngOnInit() {}
}