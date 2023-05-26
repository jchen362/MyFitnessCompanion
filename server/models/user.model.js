const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    name: {type: String, required: true},
    weight: {type: Number, required: false},
    targetWeight: {type: Number, required: false},
}, {collection: "user-data"})

const model = mongoose.model("UserData", User);

module.exports = model;