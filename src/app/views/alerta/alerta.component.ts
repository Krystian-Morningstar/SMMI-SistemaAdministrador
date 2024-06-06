import { Component, OnInit } from '@angular/core';
import { AlertaService, Alerta } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  public Mostrar_Pantalla: boolean = false;
  public alertas: Alerta[] = [];

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.alertaService.alertas$.subscribe((alertas: Alerta[]) => {
      this.alertas = alertas;
      this.Mostrar_Pantalla = alertas.length > 0;
    });
  }
}
