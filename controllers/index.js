const fs = require("fs"),
  join = require("path").join,
  config = require("../config"),
  Show = require("../models/Show"),
  util = require("../util");
  
/* Displays a given file. */
const displayFile = (req, res, path, file) => {
  if (fs.existsSync(join(path, file))) {
    return res.sendFile(file, {
      root: path,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    })
  } else {
    return res.json({
      error: "Could not find file: '" + join(path, file) + "'"
    })
  }
};
  
module.exports = {

  /* Display server info. */
  getIndex: (req, res) => {
	var lastUpdatedJSON;
	try{ lastUpdatedJSON = JSON.parse(fs.readFileSync(join(config.tempDir, config.updatedFile), "utf8")); }
	catch (e) { lastUpdatedJSON = { "lastUpdated": "Unknown" } }
    var packageJSON;
	try{ packageJSON = JSON.parse(fs.readFileSync("package.json", "utf8")); }
	catch (e) { packageJSON = { "version": "Unknown" } }
    var statusJSON;
	try{ statusJSON = JSON.parse(fs.readFileSync(join(config.tempDir, config.statusFile), "utf8")); }
	catch (e) { statusJSON = { "status": "Idle" } }
	
    return Show.count({}).then((count) => {
      return res.json({
        server: config.serverName,
        status: statusJSON.status,
        totalShows: count,
        updated: lastUpdatedJSON.lastUpdated,
        uptime: process.uptime() | 0,
        version: packageJSON.version,
		repo: packageJSON.repository.url
      });
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  },
 
  /* Displays the 'tv-api-warning.log' file. */
  getInfoLog: (req, res) => {
    return displayFile(req, res, config.tempDir, config.logs.info.file);
  },
 
  /* Displays the 'tv-api-warning.log' file. */
  getWarningLog: (req, res) => {
    return displayFile(req, res, config.tempDir, config.logs.warning.file);
  },
  
  /* Displays the 'tv-api-error.log' file. */
  getErrorLog: (req, res) => {
    return displayFile(req, res, config.tempDir, config.logs.error.file);
  }

};
