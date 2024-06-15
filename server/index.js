require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Weight = require("./models/weight.data");
const Nutrition = require("./models/nutrition.data");
const jwt = require("jsonwebtoken");
const serverless = require("serverless-http");

//middlewares
app.use(cors());
app.use(express.json());

//connect to mongodb database
const uri = process.env.DATABASE;

const connect = async () => {
    await mongoose.connect(uri);
    console.log("connected to mongodb database successfully");  
}

connect().catch((err) => {console.error("failure to connect to mongodb database")});


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


//testing
app.get("/", async (req, res) => {
    res.send("You got here!");
})

//getName
app.post("/api/getName", async (req, res) => {
    if (!verify(req)) {
        res.json({status: "invalid token", user: false});
    }
    const decoded = jwt.decode(req.body.token);
    try {
        const user = await User.findOne({
            username: decoded.username,
        })

        if (user) {
            res.json({status: "returning name", user: req.body.token, name: user.name});
        } else {
            res.json({status: "couldn't find name", user: false, name: false});
        }
    } catch (err) {
        res.json({status: "err getting name", user: false, name: false});
    }
})

//downloadData
app.post("/api/download", async (req, res) => {
    if (!verify(req)) {
        res.json({status: "invalid token", user: false});
    }
    const decoded = jwt.decode(req.body.token);
    try {
        const user = await Weight.find({
            username: decoded.username,
        });

        if (user.length > 0) {
            res.json({status: "returning weight data", user: req.body.token, data: user});
        } else {
            res.json({status: "no data found", user: req.body.token, data: false});
        }
    } catch (err) {
        res.json({status: "server error getting weight data", user: false, data: false});
    }
});

//sendNutrition
app.post("/api/downloadNutrition", async (req, res) => {
    if (!verify(req)) {
        res.json({status: "invalid token", user: false});
    }
    const decoded = jwt.decode(req.body.token);
    try {
        const user = await Nutrition.find({
            username: decoded.username,
        });

        if (user.length > 0) {
            res.json({status: "returning nutrition data", user: req.body.token, data: user});
        } else {
            res.json({status: "no data found", user: req.body.token, data: false});
        }
    } catch (err) {
        res.json({status: "server error getting nutrition data", user: false, data: false});
    }
});

//uploadNutrition
app.post("/api/submitFood", async (req, res) => {
    if (!verify(req)) {
        res.json({status: "invalid token", user: false});
    }
    const decoded = jwt.decode(req.body.token);
    try {
        const user = await Nutrition.findOne({
            username: decoded.username,
        });
        if (user) {
            user.food.push({name: req.body.name, calories: parseInt(req.body.calories), protein: parseInt(req.body.protein), fat: parseInt(req.body.fat)});
            await user.save();
        } else {
            await Nutrition.create({
                username: decoded.username,
                food: [{name: req.body.name, calories: parseInt(req.body.calories), protein: parseInt(req.body.protein), fat: parseInt(req.body.fat)}],
            })
        }
        res.json({status: "uploaded nutrition data", user: req.body.token});
    } catch (err) {
        console.log(err);
        res.json({status: "failed to upload nutrition data", user: false});
    }
});

//uploadData
app.post("/api/upload", async (req, res) => {
    if (!verify(req)) {
        res.json({status: "invalid token", user: false});
    }
    const decoded = jwt.decode(req.body.token);
    try {
        const user = await Weight.findOne({
            username: decoded.username,
        });
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let currentDate = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`;
        let epoch = Date.now();
        if (user) {
            user.weight.push(parseInt(req.body.weight));
            user.times.push(currentDate);
            user.epochs.push(parseInt(epoch));
            await user.save();
        } else {
            await Weight.create({
                username: decoded.username,
                weight: [parseInt(req.body.weight)],
                times: [currentDate],
                epochs: [parseInt(epoch)],
                name: decoded.name,
            })
        }

        res.json({status: "uploaded weight successfully", user: req.body.token});
    } catch (err) {
        console.log(err);
        res.json({status: "server err", user: false});
    }
});

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
            name: req.body.name,
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
            expiresIn: '1000m',
        });

        res.json({status: "successfully logged in", user: token});
    } else {
        res.json({status: "wrong username and/or password", user: false});
    }

});
