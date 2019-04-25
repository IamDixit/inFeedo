"use strict"

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    company_id: Number,
    name: String,
    phone: String,
    email: String,
    afflicated_to: String,
    created: { type: Date, default: Date.now }
}, { versionKey: false });

const users = mongoose.model('users', user);

module.exports = users;   