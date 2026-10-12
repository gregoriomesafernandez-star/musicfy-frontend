import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song-create',
  imports: [FormsModule],
  templateUrl: './song-create.html',
  styleUrl: './song-create.css',
})
export class SongCreate {

  @ViewChild('audioInput') audioInput!: ElementRef<HTMLInputElement>;

  // Variables
  title = signal('Añadir canción');
  success_message = signal('');

  //Registro artista
  albumId = '';
  number = signal('');
  name = signal('');
  duration = signal('');
  audioFile: File | null = null;

  //Constructor
  constructor(
    private _songService: SongService,
    private _route: ActivatedRoute
  ){}

  //Funciones
  ngOnInit(): void {

    // Recogemos el ID del album de la URL
    this._route.params.subscribe(params => {

      this.albumId = params['albumId'];

    });
  }

  //Crear canción
  onCreateSong(createForm: NgForm) {

    this._songService.create(
      this.albumId,
      this.number(),
      this.name(),
      this.duration(),
      this.audioFile
    ).subscribe({

      next: (response) => {

        console.log(response.message);

        this.success_message.set(response.message);

        //Reseteamos formulario
        createForm.resetForm();

        // Limpiamos archivo seleccionado
        this.audioFile = null;
        this.audioInput.nativeElement.value = '';
      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  //Seleccionamos audio
  onAudioSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.audioFile = input.files[0];
    }

  }

  back() {
    window.history.back();
  }
}
