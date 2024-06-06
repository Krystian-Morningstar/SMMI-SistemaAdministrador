import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacioneService: HabitacionesService,
    private router: Router
  ) {}

  idIngreso: any;
  mensaje: string = '';
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
    id_habitacion: 0,
  };

  historialIncidencias: historialIncidencias_interface[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idIngreso = params['id'];
      const cachedInfo = localStorage.getItem('paciente_' + this.idIngreso);
      if (cachedInfo) {
        this.informacionPaciente = JSON.parse(cachedInfo);
      } else {
        this.habitacioneService
          .habitacion(this.idIngreso)
          .subscribe((data: any) => {
            this.informacionPaciente.nombres = data.nombres;
            this.informacionPaciente.apellidos = data.apellidos;
            this.informacionPaciente.edad = data.edad;
            this.informacionPaciente.sexo = data.sexo;
            this.informacionPaciente.padecimientos = data.padecimientos;
            this.informacionPaciente.alergias = data.alergias;
            this.informacionPaciente.causa_ingreso = data.causa_ingreso;
            this.informacionPaciente.id_enfermera =
              data.id_enfermera.nombres + ' ' + data.id_enfermera.apellidos;
            this.informacionPaciente.id_especialidad =
              data.id_especialidad.nombre;
            this.informacionPaciente.id_habitacion =
              data.id_habitacion.nombre_habitacion;
            localStorage.setItem(
              'paciente_' + this.idIngreso,
              JSON.stringify(this.informacionPaciente)
            );
          });
      }
    });

    this.incidencias();
  }

  async alta() {
    const confirmacion = window.confirm(
      '¿Estás seguro de realizar esta acción?'
    );
    if (confirmacion) {
      try {
        await this.habitacioneService.alta(this.idIngreso).toPromise();
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
      this.mensaje = 'Acción realizada correctamente.';
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = 'Acción cancelada.';
      setTimeout(() => {
        this.mensaje = '';
      }, 1500);
    }
  }

  async incidencias() {
    this.habitacioneService
      .historialIncidencias(this.idIngreso)
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          data.forEach((incidencia: any) => {
            const fechaHora = new Date(incidencia.fecha_registro);

            const fecha = `${fechaHora.getDate()}/${
              fechaHora.getMonth() + 1
            }/${fechaHora.getFullYear()}`;
            let horas = fechaHora.getHours().toString();
            let minutos = fechaHora.getMinutes().toString();
            let segundos = fechaHora.getSeconds().toString();
            const hora = `${horas.padStart(2, '0')}:${minutos.padStart(
              2,
              '0'
            )}:${segundos.padStart(2, '0')}`;

            const informacionPaciente: historialIncidencias_interface = {
              horaAlarma: hora,
              fecha: fecha,
              duracion: incidencia.duracion_emergencia_sg,
              eventoCritico: incidencia.evento_critico,
              accionesTomadas: incidencia.acciones_tomadas,
            };

            this.historialIncidencias.push(informacionPaciente);
          });
        }
      });
  }
}
