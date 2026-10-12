import { Injectable, signal } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentSong = signal<Song | null>(null);

  playSong(song: Song) {
    this.currentSong.set(song);
  }

}