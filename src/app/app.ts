import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from './services/user.service';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink, RouterOutlet, LucideAngularModule, RouterLinkActive],
  templateUrl: './app.html'
})
export class App implements OnInit {


  // Variables
  title = signal('MUSICFY');

  errorMessage = signal('');
  success_message = signal('');
  menuOpen = signal(false);

  // LOGIN
  email = "";
  password = "";

  // REGISTRO
  name = "";
  surname = "";
  registerEmail = "";
  registerPassword = "";

  constructor(
    private _userService: UserService,
    public authService: AuthService,
    public _playerService: PlayerService
  ) {}

  ngOnInit(){

    //Peristimos idenidad y token
    this.authService.identity.set(
      this._userService.getIdentity()
    );

    this.authService.token.set(
      this._userService.getToken()
    );

  }

  onLogin(loginForm: NgForm) {

    //Borramos mensaje de error si lo hay
    this.errorMessage.set('');

    //Peticion al backend con servicio
    this._userService.login(this.email, this.password)
      .subscribe({
        next: (response) => {

          console.log('Respuesta del servidor:', response);

          //Guardamos respuesta de usuario y token en variables signal de servicio
          this.authService.identity.set(response.user);
          this.authService.token.set(response.token);

          // Guardamos en localStorage
          localStorage.setItem('identity', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);

          //Reseteamos login
          loginForm.resetForm();

        },

        error: (error) => {
          console.error('Error en el login:', error);
          this.errorMessage.set('El correo o la contraseña no son correctos');
        }
      });
  }

  //Cerrar sesión
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.authService.identity.set(null);
    this.authService.token.set(null);

    //Limpiamos mensaje success de registro
    this.success_message.set('');
  }

  //Registro de usuario
  onRegister(registerForm: NgForm) {

    this._userService.register(
      this.name,
      this.surname,
      this.registerEmail,
      this.registerPassword
    ).subscribe({
      next: (response) => {
        console.log('Registro correcto:', response);

        this.success_message.set('Se ha creado el usuario correctamente. Identíficate con '+ response.email);

        //Reseteamos registro
        registerForm.resetForm();

      },

      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });

  }
}
