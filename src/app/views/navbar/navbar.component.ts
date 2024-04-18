import { Component } from '@angular/core';
import {SistemaService} from './../../services/sistema.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private servicio: SistemaService){
  }

  mostrar : boolean = false;
  mostrarAlarmaa : boolean = false;


  mostrarMenu(){
    if(this.mostrar== false){
      this.mostrar= true;
      this.servicio.Actualizar_Menu(true);
    } else{
      this.mostrar= false;
      this.servicio.Actualizar_Menu(false);
    }
  }

  mostrarAlarma(){
    if(this.mostrarAlarmaa== false){
      this.mostrarAlarmaa= true;
      this.servicio.Actualizar_Alerta(true);
    } else{
      this.mostrarAlarmaa= false;
      this.servicio.Actualizar_Alerta(false);
    }
  }
}
