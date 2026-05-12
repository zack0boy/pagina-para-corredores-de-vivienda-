import { Component, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-login-inicio-seccion',
  imports: [],
  templateUrl: './login-inicio-seccion.html',
  styleUrl: './login-inicio-seccion.css',
})
export class LoginInicioSeccion {
  private configService = inject(ConfigService);
  company = this.configService.getCompany();
}
