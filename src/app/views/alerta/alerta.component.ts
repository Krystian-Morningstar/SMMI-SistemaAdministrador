import { Component } from '@angular/core';
import { alerta_interface } from 'src/app/models/alerta.model';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent {
  
  public Mostrar_Pantalla: boolean = false;
  
  async ngOnInit(): Promise<void> {
    this.Mostrar_Pantalla = false;
  }
  alerta: alerta_interface ={
    habitacion: "habitacion 1",
    paciente: "paciente",
    ritmoCardiaco: "120",
    presion: "101",
    temperatura: "37",
    oxigeno: "20",
    enfermera: "Ana"
  }
}
