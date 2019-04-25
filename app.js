"use strict";

/* 
    *Required Packages
    *logger = For logging error, debug, data into logs/app.log file
*/
const mongoose = require('mongoose');
const insert = require('./controllers/insertData');
const process = require('./controllers/timmer');
const db = require('./configurations/dbConfig');
const logger = require('logger').createLogger('logs/app.txt');

/* 
    *Connect with mongodb and insert data if not available
*/

mongoose.connect(db, {
    useNewUrlParser: true
}, function (err, res) {
    if (err) {
        logger.error("Error in connection: " + err);
        console.log("Error in connection: " + err);
    } else {
        logger.info("Connection Established with Mongodb");
        console.log("Connection Established with Mongodb");
        insert("clients", logger, function(response){
            if(response){
                logger.info('Data inserted for clients');
                insert('regions', logger, function(response){
                    if(response){
                        logger.info('Data inserted for regions');
                        insert('users', logger, function(response){
                            if(response){
                                logger.info('Data inserted for users');
                                process.loop(logger);
                            } else {
                                console.log('Error while insertion, Check logs!');
                            }
                        })
                    } else {
                        console.log('Error while insertion, Check logs!');
                    }
                })
            } else {
                console.log('Error while insertion, Check logs!');
            }
        });
    }
});
