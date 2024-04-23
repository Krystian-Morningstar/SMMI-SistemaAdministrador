import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  api_url =environment.url_api + 'api/especialidades';
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  option = {headers: this.headers}

  especialidades(): Observable<string>{
    let result =  this.http.get<string>(this.api_url);
    return result;
  }
}
