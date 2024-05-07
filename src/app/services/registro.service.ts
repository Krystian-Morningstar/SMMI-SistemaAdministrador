import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  api_url =environment.url_api + 'api/ingresos';
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  option = {headers: this.headers}

  registrarIngreso(data: any): Observable<string>{
    let result =  this.http.post<string>(this.api_url, data);
    return result;
  }
}
