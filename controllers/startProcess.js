"use strict";

/* 
 *moment-timezone = For handling times in various locations
 */

const moment = require('moment-timezone');
const regions = require('../models/region');
const user = require('../models/users');
const processMail = require('./sendMail');
const appConfig = require('../configurations/appConfig');
const logger = require('logger').createLogger('logs/app.txt');


var methods = {

    /* 
     *This function fetch data of all timezone
     */
    fetchTimezone: function () {
        regions.find()
            .then(res => {
                res.forEach(element => {
                    const tz = element.continent + "/" + element.city;
                    this.currentTime(tz, element.client);
                });
            }).catch(err => {
                logger.error('Error while fetching data from regions collections ' + err);
            });
    },

    /* 
     *This function calculates current time of each timezone
     *parms client = array
     *parms areaName = String
     */
    currentTime: function (areaName, client) {
        const time = moment(new Date()).tz(areaName);
        logger.info("Current Time: " + areaName + " " + time.format("HH:mm:ss"));
        const current = time.format("HH:mm:ss").split(":");
        const mailTiggerAt = appConfig.emailTriggerTime.split(":");
        if (current[0] === mailTiggerAt[0]) {
            logger.info("Time mached with timezone " + areaName);
            logger.info("Clients founds in this timezone: " + client);
            this.fetchUser(client);
        }
    },

    /* 
     *This function gets info of all users for given client(s)
     *parms client = array
     */
    fetchUser: function (client) {
        user.find({
            'afflicated_to': {
                $in: client
            }
        }).then(users => {
            logger.info(users);
            users.forEach(element => {
                processMail.constructMsg(element);
            });
        }).catch(err => {
            logger.error("Error while fetching user info " + err);
        });
    }
}

module.exports = methods;