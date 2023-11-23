import { TestBed, async, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { HomePage } from './home.page';
import { ApiRestService, Persona } from '../Services/API/api-rest.service';

class MockApiRestService {
  usuarioActual$ = of({ nombre: 'Pedro' } as Persona);

  getPersona() {
    return of([{ nombre: 'Pedro', password: 'contrasena', ocupacion: 'estudiente', id: 'JBnkmGHv0ySDKQqxFTCy', email: 'pedro@gmai.com' }]);
  }

  setUsuarioActual(usuario: Persona | null) {

  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiRestService: ApiRestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: ApiRestService, useClass: MockApiRestService },
      ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiRestService = TestBed.inject(ApiRestService);
    fixture.detectChanges();
  }));

  it('verificar formulario (nombre y password)', () => {
    expect(component.credencial.contains('nombre')).toBeTruthy();
    expect(component.credencial.contains('password')).toBeTruthy();
  });

  it('verificar nombre', () => {
    let control = component.credencial.get('nombre');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('verificar contraseña', () => {
    let control = component.credencial.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('inicio de sesion exitoso', async () => {
    spyOn(apiRestService, 'getPersona').and.returnValue(of([{ nombre: 'Pedro', password: 'contrasena', ocupacion: 'estudiente', id: 'JBnkmGHv0ySDKQqxFTCy', email: 'pedro@gmai.com'}]));

    component.credencial.patchValue({
      nombre: 'Pedro',
      password: 'contrasena'
    });

    await component.login();

    expect(apiRestService.setUsuarioActual).toHaveBeenCalled();
    expect(apiRestService.setUsuarioActual).toHaveBeenCalledWith(jasmine.objectContaining({ nombre: 'Pedro' }));
    expect(component.principal.navigateForward).toHaveBeenCalledWith('/alumno-inicio/JBnkmGHv0ySDKQqxFTCy');
    expect(component.mensaje).toHaveBeenCalledWith('Inicio de sesión exitoso', 'success', 'checkmark-done-outline');
  });

});
