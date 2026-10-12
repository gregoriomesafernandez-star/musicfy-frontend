import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) {}

  getArtists(page: number) {

    return this._http.get<{
      artists: Artist[],
      totalArtists: number,
      totalPages: number,
      page: number
    }>(`${this.apiUrl}/artists/${page}`);

  }

  getArtist(id: string) {

    return this._http.get<{
      artist: Artist;
    }>(
      `${this.apiUrl}/artist/${id}`
    );

  }
  
  create(
    name: string, 
    description: string, 
    image?: File | null
  ) {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);

    if (image) {
      formData.append('image', image);
    }

    return this._http.post<{
        message: string;
    }>(
      `${this.apiUrl}/artist`,
      formData
    );
  }

  update(
    id: string,
    name: string,
    description: string,
    image?: File | null
  ) {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);

    if (image) {
      formData.append('image', image);
    }

    return this._http.put<{
      message: string;
      artist: Artist;
    }>(
      `${this.apiUrl}/artist/${id}`,
      formData
    );
  }
  
  deleteArtist(id: string){

    return this._http.delete<{
        message: string;
    }>(
        `${this.apiUrl}/artist/${id}`
    );

  }
}