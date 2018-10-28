import * as mqtt from 'mqtt';
interface IOtions {
    topic?: string;
    qos?: number;
    retain?: boolean;
    mqttClient?: mqtt.Client;
    brokerUrl?: string;
    mqttOpts?: mqtt.ClientOptions;
}
declare class BunyanMqtt {
    topic: string;
    qos: number;
    retain: boolean;
    mqttClient: any;
    constructor(opts: IOtions);
    write(mesg: any): any;
}
export default BunyanMqtt;
