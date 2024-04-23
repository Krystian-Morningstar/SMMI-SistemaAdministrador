import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { RegistroComponent } from './views/registro/registro.component';
import { AlertaComponent } from './views/alerta/alerta.component';
import { HabitacionComponent } from './views/habitacion/habitacion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Login2Component } from './views/login2/login2.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    PerfilComponent,
    RegistroComponent,
    AlertaComponent,
    HabitacionComponent,
    Login2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
