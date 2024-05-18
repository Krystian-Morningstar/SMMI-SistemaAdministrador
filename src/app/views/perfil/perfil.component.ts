import { Component, OnInit } from '@angular/core';
import { perfil_interface } from 'src/app/models/perfil.model';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: perfil_interface = {
    nombres: "",
    apellidos: "",
    matricula: "",
    telefono: "",
    imagen: ""
  };
  

  constructor(private router: Router, private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.obtenerPerfilFromCache();
  }

  async obtenerPerfilFromCache() {
    let cachedProfile = localStorage.getItem('cachedProfile');
    if (cachedProfile) {
      this.perfil = JSON.parse(cachedProfile);
    } else {
      await this.obtenerPerfil();
    }
  }

  async obtenerPerfil() {
    let matricula = localStorage.getItem('matricula');
    if (matricula) {
      try {
        let response: any = await this.perfilService.perfil(matricula).toPromise();
        this.perfil.nombres = response.nombres;
        this.perfil.apellidos = response.apellidos;
        this.perfil.matricula = response.matricula;
        this.perfil.telefono = response.telefono;
        this.perfil.imagen = response.url_img;

        localStorage.setItem('cachedProfile', JSON.stringify(this.perfil));
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('matricula');
    localStorage.removeItem('cachedProfile');
    location.reload(); // Recarga la página forzando una recarga desde el servidor (ignora la caché)
    this.router.navigate(['/login']);
  }
}
