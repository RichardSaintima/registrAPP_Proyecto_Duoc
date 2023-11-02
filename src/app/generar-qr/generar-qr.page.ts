import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/crud-services.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  texto: any;
  
  constructor(
    public crudService: CrudServicesService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
    ) {
      this.texto = this.activatedRoute.snapshot.paramMap.get('nombre');
    }

    ionViewDidEnter() {
      this.presentToast();
    }
    
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Código QR generado con éxito !',
        duration: 3000, // Duración en milisegundos
        position: 'bottom', // Puedes ajustar la posición según tus preferencias
        color: 'success'
      });
      toast.present();
    }
    

  ngOnInit() {
  }

}
