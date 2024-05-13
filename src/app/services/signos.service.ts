import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignosService {
  private connection = {
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
  };

  private client: MqttService;
  private subscriptions: { [topic: string]: Subscription } = {};
  private receiveNewsSubjects: { [topic: string]: Subject<string> } = {};

  constructor(private _mqttService: MqttService) {
    this.client = this._mqttService;
    this.client.connect(this.connection as IMqttServiceOptions);
  }

  public subscribeToTopic(topic: string): Observable<string> {
    if (!this.subscriptions[topic]) {
      this.receiveNewsSubjects[topic] = new Subject<string>();
      this.subscriptions[topic] = this.client.observe(topic)
        .subscribe((message: IMqttMessage) => {
          this.receiveNewsSubjects[topic].next(message.payload.toString());
        });
    }
    return this.receiveNewsSubjects[topic].asObservable();
  }

  public unsubscribeFromTopic(topic: string): void {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].unsubscribe();
      delete this.subscriptions[topic];
      delete this.receiveNewsSubjects[topic];
    }
  }

  public disconnect(): void {
    this.client.disconnect(true);
  }
}
