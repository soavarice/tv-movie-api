1.1.1-4 - Fix all the things! - 18 March 2016
==================================================

Info:
 - Required Node.js version is now in the readme
   and in the `package.json`
 - Corrected date in the changelog from last update
 - Corrected version numbering
 - Removed dependency on `Q`
 - Replaced `slug` with `imdb` for getting seasonal 
   metadata from trakt.tv
 - Required NodeJS version was changed to 5.x+
 - Added required MongoDB version to README.md
 - Removed deprecated routes

Bug fixes:
 - Fixed meta not updating properly
 - Fixed shows with some datebased episodes not
   being added to the API
 - Fixed error log containing color codes
 - Removed old TODO messages from the code
 - Some fixes to prevent `ETIMEDOUT`
 - Fixed index not properly showing `Unknown` for
   missing values under some circumstances
 - Use `path.join()` for file paths
 - Fix `/shows/last_updated` not returning the last updated
   shows
 - Fixed new bugs introduced during 1.1.1
   - Fixed API not setting the last updated time correctly
   - Status will now be set to `Idle` after scraping is done
   - Fixed issue with MongoDB limitations to sorting
 - Made scraping EZTV faster by merging the `getShowDetails` 
   and `getAllEpisodes` functions
 
Features:
 - Logging can be configured to output to the console,  
   log files, both or to not output at all, set from 
   the `config.js`
 - Resets the log files on each scrape
 - Added `repo` to the index
 - Added `/logs/warning` to see the warning log
 - Added `/logs/error` to see the error log

1.1.0 - It's getting colorful! - 10 March 2016
==================================================

Features:
 - Get multiple shows by id at once
 - Choose to scrape KAT.cr, EZTV.ag or both from `config.js`
 - Color console output (Enable/Disable in `config.js`)

1.0.2 - It's time to split. - 9 March 2016
==================================================

Info:
 - Forked from: https://github.com/popcorn-official/popcorn-api
 
Bug fixes:
 - Retry on KAT.cr timeout
 - Updated start command in readme

1.0.1 - What's trening? - 6 March 2016
======================================

Bug fixes:
 - Sort by trending

1.0.0 - Let's kick some ass! - 1 March 2016
===========================================

Features:
 - Scraping EZTV.ag just like the old API
 - Scraping KAT.cr with 17 different providers
 - Able to add more providers for kat.cr scraping