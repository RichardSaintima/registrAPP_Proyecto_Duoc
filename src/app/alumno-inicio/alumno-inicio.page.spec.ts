import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AlumnoInicioPage } from './alumno-inicio.page';
import { ApiRestService } from '../Services/api-rest.service';

class MockApiRestService {
  getAsignatura() {
    return of([]);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '1', // represents 'id'
    },
  };
}

describe('AlumnoInicioPage', () => {
  let component: AlumnoInicioPage;
  let fixture: ComponentFixture<AlumnoInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnoInicioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlumnoInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a defined persona', () => {
    expect(component.persona).toBeDefined();
  });

  it('should initialize with a defined asignaturas', () => {
    expect(component.asignaturas).toBeDefined();
  });

  it('should initialize with a defined userId', () => {
    expect(component.userId).toBeDefined();
  });
});
