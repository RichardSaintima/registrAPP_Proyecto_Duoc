import { Component, OnInit } from '@angular/core';
import { CrudServicesService } from '../Services/crud-services.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  texto: any;
  
  constructor(public crudService: CrudServicesService) { }
  

  ngOnInit() {
  }

}
