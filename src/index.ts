import * as mqtt from 'mqtt';
import { EventEmitter } from 'events';

interface IOtions {
	topic?: string;
	qos?: number;
	retain?: boolean;

	mqttClient?: mqtt.Client;
	brokerUrl?: string;
	mqttOpts?: mqtt.ClientOptions;
}

class BunyanMqtt extends EventEmitter {

	writable = true;

	topic: string = 'bunyan';
	qos: number = 0;
	retain: boolean = false;

	mqttClient: mqtt.Client = null;

	constructor(opts: IOtions) {
		super();
		this.topic = opts.topic || 'bunyan';
		this.qos = opts.qos || 0;
		this.retain = opts.retain || false;

		if (opts.mqttClient) {
			this.mqttClient = opts.mqttClient;
		} else {
			this.mqttClient = mqtt.connect(opts.brokerUrl, opts.mqttOpts);
		}
	}

	write(mesg) {
		let message: string = null;
		if (typeof mesg == 'string') {
			message = mesg;
		} else {
			message = JSON.stringify(mesg);
		}

		let opts = {
			qos: this.qos,
			retain: this.retain
		};
		this.mqttClient.publish(this.topic, message, opts);
		return true;
	}

	end() {
		this.mqttClient.end();
	}
}

export default BunyanMqtt;
