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
import { Login2Component } from './views/login/login.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { BusquedaComponent } from './views/busqueda/busqueda.component';

export const connection: IMqttServiceOptions = {
  //hostname: '192.168.28.111',
  //hostname: '192.168.137.137',
  hostname: 'localhost',
  port: 8083,
  path: '/mqtt',
  clean: true, 
  connectTimeout: 4000, 
  reconnectPeriod: 4000, 
  clientId: 'mqttx_597046f4',
  username: 'emqx_test',
  password: 'emqx_test',
  protocol: 'ws',
  connectOnCreate: false,
}

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
    BusquedaComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule, 
    MqttModule.forRoot(connection)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
