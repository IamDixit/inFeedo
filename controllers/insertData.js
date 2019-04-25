"use strict";

const mongoose = require('mongoose');

/* 
    *Import Models
*/
const client = require('../models/client');
const region = require('../models/region');
const user = require('../models/users');

/* 
    *Json Data
*/

const clientData = require('../data/clients.json');
const regionData = require('../data/region.json');
const userData = require('../data/users.json');


/* 
    *Insert data to database if not available
    *parms CollectionName,logger,callback 
*/

function insertData(CollectionName, logger, callback) {
    mongoose.connection.db.listCollections({
        name: CollectionName
    }).next((err, result) => {
        if(err) {
            logger.error(err);
            callback(0)
        } else{
            if(result){
                console.log('Data is available for ' + CollectionName + " collection!");
                callback(1);
            } else{
                if(CollectionName === "clients"){
                    clientData.forEach(element => {
                        const newClient = new client(element);
                        newClient.save((err)=>{
                            if(err){
                                logger.error('Error while saving data for ' + CollectionName);
                            }
                        });                       
                    });
                    callback(1);
                } else if(CollectionName === "regions"){
                    regionData.forEach(element => {
                        const newRegion = new region(element);
                        newRegion.save((err)=>{
                            if(err){
                                logger.error('Error while saving data for ' + CollectionName);
                            }
                        });                       
                    });
                    callback(1);
                } else if(CollectionName === "users"){
                    userData.forEach(element => {
                        const newUser = new user(element);
                        newUser.save((err)=>{
                            if(err){
                                logger.error('Error while saving data for ' + CollectionName);
                            }
                        });                       
                    });
                    callback(1);
                } else{
                    logger.info('Invalid Collection Name ' + CollectionName);
                }
            }
        }
    })
}

module.exports = insertData;