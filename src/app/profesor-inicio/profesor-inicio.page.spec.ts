import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProfesorInicioPage } from './profesor-inicio.page';
import { ApiRestService } from '../Services/API/api-rest.service';

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

describe('ProfesorInicioPage', () => {
  let component: ProfesorInicioPage;
  let fixture: ComponentFixture<ProfesorInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfesorInicioPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfesorInicioPage);
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

  // Aquí puedes agregar más pruebas para otros métodos en tu componente
});
