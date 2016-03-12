const fs = require("fs"),
  colors = require('colors/safe'),
  config = require("./config");

module.exports = {

  /* Error logger function. */
  onError: (errorMessage) => {
	if(config.logLevel.toLowerCase() != 'info') fs.appendFile(config.tempDir + "/" + config.errorLog, errorMessage.replace(/\x1B\[\d+m/g, '') + "\n");
	if(config.logLevel.toLowerCase() == 'warn') console.warn(config.colorOutput ? colors.yellow(errorMessage) : errorMessage);
	if(config.logLevel.toLowerCase() == 'error') console.error((config.colorOutput ? (errorMessage.toLowerCase().startsWith('error') ? colors.red(errorMessage) : colors.yellow(errorMessage)) : errorMessage));
    return new Error(errorMessage);
  },

  /* Updates the 'lastUpdated' file. */
  setlastUpdate: () => {
    fs.writeFile(config.tempDir + "/" + config.updatedFile, JSON.stringify({
      lastUpdated: Math.floor(new Date().getTime() / 1000)
    }), (err) => {});
  },

  /* Updates the 'status' file. */
  setStatus: (status) => {
    fs.writeFile(config.tempDir + "/" + config.statusFile, JSON.stringify({
      "status": status
    }), (err) => {});
  },

  /* Function for resolving generators. */
  spawn: (generator) => {
    return new Promise((resolve, reject) => {
      let onResult = (lastPromiseResult) => {
        let {
          value, done
        } = generator.next(lastPromiseResult);
        if (!done) {
          value.then(onResult, reject)
        } else {
          resolve(value);
        }
      };
      onResult();
    });
  }

};
