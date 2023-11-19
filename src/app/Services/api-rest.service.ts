import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, doc, docData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Asignatura {
  id?: string;
  nombre: string;
}

export interface Persona {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  ocupacion: string;
  asignatura: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  usuarioActual: any;

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
  ) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAsignatura(): Observable<Asignatura[]> {
    const asignaturas = collection(this.firestore, 'asignatura');
    return collectionData(asignaturas, { idField: 'id' }) as Observable<Asignatura[]>;
  }

  getPersona(): Observable<Persona[]> {
    const usuarios = collection(this.firestore, 'usuarios');
    return collectionData(usuarios, { idField: 'id' }) as Observable<Persona[]>;
  }

  getPersonaId(id): Observable<Persona | undefined> {
    const usuarioid = doc(this.firestore, `usuarios/${id}`);
    return docData(usuarioid, { idField: 'id' }) as Observable<Persona | undefined>;
  }


  getAsignaturaById(id): Observable<Asignatura | undefined> {
    const asignaturaDoc = doc(this.firestore, `asignatura/${id}`);
    return docData(asignaturaDoc, { idField: 'id' }) as Observable<Asignatura | undefined>;
  }
  
}
