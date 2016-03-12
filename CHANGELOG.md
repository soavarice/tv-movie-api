1.1.1 - Fix all the things! - 13 March 2016
==================================================

Info:
 - Required Node.js version is now in the readme
   and in the `package.json`
 - Corrected date in the changelog from last update

Bug fixes:
 - Fixed meta not updating properly
 - Fixed shows with some datebased episodes not
   being added to the API
 - Fixed error log containing color codes
 - Removed old TODO messages from the code
 
Features:
 - Multiple levels of logging has three values (Defaults to 'info')
   set from the `config.js`
   - Info: Does not log any Errors or Warnings
   - Warn: Adds Warnings to the console output and logs any Warnings
     to the error log file
   - Error: Logs Warnings and Errors to the console and logs any
     occurances to the error log file

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