import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GenerarQRPage } from './generar-qr.page';
import { ApiRestService, Asignatura, Persona } from '../Services/API/api-rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

class MockApiRestService {
  getAsignatura() {
    return of({ nombre: 'Calidad de Software', id: 'ECDxQ9xFijYb1aucRHRR', asignacion: '' } as Asignatura);
  }

  setUsuarioActual(component: GenerarQRPage, usuario: Persona | null) {
    // Simular el BehaviorSubject para esProfesor y esAlumno
    component.usuarioActualSubject.next(usuario);
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => 'ECDxQ9xFijYb1aucRHRR', // representa 'id'
    },
  };
}

class MockBarcodeScanner {
  scan() {
    return Promise.resolve({ text: 'escaneo exitoso' } as any);
  }
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
        { provide: BarcodeScanner, useClass: MockBarcodeScanner },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('llama a barcodescan.scan() en LeerCode', () => {
    const mockBarcodeScanner = TestBed.inject(BarcodeScanner) as MockBarcodeScanner;
    spyOn(mockBarcodeScanner, 'scan'); 
    component.LeerCode(); 
    expect(mockBarcodeScanner.scan).toHaveBeenCalled(); 
  });

  it('establece forma de una asignatura', () => {

    expect(component.asignatura).toEqual({ nombre: 'Calidad de Software', id: 'ECDxQ9xFijYb1aucRHRR', asignacion: '04' });
  });
});

