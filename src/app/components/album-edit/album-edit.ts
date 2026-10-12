import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-edit',
  imports: [FormsModule],
  templateUrl: './album-edit.html',
  styleUrl: './album-edit.css',
})
export class AlbumEdit {

  // Variables
  title_update = signal('Actualizar album');
  success_message = signal('');

  //Album
  title = signal('');
  description = signal('');
  year = signal('');
  image = signal('');
  imageFile: File | null = null;

  //Constructor
  constructor(
    private _albumService: AlbumService,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {

    // Obtenemos el ID de album de la URL
    this._route.params.subscribe(params => {

      const id = params['id'];

      this.getAlbum(id);

    });

  }

  // Obtenemos el album
  getAlbum(id: string){

    this._albumService.getAlbum(id).subscribe({

        next: (response) => {

          console.log('Album obtenido:', response);

          // Rellenamos los inputs
          this.title.set(response.album.title);
          this.description.set(response.album.description);
          this.year.set(response.album.year);
          this.image.set(response.album.image);


        },

        error: (error) => {
          console.error('Error al obtener el album:', error);
        }

      });

  }

  //Actualizar album
  onUpdateAlbum(updateForm: NgForm) {

    this._route.params.subscribe(params => {

      const id = params['id'];

      this._albumService.update(
        id,
        this.title(),
        this.description(),
        this.year(),
        this.imageFile
      ).subscribe({

        next: (response) => {

          this.success_message.set(response.message);

          // Actualizamos la imagen mostrada
          if (response.album.image) {
              this.image.set(response.album.image);
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
