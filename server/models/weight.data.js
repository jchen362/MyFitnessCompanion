const mongoose = require("mongoose");

const WeightData = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    weight: {type: Array, required: true},
    times: {type: Array, required: true},
    epochs: {type: Array, required: true},
    name: {type: String, required: false},
}, {collection: "weight-data"})

const model = mongoose.model("WeightData", WeightData);

module.exports = model;