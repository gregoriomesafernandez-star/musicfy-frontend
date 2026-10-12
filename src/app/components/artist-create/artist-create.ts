import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-artist-create',
  imports: [FormsModule],
  templateUrl: './artist-create.html',
  styleUrl: './artist-create.css',
})
export class ArtistCreate {

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  
  // Variables
  title = signal('Añadir artista');
  success_message = signal('');

  //Registro artista
  name = signal('');
  description = signal('');
  imageFile: File | null = null;

  //Constructor
  constructor(
    private _artistService: ArtistService
  ){}

  //Funciones
  onCreateArtist(createForm: NgForm){

    this._artistService.create(
      this.name(),
      this.description(),
      this.imageFile
    ).subscribe({

      next: (response) => {

        console.log(response.message);
        this.success_message.set(response.message);

        // Limpiamos archivo seleccionado
        this.imageFile = null;
        this.imageInput.nativeElement.value = '';

        //Reseteamos login
        createForm.resetForm();
      },

      error: (error) => {
        console.log(error);
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
