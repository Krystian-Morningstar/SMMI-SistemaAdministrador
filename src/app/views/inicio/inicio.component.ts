import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { Observable } from 'rxjs'; // Asegúrate de importar Observable
import { SignosService } from 'src/app/services/signos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  habitaciones: any[] = [];
  private mqttSubscriptions: { [topic: string]: Observable<string> } = {};

  constructor(
    private habitacionesService: HabitacionesService,
    private router: Router,

    private mqttService: SignosService
  ) {}

  async ngOnInit() {
    await this.habitacionesService.habitaciones().subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        nombre: habitacion.id_habitacion.nombre_habitacion,
        ingreso: habitacion.id_ingreso,
        id: habitacion.id_habitacion.id_habitacion,
        temperatura: 'Sin datos',
        oxigeno: 'Sin datos',
        presion: 'Sin datos',
        ritmoCardiaco: 'Sin datos',
        topic_oxig: `SMMI/Habitacion${habitacion.id_habitacion.id_habitacion}/oxig`,
        topic_freqCard: `SMMI/Habitacion${habitacion.id_habitacion.id_habitacion}/freqCard`,  
        topic_presArtsist: `SMMI/Habitacion${habitacion.id_habitacion.id_habitacion}/presArtsist`,  
        topic_tempCorp: `SMMI/Habitacion${habitacion.id_habitacion.id_habitacion}/tempCorp`,
      }));
  
      this.habitaciones.forEach((habitacion) => {
        // Suscribirse a la temperatura
        this.mqttSubscriptions[habitacion.topic_tempCorp] = this.mqttService.subscribeToTopic(habitacion.topic_tempCorp);
        this.mqttSubscriptions[habitacion.topic_tempCorp].subscribe((news: string) => {
          const data = JSON.parse(news);
          if (data.id_habitacion === habitacion.id) {
            habitacion.temperatura = data.valor;
          }
        });
  
        // Suscribirse a la oxigenación
        this.mqttSubscriptions[habitacion.topic_oxig] = this.mqttService.subscribeToTopic(habitacion.topic_oxig);
        this.mqttSubscriptions[habitacion.topic_oxig].subscribe((news: string) => {
          const data = JSON.parse(news);
          if (data.id_habitacion === habitacion.id) {
            habitacion.oxigeno = data.valor;
          }
        });
  
        // Suscribirse a la frecuencia cardíaca
        this.mqttSubscriptions[habitacion.topic_freqCard] = this.mqttService.subscribeToTopic(habitacion.topic_freqCard);
        this.mqttSubscriptions[habitacion.topic_freqCard].subscribe((news: string) => {
          const data = JSON.parse(news);
          if (data.id_habitacion === habitacion.id) {
            habitacion.ritmoCardiaco = data.valor;
          }
        });
  
        // Suscribirse a la presión arterial sistólica
        this.mqttSubscriptions[habitacion.topic_presArtsist] = this.mqttService.subscribeToTopic(habitacion.topic_presArtsist);
        this.mqttSubscriptions[habitacion.topic_presArtsist].subscribe((news: string) => {
          const data = JSON.parse(news);
          if (data.id_habitacion === habitacion.id) {
            habitacion.presion = data.valor;
          }
        });
      });
    });
  }
  
  seleccionarHabitacion(habitacion: any) {
    this.router.navigate(['habitacion'], {
      queryParams: { id: habitacion.ingreso },
    });
  }

  
}
