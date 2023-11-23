import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { LoadingController, NavController, ToastController } from "@ionic/angular";
import { ApiRestService, Persona, Asignatura } from "../Services/API/api-rest.service";
import { AlumnoInicioPage } from "./alumno-inicio.page";
import { of } from 'rxjs';

class MockApiRestService {
  usuarioActual$ = of({ nombre: 'Juan' } as Persona);

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

describe('AlumnoInicioPage', () => {
  let component: AlumnoInicioPage;
  let fixture: ComponentFixture<AlumnoInicioPage>;
  let apiRestService: ApiRestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoInicioPage],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: LoadingController, useClass: MockLoadingController },
        { provide: NavController, useClass: MockNavController },
        { provide: ToastController, useClass: MockToastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoInicioPage);
    component = fixture.componentInstance;
    apiRestService = TestBed.inject(ApiRestService);
    fixture.detectChanges();
  }));

  it('Verificar persona', () => {
    expect(component.persona).toBeDefined();
  });

  it('Verificar asignaturas', () => {
    expect(component.asignaturas).toBeDefined('Calidad de Software');
  });

  it('Verificar userId', () => {
    expect(component.userId).toBeDefined('JBnkmGHv0ySDKQqxFTCy');
  });


});
