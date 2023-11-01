import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/crud-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  texto: any;
  
  constructor(
    public crudService: CrudServicesService,
    private activatedRoute: ActivatedRoute
    ) {
      this.texto = this.activatedRoute.snapshot.paramMap.get('nombre');
    }

  ngOnInit() {
  }

}
