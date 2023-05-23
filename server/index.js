require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(cors());
app.use(express.json());

//connect to mongodb database
const uri = "mongodb+srv://jianweimatthewchen:dylDWducxE6n2mTh@myfitnesscompanion.mtmldim.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect(uri);
    console.log("connected to mongodb database successfully");
} catch {
    console.error("failure to connect to mongodb database");
}

//run server
app.listen(3001, () => {
    console.log("Server has started on port 3001");
});

app.post("/api/register", (req, res) => {
    console.log(req);
    res.json({status: "ok"});
});