import { Component, signal, OnInit } from '@angular/core';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-artist-list',
  imports: [RouterLink],
  templateUrl: './artist-list.html',
  styleUrl: './artist-list.css',
})
export class ArtistList implements OnInit{

  // Variables
  title = signal('Artistas');
  artists = signal<Artist[]>([]);
  total = signal(0);
  pages = signal(0);
  page = signal(0);

  //Constructor
  constructor(
    private _artistService: ArtistService,
    private _route: ActivatedRoute,
    public authService: AuthService
  ){}

  //Funciones
  ngOnInit(): void {
    
    this._route.params.subscribe(params => {

      const page = Number(params['page']);

      this.page.set(page);

      this.getArtists(this.page());

    });
  }

  //Listar artistas
  getArtists(page: number){
    
    this._artistService.getArtists(page).subscribe({

        next: (response) => {

          this.artists.set(response.artists);
          this.total.set(response.totalArtists);
          this.pages.set(response.totalPages);
          this.page.set(response.page);

        },

        error: (error) => {
          console.error(error);
        }

      });
  }
  
  //Eliminar artista
  onDeleteArtist(id: string){

    this._artistService.deleteArtist(id).subscribe({

        next: (response) => {

            console.log(response.message);

            // Volvemos a cargar la lista
            this.getArtists(this.page());

        },

        error: (error) => {

          console.error('Error al eliminar artista:', error);

        }

    });

  }
  
}
