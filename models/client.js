"use strict"

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const client = new schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    created: { type: Date, default: Date.now }
}, { versionKey: false });

const clients = mongoose.model('clients', client);

module.exports = clients;   