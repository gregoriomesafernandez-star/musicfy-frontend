import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-create',
  imports: [FormsModule],
  templateUrl: './album-create.html',
  styleUrl: './album-create.css',
})
export class AlbumCreate implements OnInit{
  
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  // Variables
  title_head = signal('Añadir albúm');
  success_message = signal('');

  //Registro album
  artistId = '';
  title = signal('');
  description = signal('');
  year = signal('');
  imageFile: File | null = null;

  //Constructor
  constructor(
    private _albumService: AlbumService,
    private _route: ActivatedRoute
  ){}

  //Funciones
  ngOnInit(): void {

    // Recogemos el ID del artista de la URL
    this._route.params.subscribe(params => {

      this.artistId = params['artistId'];

      console.log('ID del artista:', this.artistId);

    });

  }

  //Crear album
  onCreateAlbum(createForm: NgForm) {

    this._albumService.create(
      this.artistId,
      this.title(),
      this.description(),
      this.year(),
      this.imageFile
    ).subscribe({

      next: (response) => {

        console.log(response.message);

        this.success_message.set(response.message);

        //Reseteamos login
        createForm.resetForm();

        // Limpiamos archivo seleccionado
        this.imageFile = null;
        this.imageInput.nativeElement.value = '';
      },

      error: (error) => {

        console.error(error);

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
