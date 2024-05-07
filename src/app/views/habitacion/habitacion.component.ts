import { Component } from '@angular/core';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { registro_Interface } from 'src/app/models/registro.model';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent {

constructor(private activatedRoute: ActivatedRoute, private habitacioneService: HabitacionesService,private router: Router) {}
idIngreso: any
mensaje: string = '';

ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe(params => {
    this.idIngreso= params['id'];
  });

  this.habitacioneService.habitacion(this.idIngreso).subscribe((data: any) => {
    this.informacionPaciente.nombres = data.nombres;
    this.informacionPaciente.apellidos = data.apellidos;
    this.informacionPaciente.edad = data.edad;
    this.informacionPaciente.sexo = data.sexo;
    this.informacionPaciente.padecimientos = data.padecimientos;
    this.informacionPaciente.alergias = data.alergias;
    this.informacionPaciente.causa_ingreso = data.causa_ingreso;
    this.informacionPaciente.id_enfermera = data.id_enfermera.nombres + ' ' + data.id_enfermera.apellidos;
    this.informacionPaciente.id_especialidad = data.id_especialidad.nombre;
    this.informacionPaciente.id_habitacion = data.id_habitacion.id_habitacion;
  });
}

  async alta(){
    const confirmacion = window.confirm("¿Estás seguro de realizar esta acción?");
    if (confirmacion) {
      try {
        await this.habitacioneService.alta(this.idIngreso).toPromise();
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
            this.mensaje = "Acción realizada correctamente."; 
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = "Acción cancelada."; 
      setTimeout(() => {
        this.mensaje = ''; 
      }, 1500);
    }

  }
  informacionPaciente: registro_Interface = {
    nombres: '',
    apellidos: '',
    edad: 0,
    sexo: '',
    padecimientos: '',
    alergias: '',
    causa_ingreso: '',
    id_enfermera: '',
    id_especialidad: 0,
    id_habitacion:0,
  };


  historialIncidencias = [
    {
      horaAlarma: '10:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 1',
      accionesTomadas: 'Acciones 1',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
  ];
}
