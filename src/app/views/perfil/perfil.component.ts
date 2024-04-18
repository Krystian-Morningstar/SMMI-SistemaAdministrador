import { Component, OnInit } from '@angular/core';
import { perfil_interface } from 'src/app/models/perfil.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

   nombre: string="Arturo";
   matricula: string="12345678"
   telefono: string= "2722828767"
   
   public Mostrar_Pantalla: boolean = false;
  
   async ngOnInit(): Promise<void> {
     this.Mostrar_Pantalla = false;
   }

   perfil: perfil_interface={
    "nombre": "",
    "matricula": "",
    "telefono":""
   }
}
