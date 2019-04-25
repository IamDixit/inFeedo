"use strict";

const mongoose = require('mongoose');
const client = require('../models/client');
const db = require('../configurations/dbConfig');



describe('Database Tests', function () {


    describe('Database Connection', function () {
        it('Connect with database', function () {
            mongoose.connect(db, {
                useNewUrlParser: true
            }, function (err, res) {
                if (err) {
                    console.log("Error while connecting with db" + err);
                } else {
                    console.log('We are connected to inFeedo database');
                    mongoose.connection.close();
                }
            });
        });
    });

    describe('Getting clients data', function () {
        it('Should get client data from db', function () {
            mongoose.connect(db, {
                useNewUrlParser: true
            }, function (err, res) {
                if (err) {
                    console.log("Error while connecting with db" + err);
                } else {
                    console.log('We are connected to inFeedo database');
                    client.find()
                        .then(res => {
                            if (res.length > 0) {
                                console.log('Data is available')
                            } else {
                                console.log('Data is not available');
                            }
                            mongoose.connection.close();
                        }).catch(err => {
                            console.log(err);
                        });

                }
            });
        });
    });
});