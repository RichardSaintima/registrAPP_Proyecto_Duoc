import { Injectable } from '@angular/core';
import { collection, doc, collectionData, docData, Firestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Asignatura {
  asignacion: string;
  id?: string;
  nombre: string;
}

export interface Persona {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  ocupacion: string;
  // asignatura: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  public usuarioActualSubject: BehaviorSubject<Persona | null> = new BehaviorSubject<Persona | null>(null);
  usuarioActual$: Observable<Persona | null> = this.usuarioActualSubject.asObservable();

  constructor(
    public firestore: Firestore,
  ) { }

  getAsignatura(): Observable<Asignatura[]> {
    const asignaturas = collection(this.firestore, 'asignatura');
    return collectionData(asignaturas, { idField: 'id' })
      .pipe(
        catchError(error => {
          console.error('Error fetching asignaturas:', error);
          return [];
        })
      ) as Observable<Asignatura[]>;
  }

  getPersona(): Observable<Persona[]> {
    const usuarios = collection(this.firestore, 'usuarios');
    return collectionData(usuarios, { idField: 'id' })
      .pipe(
        catchError(error => {
          console.error('Error fetching usuarios:', error);
          return [];
        })
      ) as Observable<Persona[]>;
  }

  getPersonaId(id): Observable<Persona | undefined> {
    const usuarioid = doc(this.firestore, `usuarios/${id}`);
    return docData(usuarioid, { idField: 'id' })
      .pipe(
        catchError(error => {
          console.error('Error fetching usuario by ID:', error);
          return [];
        })
      ) as Observable<Persona | undefined>;
  }

  getAsignaturaById(id): Observable<Asignatura | undefined> {
    const asignaturaDoc = doc(this.firestore, `asignatura/${id}`);
    return docData(asignaturaDoc, { idField: 'id' })
      .pipe(
        catchError(error => {
          console.error('Error fetching asignatura by ID:', error);
          return [];
        })
      ) as Observable<Asignatura | undefined>;
  }

  setUsuarioActual(usuario: Persona | null): void {
    this.usuarioActualSubject.next(usuario);
  }
}
