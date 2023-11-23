import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { ProfesorInicioPage } from './profesor-inicio.page';
import { ApiRestService, Persona, Asignatura } from '../Services/API/api-rest.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { of } from 'rxjs';

class MockApiRestService {
  usuarioActual$ = of({ nombre: 'Diana' } as Persona);

  getAsignatura() {
    return of([
      { asignacion: '01' },
      { asignacion: '02' },
      { asignacion: '03' },
      { asignacion: '04' },
      { asignacion: '05' },
      { asignacion: '06' },
    ]);
  }

  setUsuarioActual(usuario: Persona | null) {
  
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '1',
    },
  };
}

class MockLoadingController {
  create() {
    return jasmine.createSpyObj('Loading', ['present', 'dismiss']);
  }
}

class MockNavController {
  navigateRoot = jasmine.createSpy('navigateRoot');
}

class MockToastController {
  create() {
    return jasmine.createSpyObj('Toast', ['present']);
  }
}

describe('ProfesorInicioPage', () => {  let component: ProfesorInicioPage;
  let fixture: ComponentFixture<ProfesorInicioPage>;
  let apiRestService: ApiRestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorInicioPage],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: LoadingController, useClass: MockLoadingController },
        { provide: NavController, useClass: MockNavController },
        { provide: ToastController, useClass: MockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorInicioPage);
    component = fixture.componentInstance;
    apiRestService = TestBed.inject(ApiRestService);
    fixture.detectChanges();
  }));

  describe('filterAsignaturas', () => {
    it('Filtrar asignaturas profesora Diana', fakeAsync(() => {
      // Arrange
      component.persona = { nombre: 'Diana' } as Persona;

      // Act
      let asignaturas: Asignatura[] | undefined;
      apiRestService.getAsignatura().subscribe((res: Asignatura[]) => {
        asignaturas = component.filterAsignaturas(res, component.persona.nombre);
      });
      tick();

      // Assert
      expect(asignaturas!.length).toBe(2);
      expect(asignaturas![0].asignacion).toBe('01');
      expect(asignaturas![1].asignacion).toBe('02');
    }));


    it('Filtrar asignaturas profesor Juan', fakeAsync(() => {
      // Arrange
      component.persona = { nombre: 'Juan' } as Persona;

      // Act
      let asignaturas: Asignatura[] | undefined;
      apiRestService.getAsignatura().subscribe((res: Asignatura[]) => {
        asignaturas = component.filterAsignaturas(res, component.persona.nombre);
      });
      tick();

      // Assert
      expect(asignaturas!.length).toBe(2);
      expect(asignaturas![0].asignacion).toBe('03');
      expect(asignaturas![1].asignacion).toBe('04');
    }));


    it('Filtrar asignaturas profesora www', fakeAsync(() => {
      // Arrange
      component.persona = { nombre: 'www' } as Persona;

      // Act
      let asignaturas: Asignatura[] | undefined;
      apiRestService.getAsignatura().subscribe((res: Asignatura[]) => {
        asignaturas = component.filterAsignaturas(res, component.persona.nombre);
      });
      tick();

      // Assert
      expect(asignaturas!.length).toBe(2);
      expect(asignaturas![0].asignacion).toBe('05');
      expect(asignaturas![1].asignacion).toBe('06');
    }));

   
  });
});
