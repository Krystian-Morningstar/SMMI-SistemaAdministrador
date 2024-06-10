import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { Subscription } from 'rxjs';
import { SignosService } from 'src/app/services/signos.service';
import { SistemaService } from 'src/app/services/sistema.service';
import { AlertaService, Alerta } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, OnDestroy {
  habitaciones: any[] = [];
  private mqttSubscriptions: Subscription[] = [];
  private timeoutHandles: { [key: string]: any } = {};

  constructor(
    private habitacionesService: HabitacionesService,
    private router: Router,
    private mqttService: SignosService,
    private sistemaService: SistemaService,
    private alertaService: AlertaService
  ) {}

  ngOnInit() {
    this.habitacionesService.habitaciones().subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        nombre: habitacion.id_habitacion.nombre_habitacion,
        ingreso: habitacion.id_ingreso,
        id: habitacion.id_habitacion.id_habitacion,
        paciente: habitacion.nombres + ' ' + habitacion.apellidos,
        topic_oxig: `SMMI/Sensores/Habitacion${habitacion.id_habitacion.id_habitacion}/oxig`,
        topic_freqCard: `SMMI/Sensores/Habitacion${habitacion.id_habitacion.id_habitacion}/freqCard`,
        topic_presArtsist: `SMMI/Sensores/Habitacion${habitacion.id_habitacion.id_habitacion}/presArtsist`,
        topic_presArtdiast: `SMMI/Sensores/Habitacion${habitacion.id_habitacion.id_habitacion}/presArtdiast`,
        topic_tempCorp: `SMMI/Sensores/Habitacion${habitacion.id_habitacion.id_habitacion}/tempCorp`,
        topic_emergencia: `SMMI/Habitacion${habitacion.id_habitacion.id_habitacion}/emergencia`,
      }));

      this.habitaciones.forEach((habitacion) => {
        this.subscribeToTopics(habitacion);
      });
    });
  }

  private subscribeToTopics(habitacion: any): void {
    // Suscribirse a los tópicos de sensores
    const tempSub = this.mqttService
      .subscribeToTopic(habitacion.topic_tempCorp)
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        if (data.id_habitacion === habitacion.id) {
          habitacion.temperatura = data.valor;
        }
      });
    this.mqttSubscriptions.push(tempSub);

    const oxigSub = this.mqttService
      .subscribeToTopic(habitacion.topic_oxig)
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        if (data.id_habitacion === habitacion.id) {
          habitacion.oxigeno = data.valor;
        }
      });
    this.mqttSubscriptions.push(oxigSub);

    const freqCardSub = this.mqttService
      .subscribeToTopic(habitacion.topic_freqCard)
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        if (data.id_habitacion === habitacion.id) {
          habitacion.ritmoCardiaco = data.valor;
        }
      });
    this.mqttSubscriptions.push(freqCardSub);

    const presArtsistSub = this.mqttService
      .subscribeToTopic(habitacion.topic_presArtsist)
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        if (data.id_habitacion === habitacion.id) {
          habitacion.presion = data.valor;
        }
      });
    this.mqttSubscriptions.push(presArtsistSub);

    const presArtsdiastSub = this.mqttService
      .subscribeToTopic(habitacion.topic_presArtdiast)
      .subscribe((news: string) => {
        const data = JSON.parse(news);
        if (data.id_habitacion === habitacion.id) {
          habitacion.presiondias = data.valor;
        }
      });
    this.mqttSubscriptions.push(presArtsdiastSub);

    // Suscribirse al tópico de emergencia
    const emergenciaSub = this.mqttService
      .subscribeToTopic(habitacion.topic_emergencia)
      .subscribe((news: string) => {
        this.handleEmergencyMessage(news, habitacion);
      });
    this.mqttSubscriptions.push(emergenciaSub);
  }

  private handleEmergencyMessage(message: string, habitacion: any): void {
    const data = JSON.parse(message);

    const alerta: Alerta = {
      habitacion: habitacion.nombre,
      paciente: habitacion.paciente,
      sensor: data.sensor,
      valor: data.valor,
    };
    this.alertaService.agregarAlerta(alerta);

    this.sistemaService.Actualizar_Alerta(true);

    if (this.timeoutHandles[habitacion.id]) {
      clearTimeout(this.timeoutHandles[habitacion.id]);
    }
    this.timeoutHandles[habitacion.id] = setTimeout(() => {
      this.sistemaService.Actualizar_Alerta(false);
      this.alertaService.removerAlerta(habitacion.nombre);
      location.reload(); 
    }, 5000);
  }

  seleccionarHabitacion(habitacion: any) {
    this.router.navigate(['habitacion'], {
      queryParams: { id: habitacion.ingreso },
    });
  }

  ngOnDestroy() {
    this.mqttSubscriptions.forEach((sub) => sub.unsubscribe());
  
    for (let handle in this.timeoutHandles) {
      if (this.timeoutHandles.hasOwnProperty(handle)) {
        clearTimeout(this.timeoutHandles[handle]);
      }
    }
  
    this.alertaService.limpiarAlertas();
    this.sistemaService.Actualizar_Alerta(false);
  }
  
}
