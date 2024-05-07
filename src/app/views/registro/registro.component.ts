import { Component, OnInit } from '@angular/core';
import { ConectionService } from 'src/app/services/conection.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit{
  constructor(private conection: ConectionService, private registroService: RegistroService) {}
  especialidades: any = [];
  enfermeras: any = [];
  habitaciones: any = [];
  mensaje: string='';
  activar: boolean= false;

  registro: registro_Interface={
    nombres:"",
    apellidos: "",
    edad:0,
    sexo:"",
    padecimientos:"",
    alergias:"",
    causa_ingreso:"",
    id_habitacion:0,
    id_enfermera:"",
    id_especialidad: 0
  }

async ngOnInit() {
    await this.especialidad();
    await this.enfermera();
    await this.habitacion();
}

  async especialidad() {
    let a : any= await this.conection.especialidades().toPromise();
    this.especialidades= a;
  }
  async enfermera(){
    let a : any= await this.conection.enfermeras().toPromise();
    this.enfermeras= a;
  }
  async habitacion(){
    let a : any= await this.conection.habitaciones().toPromise();
    this.habitaciones= a;
  }

  actualizarNombre(event : Event): void{
    this.registro.nombres=(event.target as HTMLInputElement).value;
  }
  actualizarApellido(event : Event): void{
    this.registro.apellidos=(event.target as HTMLInputElement).value;
  }
  actualizarEdad(event : Event): void{
    this.registro.edad= parseInt((event.target as HTMLInputElement).value);
  }
  actualizarAlergias(event : Event): void{
    this.registro.alergias=(event.target as HTMLInputElement).value;
  }
  actualizarPadecimientos(event : Event): void{
    this.registro.padecimientos=(event.target as HTMLInputElement).value;
  }
  actualizarCausaIngreso(event : Event): void{
    this.registro.causa_ingreso=(event.target as HTMLInputElement).value;
  }
  actualizarHabitacion(event : Event): void{
    this.registro.id_habitacion= parseInt((event.target as HTMLInputElement).value);
  }
  actualizarEspecialidad(event : Event): void{
    this.registro.id_especialidad= parseInt((event.target as HTMLInputElement).value);
  }
  actualizarEnfermera(event : Event): void{
    this.registro.id_enfermera=(event.target as HTMLInputElement).value;
  }
  actualizarSexo(event : Event): void{
    this.registro.sexo=(event.target as HTMLInputElement).value;
  }
  

  async registrar(){
    if(this.registro.nombres && this.registro.apellidos && this.registro.edad && this.registro.alergias&& this.registro.padecimientos && this.registro.causa_ingreso && this.registro.id_habitacion && this.registro.id_enfermera && this.registro.id_especialidad && this.registro.sexo){
      this.activar= true;
      await this.registroService.registrarIngreso(this.registro).toPromise();
      this.mensaje= "Registro exitoso"
    }else{
      this.mensaje= "Por favor complete todos los campos"
      this.activar= true;
    }
  }
}
