import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GenerarQRPage } from './generar-qr.page';
import { ApiRestService } from '../Services/api-rest.service';

class MockApiRestService {
  getAsignaturaById() {
    return of({ nombre: 'test', id: '1' });
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '1', // represents 'id'
    },
  };
}

describe('GenerarQRPage', () => {
  let component: GenerarQRPage;
  let fixture: ComponentFixture<GenerarQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarQRPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a defined asignatura', () => {
    expect(component.asignatura).toBeDefined();
  });

  it('should initialize with a defined texto', () => {
    expect(component.texto).toBeDefined();
  });

  it('should initialize with a defined id', () => {
    expect(component.id).toBeDefined();
  });

  // Aquí puedes agregar más pruebas para el método de LeerCode y otros métodos en tu componente
});
