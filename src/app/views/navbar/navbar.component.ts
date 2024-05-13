import { Component, OnInit} from '@angular/core';
import {SistemaService} from './../../services/sistema.service'
import { Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private servicio: SistemaService, private router: Router, private habitacionesService: HabitacionesService){
  }
  mostrar : boolean = false;
  mostrarAlarmaa : boolean = false;
  buscar : string = '';

  ngOnInit(): void {
      this.mostrar = false;
    }

    mostrarMenu() {
      this.mostrar = !this.mostrar; // Alternar el estado del menú
      this.servicio.Actualizar_Menu(this.mostrar);
    }
  
    actualizarBuscar(event : Event): void{
      this.buscar=(event.target as HTMLInputElement).value;
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

  buscarHabitacion(nombre: any){
    this.habitacionesService.habitacionByNombre(nombre).subscribe((data: any) => {
      if(data.length > 0){
        console.log(data[0].id_habitacion.id_habitacion);
        this.router.navigate(['busqueda'], {
          queryParams: { id: nombre },
        });
      }else{
        alert('No se encontró la habitación');
      }
    });
  }
}
