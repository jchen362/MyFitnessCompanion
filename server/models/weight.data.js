const mongoose = require("mongoose");

const WeightData = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    weight: {type: Array, required: true},
}, {collection: "weight-data"})

const model = mongoose.model("WeightData", WeightData);

module.exports = model;