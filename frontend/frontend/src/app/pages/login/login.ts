import { Component } from '@angular/core';
import { LoginInicioSeccion } from '../../components/login-inicio-seccion/login-inicio-seccion';

@Component({
  selector: 'app-login',
  imports: [LoginInicioSeccion],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
