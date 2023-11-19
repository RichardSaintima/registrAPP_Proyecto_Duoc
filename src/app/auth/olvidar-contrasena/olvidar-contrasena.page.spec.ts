import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OlvidarContrasenaPage } from './olvidar-contrasena.page';

describe('OlvidarContrasenaPage', () => {
  let component: OlvidarContrasenaPage;
  let fixture: ComponentFixture<OlvidarContrasenaPage>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OlvidarContrasenaPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with one control (email)', () => {
    expect(component.credencial.contains('email')).toBeTruthy();
  });

  it('should make the email control required', () => {
    let control = component.credencial.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  // Aquí puedes agregar más pruebas para el método de recuperar y otros métodos en tu componente
});
