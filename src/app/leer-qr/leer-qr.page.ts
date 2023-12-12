import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiRestService, Asignatura, Persona } from '../Services/API/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  texto: any;
  id: any;
  datoscaneado: any = {};
  fechaHoraEscaneo: Date | null = null;
  esAlumno: boolean = false;
  esProfesor: boolean = false;
  asignatura: Asignatura;

  constructor(
    public barcodescan: BarcodeScanner,
    public apiRestService: ApiRestService,
    public activatedRoute: ActivatedRoute,
    public platform: Platform,
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

  ngOnInit() {
    
  }
  LeerCode() {
    this.barcodescan.scan().then((barcodeData) => {
      this.datoscaneado = barcodeData;
      this.fechaHoraEscaneo = new Date();
    }).catch((err) => {
      console.log("Error", err);
    });
  }
}
