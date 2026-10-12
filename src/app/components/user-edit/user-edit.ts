import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-edit',
  imports: [FormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements OnInit{

  // Variables
  title = signal('Editar datos de usuario');
  success_message = signal('');

  // Editar
  name = "";
  surname = "";
  email = "";
  imageFile: File | null = null;

  // Constructor
  constructor(
    private _userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {

    // Obtenemos el usuario del Signal compartido
    const user = this.authService.identity();

    // Rellenamos el formulario
    this.name = user?.name ?? '';
    this.surname = user?.surname ?? '';
    this.email = user?.email ?? '';
  }

  //Actualizar usuario
  onUpdate() {

    this._userService.update(
        this.name,
        this.surname,
        this.email,
        this.imageFile ?? undefined
    ).subscribe({

        next: (response) => {

            console.log('Usuario actualizado:', response);

            // Actualizamos el usuario global
            this.authService.identity.set(response.user);

            // Actualizamos localStorage
            localStorage.setItem('identity', JSON.stringify(response.user));

            // Mensaje
            this.success_message.set('Usuario actualizado correctamente');

            // Limpiamos archivo seleccionado
            this.imageFile = null;
        },

        error: (error) => {

            console.error(
                'Error al actualizar:',
                error
            );

        }

    });
 }

  onImageSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }

  }

  back() {
    window.history.back();
  }
}
