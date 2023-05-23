require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

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

//register
app.post("/api/register", async (req, res) => {
    try {
        await User.create({
            username: req.body.user,
            password: req.body.pass,
        });
        res.json({status: "created a new account"});
    } catch (err) {
        res.json({status: "duplicate username used"});
    }
});

//login
app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.user,
        password: req.body.pass,
    });

    if (user) {
        const token = jwt.sign({
            username: req.body.user,

        }, "testsecret123");

        res.json({status: "successfully logged in", user: token});
    } else {
        res.json({status: "wrong username and/or password", user: false});
    }

});