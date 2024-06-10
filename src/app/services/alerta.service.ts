import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alerta {
  habitacion: string;
  paciente: string;
  sensor: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertasSubject = new BehaviorSubject<Alerta[]>([]);
  public alertas$: Observable<Alerta[]> = this.alertasSubject.asObservable();

  agregarAlerta(alerta: Alerta): void {
    const alertas = this.alertasSubject.getValue();
    const existeAlerta = alertas.some(a => a.habitacion === alerta.habitacion);
    if (!existeAlerta) {
      this.alertasSubject.next([...alertas, alerta]);
    }
  }

  removerAlerta(habitacion: string): void {
    const alertas = this.alertasSubject.getValue();
    this.alertasSubject.next(alertas.filter(a => a.habitacion !== habitacion));
  }

  limpiarAlertas(): void {
    this.alertasSubject.next([]);
  }
}
