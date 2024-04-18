import { Component } from '@angular/core';
import { SistemaService } from './services/sistema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  title = 'administrador';
  showUserProfile = false;
  showAlarma = false;
  mostrar: boolean = false;
  mostrarAlarma: boolean = false;



  constructor(private servicio: SistemaService) {}

  toggleUserProfile() {
    this.showUserProfile = !this.showUserProfile;
  }

  toggleAlarma() {
    this.showAlarma = !this.showAlarma;
  }


  async ngOnInit() {
    this.servicio.menuIn$.subscribe((mostrar) => {
      this.mostrar = mostrar;
    });
    this.servicio.alertaIn$.subscribe((mostrarAlarma) => {
      this.mostrarAlarma = mostrarAlarma;
    });
  }
}
