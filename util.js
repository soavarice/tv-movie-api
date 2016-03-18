const fs = require("fs"),
  join = require("path").join,
  colors = require('colors/safe'),
  config = require("./config");
  
module.exports = {

  /* Makes the temporary directory. */
  makeTemp: () => {
    if (!fs.existsSync(config.tempDir)) {
      fs.mkdirSync(config.tempDir);
    }
  },

  /* Logger function. */
  log: (logMessage) => {
	let date = new Date();
	let time = ('0' + date.getHours()).slice(1) + ':' + ('0' + date.getMinutes()).slice(1) + ':' + ('0' + date.getSeconds()).slice(1);
    if(config.logs.info.output.console == true){
      console.info(logMessage);
    }
    if(config.logs.info.output.log == true){
      fs.appendFile(join(config.tempDir, config.logs.info.file), '[' + time + '] ' + logMessage.replace(/\x1B\[\d+m/g, '') + "\n");
    }
  },
  
  /* Error logger function. */
  onError: (errorMessage) => {
	let date = new Date();
	let time = ('0' + date.getHours()).slice(1) + ':' + ('0' + date.getMinutes()).slice(1) + ':' + ('0' + date.getSeconds()).slice(1);
	if(errorMessage.toLowerCase().startsWith('error')){
      if(config.logs.error.output.console == true){
        console.error((config.colorOutput ? colors.red(errorMessage) : errorMessage));
      }
      if(config.logs.error.output.log == true){
        fs.appendFile(join(config.tempDir, config.logs.error.file), '[' + time + '] ' + errorMessage.replace(/\x1B\[\d+m/g, '') + "\n");
      }
	} else {
	  if(config.logs.warning.output.console == true){
        if(!errorMessage.toLowerCase().startsWith('error'))	{
          console.warn(config.colorOutput ? colors.yellow(errorMessage) : errorMessage);
        }
      }
      if(config.logs.warning.output.log == true){
        if(!errorMessage.toLowerCase().startsWith('error'))	{
          fs.appendFile(join(config.tempDir, config.logs.warning.file), '[' + time + '] ' + errorMessage.replace(/\x1B\[\d+m/g, '') + "\n");
        }
      }
	}
    return new Error(errorMessage);
  },

  /* Updates the 'lastUpdated' file. */
  setlastUpdate: () => {
    fs.writeFile(join(config.tempDir, config.updatedFile), JSON.stringify({
      lastUpdated: Math.floor(new Date().getTime() / 1000)
    }), (err) => {});
  },

  /* Updates the 'status' file. */
  setStatus: (status) => {
    fs.writeFile(join(config.tempDir, config.statusFile), JSON.stringify({
      "status": status
    }), (err) => {});
  },

  /* Function for resolving generators. */
  spawn: (generator) => {
    return new Promise((resolve, reject) => {
      let onResult = (lastPromiseResult) => {
        let {
          value, 
		  done
        } = generator.next(lastPromiseResult);
        if (!done) {
          value.then(onResult, reject)
        } else {
          resolve(value);
        }
      };
      onResult();
    });
  },

  /* Removes all the files in the temporary directory. */
  resetTemp: (callback, path = config.tempDir) => {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      const stats = fs.statSync(join(path, file));
      if (stats.isDirectory()) {
        resetTemp(file);
      } else if (stats.isFile()) {
        fs.unlinkSync(join(path, file));
      }
    });
	if(typeof callback === 'function'){
		setTimeout(function(){
		  callback();
		}, 10);
	}
  }

};
