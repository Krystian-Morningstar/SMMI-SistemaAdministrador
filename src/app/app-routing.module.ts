import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './views/perfil/perfil.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { HabitacionComponent } from './views/habitacion/habitacion.component';
import { RegistroComponent } from './views/registro/registro.component';
import { AlertaComponent } from './views/alerta/alerta.component';

const routes: Routes = [
  {path:"perfil", component: PerfilComponent},
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'habitacion', component: HabitacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'alerta', component: AlertaComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
