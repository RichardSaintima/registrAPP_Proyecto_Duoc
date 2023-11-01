import { Component, OnInit } from '@angular/core';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQRPage implements OnInit {

  datoscaneado: any = {};

  constructor(private barcodescan: BarcodeScanner) { }

  LeerCode() {
    this.barcodescan.scan().then(barcodeData => {
        this.datoscaneado = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  ngOnInit() {
  }

}
