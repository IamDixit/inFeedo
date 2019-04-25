"use strict"

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const region = new schema({
    continent: String,
    city: String,
    client: Array,
    created: { type: Date, default: Date.now }
}, { versionKey: false });

const regions = mongoose.model('regions', region);

module.exports = regions;   