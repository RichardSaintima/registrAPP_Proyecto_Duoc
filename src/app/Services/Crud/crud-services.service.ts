import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiRestService } from '../api-rest.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class CrudServicesService {
    usuarioActual: any;

    constructor(
        private storage: Storage,
        private apiRestService: ApiRestService,
        private auth: Auth
    ) {
        this.storage.create();
    }

}
