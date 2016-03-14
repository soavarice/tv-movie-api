const fs = require("fs"),
  join = require("path").join,
  config = require("../config"),
  Show = require("../models/Show"),
  util = require("../util");

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
		repo: packageJSON.repository.url,
        server: config.serverName,
        status: statusJSON.status,
        totalShows: count,
        updated: lastUpdatedJSON.lastUpdated,
        uptime: process.uptime() | 0,
        version: packageJSON.version
      });
    }).catch((err) => {
      util.onError(err);
      return res.json(err);
    });
  }

};
