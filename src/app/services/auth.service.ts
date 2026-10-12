import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  identity = signal<User | null>(null);
  token = signal<string | null>(null);
  
}