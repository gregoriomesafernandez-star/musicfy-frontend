import { Component, signal } from '@angular/core';
import { SongService } from '../../services/song.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-song-edit',
  imports: [FormsModule],
  templateUrl: './song-edit.html',
  styleUrl: './song-edit.css',
})
export class SongEdit {

  // Variables
  title = signal('Actualizar canción');
  success_message = signal('');

  //Cancion
  number = signal('');
  name = signal('');
  duration = signal('');
  audio = signal('');
  audioFile: File | null = null;

  //Constructor
  constructor(
    private _songService: SongService,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {

    // Obtenemos el ID de la cancion de la URL
    this._route.params.subscribe(params => {

      const cancionId = params['id'];

      this.getSong(cancionId);

    });

  }

  //Obtenemos cancion
  getSong(id: string){

    this._songService.getSong(id).subscribe({

        next: (response) => {

          console.log('Canción obtenida:', response);

          // Rellenamos los inputs
          this.number.set(response.song.number);
          this.name.set(response.song.name);
          this.duration.set(response.song.duration);
          this.audio.set(response.song.file);

        },

        error: (error) => {
          console.error('Error al obtener la cancion:', error);
        }

      });
  }

  //Actualizamos canción
  onUpdateSong(updateForm: NgForm){

    this._route.params.subscribe(params => {

      const id = params['id'];

      this._songService.update(
        id,
        this.number(),
        this.name(),
        this.duration(),
        this.audioFile
      ).subscribe({

        next: (response) => {

          this.success_message.set(response.message);

          // Actualizamos la cancion mostrada
          if (response.song.file) {
              this.audio.set(response.song.file);
          }

        },

        error: (error) => {

          console.error(error);

        }

      });

    });

  }

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
