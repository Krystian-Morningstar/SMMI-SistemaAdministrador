import { Component, OnInit } from '@angular/core';
import { ConectionService } from 'src/app/services/conection.service';
import { registro_Interface } from 'src/app/models/registro.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit{
  constructor(private conection: ConectionService) {}
  especialidades: any = [];
  mensaje: string='';
  activar: boolean= false;

  registro: registro_Interface={
    nombre:"",
    edad:"",
    sexo:"",
    padecimientos:"",
    alergias:"",
    causaIngreso:"",
    habitacion:"",
    enfermera:"",
    especialidad: ""
  }

async ngOnInit() {
    await this.especialidad();
}

  async especialidad() {
    let a : any= await this.conection.especialidades().toPromise();
    this.especialidades= a;
  }

  actualizarNombre(event : Event): void{
    this.registro.nombre=(event.target as HTMLInputElement).value;
  }
  actualizarEdad(event : Event): void{
    this.registro.edad=(event.target as HTMLInputElement).value;
  }
  actualizarAlergias(event : Event): void{
    this.registro.alergias=(event.target as HTMLInputElement).value;
  }
  actualizarPadecimientos(event : Event): void{
    this.registro.padecimientos=(event.target as HTMLInputElement).value;
  }
  actualizarCausaIngreso(event : Event): void{
    this.registro.causaIngreso=(event.target as HTMLInputElement).value;
  }
  

  registrar(){
    if(this.registro.nombre&& this.registro.edad && this.registro.alergias&& this.registro.padecimientos && this.registro.causaIngreso){
      this.activar= false;

    }else{
      this.mensaje= "Por favor complete todos los campos"
      this.activar= true;
    }
  }
}
