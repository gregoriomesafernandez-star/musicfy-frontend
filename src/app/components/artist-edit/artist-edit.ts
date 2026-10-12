import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-edit',
  imports: [FormsModule],
  templateUrl: './artist-edit.html',
  styleUrl: './artist-edit.css',
})
export class ArtistEdit implements OnInit {

  // Variables
  title = signal('Actualizar artista');
  success_message = signal('');

  //Artista
  name = signal('');
  description = signal('');
  image = signal('');
  imageFile: File | null = null;

  //Constructor
  constructor(
    private _artistService: ArtistService,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {

    // Obtenemos el ID del artista de la URL
    this._route.params.subscribe(params => {

      const id = params['id'];

      this.getArtist(id);

    });

  }

  //Obtener artista
  getArtist(id: string){

      this._artistService.getArtist(id).subscribe({

        next: (response) => {

          console.log('Artista obtenido:', response);

          // Rellenamos los inputs
          this.name.set(response.artist.name);
          this.description.set(response.artist.description);
          this.image.set(response.artist.image);


        },

        error: (error) => {
          console.error('Error al obtener el artista:', error);
        }

      });

  }

  //Actualizar artista
  onUpdateArtist(updateForm: NgForm) {

    this._route.params.subscribe(params => {

      const id = params['id'];

      this._artistService.update(
        id,
        this.name(),
        this.description(),
        this.imageFile
      ).subscribe({

        next: (response) => {

          this.success_message.set(response.message);

          // Actualizamos la imagen mostrada
          if (response.artist.image) {
              this.image.set(response.artist.image);
          }

        },

        error: (error) => {

          console.error(error);

        }

      });

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
