import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  api_url =environment.url_api + 'api/ingresos/activos';
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  option = {headers: this.headers}

  habitaciones(): Observable<string>{
    let result =  this.http.get<string>(this.api_url);
    return result;
  }

  habitacion(id: string): Observable<string>{
    let result =  this.http.get<string>(environment.url_api + 'api/ingresos/'+ id);
    return result;
  }
  alta(id: string){
    let result =  this.http.patch<any>(environment.url_api + 'api/ingresos/'+ id, {});
    return result;
  }
  habitacionByNombre(nombre: string): Observable<string>{
    let result =  this.http.get<string>(environment.url_api + 'api/ingresos/busq/?nombre='+ nombre);
    return result;
  }
  historialIncidencias(id: string): Observable<string>{
    let result =  this.http.get<string>(environment.url_api + 'api/alertas-reportes/comp/'+ id);
    return result;
  }
}
