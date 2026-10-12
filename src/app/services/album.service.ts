import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) {}
  
  //Crear album
  create(
    artistId: string,
    title: string, 
    description: string, 
    year: string,
    image?: File | null
  ) {

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);
    formData.append('artist', artistId);

    if (image) {
      formData.append('image', image);
    }

    return this._http.post<{
        message: string;
    }>(
      `${this.apiUrl}/album`,
      formData
    );
  }

  //Obtener album
  getAlbum(id: string) {

    return this._http.get<{
      album: Album;
    }>(
      `${this.apiUrl}/album/${id}`
    );

  }

  //Obtener albums de artista
  getAlbums(artistId: string) {
    return this._http.get<{
        albums: Album[];
    }>(
      `${this.apiUrl}/albums/${artistId}`,
    );
  }

  //Obtener albums
  getAlbumsAll() {
    return this._http.get<{
        albums: Album[];
    }>(
      `${this.apiUrl}/albums`,
    );
  }

  //Actualizar album
  update(
    id: string,
    title: string,
    description: string,
    year: string,
    image?: File | null
  ) {

    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);

    if (image) {
      formData.append('image', image);
    }

    return this._http.put<{
      message: string;
      album: Album;
    }>(
      `${this.apiUrl}/album/${id}`,
      formData
    );
  }

  //Eliminar album
  deleteAlbum(id: string){

    return this._http.delete<{
        message: string;
    }>(
        `${this.apiUrl}/album/${id}`
    );

  }
}