import * as mqtt from 'mqtt';

interface IOtions {
	topic?: string;
	qos?: number;
	retain?: boolean;

	mqttClient?: mqtt.Client;
	brokerUrl?: string;
	mqttOpts?: mqtt.ClientOptions;
}

class BunyanMqtt {

	topic: string = 'bunyan';
	qos: number = 0;
	retain: boolean = false;

	mqttClient = null;

	constructor(opts: IOtions) {
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
		let opts = {
			qos: this.qos,
			retain: this.retain
		};
		return this.mqttClient.publish(this.topic, mesg, opts);
	}
}

export default BunyanMqtt;
