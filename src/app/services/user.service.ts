import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  api_url = environment.url_api + 'api/auth/login';

   constructor(private http: HttpClient) {}
     headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  option = {headers: this.headers}

   loginUser(matricula: string, contraseña: string): Observable<any> {
     return this.http.post<string>(this.api_url,{matricula, contraseña});
   }
 }

//Para Prueba Local..
 //export class UserService {
 //  // Simulación de usuario autenticado (puedes modificar según tus necesidades)
 //  private usuarioAutenticado: Usuario = {
 //    matricula: 'A24032',
 //    contraseña: 'Password123'
 //  };
 //  constructor() {}
 //  loginUser(usuario: Usuario): Observable<any> {
 //    if (this.usuarioAutenticado.matricula === usuario.matricula && this.usuarioAutenticado.contraseña === usuario.contraseña) {
 //      return of({ success: true }); // Simulación de autenticación exitosa
 //    } else {
 //      return of({ success: false }); // Simulación de autenticación fallida
 //    }
 //  }
 //}