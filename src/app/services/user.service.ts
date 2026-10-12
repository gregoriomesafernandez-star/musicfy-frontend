import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = 'http://localhost:3000/api';

    constructor(private _http: HttpClient) {}

    //Funcion login
    login(email: string, password: string) {

        return this._http.post<LoginResponse>(`${this.apiUrl}/login`,
            {
                email,
                password
            }
        );

    }

    //Obtenemos usuario logeado
    getIdentity(): User | null {
        const identity = localStorage.getItem('identity');

        return identity ? JSON.parse(identity) : null;
    }

    //Obtenemos token de usuario
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    //Funcion de registro
    register(
        name: string,
        surname: string,
        email: string,
        password: string
    ) {
        return this._http.post<User>(`${this.apiUrl}/register`, {
            name,
            surname,
            email,
            password
        });
    }

    update(
        name: string,
        surname: string,
        email: string,
        image?: File
    ) {

        const formData = new FormData();

        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('email', email);

        if (image) {
            formData.append('image', image);
        }

        return this._http.put<{ user: User }>(
            `${this.apiUrl}/update-user`,
            formData
        );
    }
  
}