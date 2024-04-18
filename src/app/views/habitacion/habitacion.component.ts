import { Component } from '@angular/core';
import { infoPaciente_interface } from 'src/app/models/infoPaciente.model';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent {
  informacionPaciente: infoPaciente_interface = {
    nombre: 'nombre',
    edad: 'edad',
    sexo: 'sexo',
    padecimientos: 'padecimientos',
    alergias: 'alergias',
    causaIngreso: 'causaIngreso',
    enfermera: 'enfermera',
    especialidad: 'especialidad',
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
