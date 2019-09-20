/// <reference types="node" />
import * as mqtt from 'mqtt';
import { EventEmitter } from 'events';
interface IOtions {
    topic?: string;
    qos?: mqtt.QoS;
    retain?: boolean;
    mqttClient?: mqtt.Client;
    brokerUrl?: string;
    mqttOpts?: mqtt.IClientOptions;
}
declare class BunyanMqtt extends EventEmitter {
    writable: boolean;
    topic: string;
    qos: mqtt.QoS;
    retain: boolean;
    mqttClient: mqtt.Client;
    constructor(opts: IOtions);
    write(mesg: any): boolean;
    end(): void;
}
export default BunyanMqtt;
