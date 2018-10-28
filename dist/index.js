"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
class BunyanMqtt {
    constructor(opts) {
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
        let opts = {
            qos: this.qos,
            retain: this.retain
        };
        return this.mqttClient.publish(this.topic, mesg, opts);
    }
}
exports.default = BunyanMqtt;
