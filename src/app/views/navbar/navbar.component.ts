import { Component, OnInit, HostListener } from '@angular/core';
import { SistemaService } from './../../services/sistema.service';
import { Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private servicio: SistemaService, private router: Router, private habitacionesService: HabitacionesService) { }

  mostrar: boolean = false;
  mostrarAlarmaa: boolean = false;
  buscar: string = '';

  ngOnInit(): void {
    this.mostrar = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.mostrar == true) {
      this.mostrar = false;
      this.servicio.Actualizar_Menu(false);
    }
  }

  mostrarMenu(event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento para que no llegue al documento
    this.mostrar = !this.mostrar; // Alternar el estado del menú
    this.servicio.Actualizar_Menu(this.mostrar);
  }

  actualizarBuscar(event: Event): void {
    this.buscar = (event.target as HTMLInputElement).value;
  }

  mostrarAlarma() {
    if (this.mostrarAlarmaa == false) {
      this.mostrarAlarmaa = true;
      this.servicio.Actualizar_Alerta(true);
    } else {
      this.mostrarAlarmaa = false;
      this.servicio.Actualizar_Alerta(false);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscarHabitacion(this.buscar); // Llama a la función buscar cuando se presiona "Enter" y pasa el argumento 'nombre'
    }
  }
  buscarHabitacion(nombre: any) {
    this.habitacionesService.habitacionByNombre(nombre).subscribe((data: any) => {
      if (data.length > 0) {
        console.log(data[0].id_habitacion.id_habitacion);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['busqueda'], { queryParams: { id: nombre } });
        });
      } else {
        alert('No se encontró la habitación');
      }
    });
  }
}
