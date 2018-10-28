"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
const events_1 = require("events");
class BunyanMqtt extends events_1.EventEmitter {
    constructor(opts) {
        super();
        this.writable = true;
        this.topic = 'bunyan';
        this.qos = 0;
        this.retain = false;
        this.mqttClient = null;
        this.topic = opts.topic || 'bunyan';
        this.qos = opts.qos || 0;
        this.retain = opts.retain || false;
        if (opts.mqttClient) {
            this.mqttClient = opts.mqttClient;
        }
        else {
            this.mqttClient = mqtt.connect(opts.brokerUrl, opts.mqttOpts);
        }
    }
    write(mesg) {
        let message = null;
        if (typeof mesg == 'string') {
            message = mesg;
        }
        else {
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
exports.default = BunyanMqtt;
