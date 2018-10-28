bunyan-mqtt
===================

A bunyan raw stream to publish to mqtt


## Installation

    $ npm install @ninu/bunyan-mqtt

## Usage
Create DB context and provide connection configuration.

```js
var bunyan = require('bunyan');
var bunyanMqtt = require('bunyan-mqtt');

var log = bunyan.createLogger({
  streams:[{
      level:'info',
      type:'raw',
      stream: bunyanMqtt({ topic:'logging', port:1883, host:'localhost' }) }
  ]
});
```
