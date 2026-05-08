import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInicioSeccion } from './login-inicio-seccion';

describe('LoginInicioSeccion', () => {
  let component: LoginInicioSeccion;
  let fixture: ComponentFixture<LoginInicioSeccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInicioSeccion],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInicioSeccion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
