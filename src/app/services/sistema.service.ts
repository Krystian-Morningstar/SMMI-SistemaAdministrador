import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
//mostrar perfil
private menuInSubject = new Subject<any>();
menuIn$ = this.menuInSubject.asObservable();

//mostrar alerta
private alertaInSubject = new Subject<any>();
alertaIn$ = this.alertaInSubject.asObservable();


Actualizar_Menu (menuIniciar : boolean){
  this.menuInSubject.next(menuIniciar);
}

Actualizar_Alerta(alertaIniciar: boolean){
  this.alertaInSubject.next(alertaIniciar);
}
}
