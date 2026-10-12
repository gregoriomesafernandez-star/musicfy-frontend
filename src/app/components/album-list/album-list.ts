import { Component, OnInit, signal } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-list',
  imports: [RouterLink],
  templateUrl: './album-list.html',
  styleUrl: './album-list.css',
})
export class AlbumList {

  //Variables
  albums = signal<any[]>([]);

  //Constructor
  constructor(
    private _albumService: AlbumService,
    public authService: AuthService,
    private _userService: UserService
  ){}

  ngOnInit(){

    //Peristimos idenidad y token
    this.authService.identity.set(
      this._userService.getIdentity()
    );

    this.authService.token.set(
      this._userService.getToken()
    );

    this.getAlbums();
  }

  //Obtener albums
  getAlbums(){

    this._albumService.getAlbumsAll().subscribe({

        next: (response) => {

          this.albums.set(response.albums);

        },

        error: (error) => {
          console.error('Error al obtener los albums:', error);
        }

      });

  }

  //Eliminar album
  onDeleteAlbum(id: string){

    this._albumService.deleteAlbum(id).subscribe({

        next: (response) => {

            console.log(response.message);

              // Volvemos a cargar albums de artista
              this.getAlbums();

        },

        error: (error) => {

          console.error('Error al eliminar artista:', error);

        }

    });

  }
}
