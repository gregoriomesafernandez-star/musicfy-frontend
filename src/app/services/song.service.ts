import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) {}
  
  //Crear canción
  create(
    albumId: string,
    number: string, 
    name: string, 
    duration: string,
    audio?: File | null
  ) {

    const formData = new FormData();

    formData.append('number', number);
    formData.append('name', name);
    formData.append('duration', duration);
    formData.append('album', albumId);

    if (audio) {
      formData.append('file', audio);
    }

    return this._http.post<{
        message: string;
    }>(
      `${this.apiUrl}/song`,
      formData
    );
  }

  //Obtener cancion
  getSong(id: string) {
    return this._http.get<{
        song: Song;
    }>(
      `${this.apiUrl}/song/${id}`,
    );
  }

  //Obtener canciones de album
  getSongs(albumId: string) {
    return this._http.get<{
        songs: Song[];
    }>(
      `${this.apiUrl}/songs/${albumId}`,
    );
  }

  //Obtener canciones
  getSongsAll() {
    return this._http.get<{
        songs: Song[];
    }>(
      `${this.apiUrl}/songs`,
    );
  }

  //Actualizar canción
  update(
      id: string,
      number: string,
      name: string,
      duration: string,
      audio?: File | null
    ) {
  
      const formData = new FormData();
  
      formData.append('number', number);
      formData.append('name', name);
      formData.append('duration', duration);
  
      if (audio) {
        formData.append('file', audio);
      }
  
      return this._http.put<{
        message: string;
        song: Song;
      }>(
        `${this.apiUrl}/song/${id}`,
        formData
      );
    }

  //Eliminar canción
  deleteSong(id: string){

    return this._http.delete<{
        message: string;
    }>(
        `${this.apiUrl}/song/${id}`
    );

  }
}