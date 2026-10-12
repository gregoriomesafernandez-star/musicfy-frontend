import { Component, OnInit, signal } from '@angular/core';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-song-list',
  imports: [RouterLink],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css',
})
export class SongList implements OnInit{

  //Variables
  songs = signal<any[]>([]);

  //Constructor
  constructor(
    private _songService: SongService,
    public authService: AuthService,
    private _userService: UserService,
    public _playerService: PlayerService
  ){}

  ngOnInit(){

    //Peristimos idenidad y token
    this.authService.identity.set(
      this._userService.getIdentity()
    );

    this.authService.token.set(
      this._userService.getToken()
    );

    this.getSongs();
  }

  //Obtener canciones
  getSongs(){

    this._songService.getSongsAll().subscribe({

        next: (response) => {

          this.songs.set(response.songs);

        },

        error: (error) => {
          console.error('Error al obtener las canciones:', error);
        }

      });

  }

  //Eliminar cancion de la lista
  onDeleteSong(id: string){

    this._songService.deleteSong(id).subscribe({

        next: (response) => {

            console.log(response.message);



              // Volvemos a cargar canciones de album
              this.getSongs();

        },

        error: (error) => {

          console.error('Error al eliminar cancion:', error);

        }

    });

  }
}
