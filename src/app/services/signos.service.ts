import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosService {
  private connection: IMqttServiceOptions = {
    //hostname: '192.168.137.137',
    hostname:'localhost',
    port: 8083,
    path: '/mqtt',
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 4000,
    clientId: 'front_administrador',
    username: 'emqx_test',
    password: 'emqx_test',
    protocol: 'ws',
  };

  private receiveNewsSubjects: { [topic: string]: BehaviorSubject<string> } = {};

  constructor(private _mqttService: MqttService) {
    this._mqttService.connect(this.connection);
  }

  public subscribeToTopic(topic: string): Observable<string> {
    if (!this.receiveNewsSubjects[topic]) {
      this.receiveNewsSubjects[topic] = new BehaviorSubject<string>('');
      this._mqttService.observe(topic).subscribe((message: IMqttMessage) => {
        this.receiveNewsSubjects[topic].next(message.payload.toString());
      });
    }
    return this.receiveNewsSubjects[topic].asObservable();
  }

  public getLastValue(topic: string): string {
    return this.receiveNewsSubjects[topic] ? this.receiveNewsSubjects[topic].getValue() : '';
  }

  public unsubscribeFromTopic(topic: string): void {
    if (this.receiveNewsSubjects[topic]) {
      this.receiveNewsSubjects[topic].complete();
      delete this.receiveNewsSubjects[topic];
    }
  }

  public disconnect(): void {
    this._mqttService.disconnect(true);
  }
}
