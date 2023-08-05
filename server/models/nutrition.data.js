const mongoose = require("mongoose");

const NutritionData = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    food: {type: Array, required: true},
}, {collection: "nutrition-data"})

const model = mongoose.model("NutritionData", NutritionData);

module.exports = model;