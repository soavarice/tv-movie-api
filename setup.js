const fs = require("fs"),
  join = require("path").join,
  bodyParser = require("body-parser"),
  compress = require("compression"),
  express = require("express"),
  logger = require("morgan"),
  responseTime = require("response-time"),
  colors = require('colors/safe'),
  config = require("./config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

RegExp.escape = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

mongoose.connect("mongodb://" + config.dbHosts.join(",") + "/tv_shows", {
  db: {
    native_parser: true
  },
  replset: {
    rs_name: "ts0",
    connectWithNoPrimary: true,
    readPreference: "nearest",
    strategy: "ping",
    socketOptions: {
      keepAlive: 1
    }
  },
  server: {
    readPreference: "nearest",
    strategy: "ping",
    socketOptions: {
      keepAlive: 1
    }
  }
});

module.exports = (config, app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(compress({
    threshold: 1400,
    level: 4,
    memLevel: 3
  }));
  app.use(responseTime());
  app.use(logger(':remote-addr :method :url - :response-time ms', {
	  stream: {
        write: function(msg){
		  msg = msg.split(' - ');
		  if(config.logs.request.output.console == true){
            console.log('API:', (config.colorOutput ? (msg[0] + ' - ' + colors.cyan(msg[1])) : (msg[0] + ' - ' + msg[1])));
          }
          if(config.logs.request.output.log == true){
            fs.appendFile(join(config.tempDir, config.logs.request.file), (msg[0] + ' - ' + msg[1]));
          }
        }
      }
  }));
};
