import { AfterViewInit, Component } from '@angular/core';
import { LoginInicioSeccion } from '../../components/login-inicio-seccion/login-inicio-seccion';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [LoginInicioSeccion],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '957495637126-gpvoqbqfb1lrs4pf5fieph8pturvorlf.apps.googleusercontent.com',

      callback: (response: any) => {
        console.log(response);

        // token google
        console.log(response.credential);
      }
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: "outline",
        size: "large",
        width: 300
      }
    );
  }
}
