import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  api_url =environment.url_api + 'api/admin/';
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  option = {headers: this.headers}

  perfil(matricula: string):Observable<string>{
    let result =  this.http.get<string>(this.api_url + matricula );
    return result;
  }

}
