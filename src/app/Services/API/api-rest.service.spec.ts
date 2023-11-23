import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ApiRestService } from './api-rest.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Persona } from './api-rest.service';




describe('ApiRestService', () => {
  let service: ApiRestService;
  let firestoreMock: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    const firestoreSpy = jasmine.createSpyObj('Firestore', ['collection', 'doc']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: firestoreSpy }
      ]
    });

    service = TestBed.inject(ApiRestService);
    firestoreMock = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });



  // it('should get asignaturas', (done) => {
  //   const mockAsignaturas = [
  //     { asignacion: '01', nombre: 'Asignatura 1' },
  //     { asignacion: '02', nombre: 'Asignatura 2' }
  //   ];

  //   const collectionRefMock = jasmine.createSpyObj('CollectionReference', ['get']);
  //   collectionRefMock.get.and.returnValue(of({ docs: mockAsignaturas }));

  //   const firestoreMock: any = {
  //     collection: jasmine.createSpy().and.returnValue(collectionRefMock)
  //   };

  //   service.getAsignatura().subscribe((asignaturas) => {
  //     expect(asignaturas).toEqual(mockAsignaturas);
  //     done();
  //   });
  // });

  // it('should get personas', (done) => {
  //   const mockPersonas = [
  //     { id: '1', nombre: 'Persona 1', email: 'persona1@example.com', password: 'password', ocupacion: 'developer' },
  //     { id: '2', nombre: 'Persona 2', email: 'persona2@example.com', password: 'password', ocupacion: 'developer' }
  //   ];

  //   const collectionRefMock = jasmine.createSpyObj('CollectionReference', ['get']);
  //   collectionRefMock.get.and.returnValue(of({ docs: mockPersonas }));

  //   const firestoreCollectionMock: any = {
  //     collection: jasmine.createSpy().and.returnValue(collectionRefMock)
  //   };

  //   firestoreMock = {
  //     ...firestoreMock,
  //     ...firestoreCollectionMock
  //   };

  //   service.getPersona().subscribe((personas) => {
  //     expect(personas).toEqual(mockPersonas);
  //     done();
  //   });
  // });

  // it('should get persona by ID', (done) => {
  //   const mockPersona = { id: '1', nombre: 'Persona 1', email: 'persona1@example.com', password: 'password', ocupacion: 'developer' };
    
  //   const docRefMock = jasmine.createSpyObj('DocumentReference', ['get']);
  //   docRefMock.get.and.returnValue(of(mockPersona));

  //   const firestoreDocMock: any = {
  //     doc: jasmine.createSpy().and.returnValue(docRefMock)
  //   };

  //   firestoreMock = {
  //     ...firestoreMock,
  //     ...firestoreDocMock
  //   };

  //   service.getPersonaId('1').subscribe((persona) => {
  //     expect(persona).toEqual(mockPersona);
  //     done();
  //   });
  // });

  // it('should get asignatura by ID', (done) => {
  //   const mockAsignatura = { id: '01', asignacion: '01', nombre: 'Asignatura 1' };
    
  //   const docRefMock = jasmine.createSpyObj('DocumentReference', ['get']);
  //   docRefMock.get.and.returnValue(of(mockAsignatura));

  //   const firestoreDocMock: any = {
  //     doc: jasmine.createSpy().and.returnValue(docRefMock)
  //   };

  //   firestoreMock = {
  //     ...firestoreMock,
  //     ...firestoreDocMock
  //   };

  //   service.getAsignaturaById('01').subscribe((asignatura) => {
  //     expect(asignatura).toEqual(mockAsignatura);
  //     done();
  //   });
  // });


  it('establece usuario', fakeAsync(() => {
    const usuarioMock: Persona = { nombre: 'Pedro', email: 'pedro@gmai.com', password: 'contrasena', ocupacion: 'estudiente' };

    service.setUsuarioActual(usuarioMock);
    tick();

    service.usuarioActual$.subscribe((usuarioActual) => {
      expect(usuarioActual).toEqual(usuarioMock);
    });
  }));
});
