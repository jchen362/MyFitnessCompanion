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
const uri = process.env.DATABASE;

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

//verify function
function verify(req) {
    try {
        jwt.verify(req.body.token, process.env.GENERATOR);
        return true;
    } catch {
        return false;
    }
}

//verification
app.post("/api/verify", async (req, res) => {
    if (verify(req)) {
        res.json({status: "session verified", user: req.body.token});
    } else {
        res.json({status: "invalid token", user: false});
    }
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
            password: req.body.pass,

        }, process.env.GENERATOR, {
            expiresIn: '10m',
        });

        res.json({status: "successfully logged in", user: token});
    } else {
        res.json({status: "wrong username and/or password", user: false});
    }

});