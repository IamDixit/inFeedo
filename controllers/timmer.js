"use strict";

const start = require('./startProcess');
const appConfig = require('../configurations/appConfig');

const methods = {
    /* 
     *This function repeats after every hours(which is configure in config file)
    */
    loop: function(logger){
        // time = 1 hour in ms
        const time = 1000 * 60 * 60 * appConfig.jobTime;
        console.log("Email will be trigger for time(24hrs): " + appConfig.emailTriggerTime);
        start.fetchTimezone();
        setInterval(function(){
            logger.info("Started Process");
            logger.info("Email will be trigger for time(24hrs): " + appConfig.emailTriggerTime);
            start.fetchTimezone();
        }, time);
    }
}

module.exports = methods;