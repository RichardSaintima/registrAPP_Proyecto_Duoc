import { TestBed, async, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { OlvidarContrasenaPage } from './olvidar-contrasena.page';
import { ApiRestService, Persona } from 'src/app/Services/API/api-rest.service';

class MockApiRestService {
  getPersona() {
    return of([]);
  }
}

describe('OlvidarContrasenaPage', () => {
  let component: OlvidarContrasenaPage;
  let fixture: ComponentFixture<OlvidarContrasenaPage>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OlvidarContrasenaPage],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Verificar ingreso (email)', () => {
    expect(component.credencial.contains('email')).toBeTruthy();
  });

  it('Validar email', () => {
    let control = component.credencial.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('no se ingresó email', async () => {
    spyOn(component, 'mensaje');
    component.credencial.patchValue({ email: '' });
    await component.recuperar();

    expect(component.mensaje).toHaveBeenCalledWith('Ingrese correo', 'danger');
  });

  it('email no existe', async () => {
    spyOn(component, 'mensaje');
    spyOn(component.apiRestService, 'getPersona').and.returnValue(of([]));

    component.credencial.patchValue({ email: 'nonexistent@example.com' });
    await component.recuperar();

    expect(component.mensaje).toHaveBeenCalledWith('Correo no registrado', 'danger');
  });
});
