import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare const google: any;

declare global {
  interface Window {
    googleIdentityInitialized?: boolean;
  }
}

@Component({
  selector: 'app-login-inicio-seccion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-inicio-seccion.html',
  styleUrl: './login-inicio-seccion.css',
})
export class LoginInicioSeccion implements OnInit, AfterViewInit {
  private configService = inject(ConfigService);
  private fb = inject(FormBuilder);

  company = this.configService.getCompany();
  loginForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  googleUser: GoogleUser | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    console.log('Formulario de login inicializado');

    this.loginForm.valueChanges.subscribe((value) => {
      console.log('Datos capturados del formulario en tiempo real:', {
        ...value,
        valido: this.loginForm.valid,
        invalido: this.loginForm.invalid
      });
    });
  }

  ngAfterViewInit(): void {
    if (typeof google === 'undefined') {
      console.warn('Google Identity Services no está cargado.');
      return;
    }

    if (!window.googleIdentityInitialized) {
      google.accounts.id.initialize({
        client_id: '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com',
        callback: (response: any) => {
          this.googleUser = this.decodeGoogleCredential(response.credential);

          console.log('Respuesta completa de Google:', response);
          console.log('Usuario de Google:', this.googleUser);
          console.log('Usuario de Google en tabla:');
          console.table(this.googleUser ?? {});
        }
      });

      window.googleIdentityInitialized = true;
    }

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      width: 300
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    console.log('Datos capturados del formulario:', {
      email,
      password,
      formularioCompleto: this.loginForm.value,
      valido: this.loginForm.valid,
      invalido: this.loginForm.invalid
    });

    if (this.loginForm.invalid) {
      this.error = 'Por favor completa los campos correctamente';
      this.success = '';
      console.warn('El formulario no es válido, no se envía nada al backend.');
      return;
    }

    this.error = '';
    this.success = 'Datos capturados. Revisa la consola del navegador.';
    this.loginForm.reset();
  }

  private decodeGoogleCredential(token: string): GoogleUser | null {
    try {
      const payload = token.split('.')[1];
      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(normalizedPayload)
        .split('')
        .map((character) => `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('');

      return JSON.parse(decodeURIComponent(decodedPayload)) as GoogleUser;
    } catch (error) {
      console.error('No se pudo decodificar el usuario de Google:', error);
      return null;
    }
  }
}

interface GoogleUser {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  sub?: string;
  hd?: string;
}
