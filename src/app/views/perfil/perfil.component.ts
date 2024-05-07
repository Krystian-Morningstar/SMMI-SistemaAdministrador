import { Component, OnInit } from '@angular/core';
import { perfil_interface } from 'src/app/models/perfil.model';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import {SistemaService} from './../../services/sistema.service'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
     
   async ngOnInit(): Promise<void> {
     this.obtenerPerfil();
   }
   constructor(private router: Router, private perfilService: PerfilService, private servicio: SistemaService) {}

   perfil: perfil_interface={
    nombres: "",
    apellidos: "",
    matricula: "",
    telefono:""
   }

   async obtenerPerfil(){
      let matricula = localStorage.getItem('matricula');
      if (matricula !== null) {
        let a : any= await this.perfilService.perfil(matricula).toPromise();
        this.perfil.nombres = a.nombres;
        this.perfil.apellidos = a.apellidos;
        this.perfil.matricula = a.matricula;
        this.perfil.telefono = a.telefono;
      }
    }

   cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('matricula')
    localStorage.clear();
      this.router.navigate(['/login']); 
   } 
   
}
