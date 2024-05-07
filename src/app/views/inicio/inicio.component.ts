import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  habitaciones: any[] = []; 

  constructor(private habitacionesService: HabitacionesService, private router: Router) {}

  async ngOnInit(){
    await this.habitacionesService.habitaciones().subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        habitacion: habitacion
      }));
    });
  }

  seleccionarHabitacion(habitacion: any){
    this.router.navigate(['habitacion'], { queryParams: { id: habitacion.habitacion.id_ingreso } });
  }
}
