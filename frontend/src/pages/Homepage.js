import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "./components/navbar";
import { motion } from "framer-motion";
import { Line } from 'react-chartjs-2';
import {userData, userDataSec} from "./components/data";
import {Chart as ChartJS} from "chart.js/auto";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import 'chartjs-adapter-date-fns';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import exerciseImg from "./imgs/girl-doing-yoga.svg";

import {
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.location.state.token,
            weightData: {
                labels: userDataSec.map(row => row.x),
                datasets: [{
                    labels: "Weight Data",
                    data: userDataSec.map(row => row.y)
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Weight Tracking Chart"
                    }
                },
                scales: {
                    x: {
                        type: "time",
                    }
                },
            },
            addWeight: 0,
            name: "PlaceHolder",
            exerciseData: [],
            
        };

    }

    async verifySession(p) {
        if (p === undefined) {
            console.log("props is undefined");
            return;
        }
        let token = p.location.state.token;
        const response = await fetch("http://localhost:3001/api/verify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        });

        const data = await response.json();
        if (data.user === false) { //session expired
            console.log("session expired");
            p.navigation("/");
        }
        
    }

    async uploadData(p) {
        let token = p.location.state.token;
        let weight = this.state.addWeight;
        const response = await fetch("http://localhost:3001/api/upload", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                weight,
            }),
        });

        const data = await response.json();
        if (data.user === false) { //didn't upload
            console.log("weight failed to upload");
        } else {
            console.log("weight uploaded successfully");
            this.downloadData(p);
        }
    }


    async downloadData(p) {
        let token = p.location.state.token;
        const response = await fetch("http://localhost:3001/api/download", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        });

        const data = await response.json();
        let dataset = []
        if (data.data === false) {
            console.log("failed to get data");
            return
        }
        const parsed = data.data[0];
        for (let i = 0; i < parsed.times.length; i++) {
            dataset.push({x: parsed.epochs[i], y: parseInt(parsed.weight[i])})
        }
        this.setState({weightData: {
            datasets: [
                {
                    label: "Weight Chart",
                    data: dataset,
                }
            ]
        }});
    }

    async downloadExercises(p) {
        const response = await fetch('https://api.api-ninjas.com/v1/exercises?muscle=', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'gXjBVRIQhqEqD6hjUFUj+A==8Pe2On2DBqTw5Jep',
            },
        });

        const exerciseData = await response.json();
        this.setState({exerciseData: exerciseData});
    }

    async getName(p) {
        let token = p.location.state.token;
        const response = await fetch("http://localhost:3001/api/getName", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        });

        const data = await response.json();
        if (data.name != false) {
            this.setState({name: data.name});
        }
    }

    async componentDidMount() {
        await this.downloadData(this.props);
        await this.getName(this.props);
        await this.downloadExercises(this.props);
        //this.interval = setInterval(this.verifySession, 60000, this.props);
    }

    componentWillUnmount() {
        //TODO: call server to end session
        //clearInterval(this.interval);
    }
    render() {

        return(
            <motion.div style = {{width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", justifyItems: "center"}}
                initial = {{opacity: 0}}
                animate = {{opacity: 1}}
                exit = {{opacity: 0}}
                >
                {/**Navigation Bar at the Top */}
                <Navbar location = {this.props.location} navigation = {this.props.navigation}/>
                {/**Container for rest of things */}
                <div style = {{width: "100%", height: "740px", flexDirection: "row", display: "flex"}}>
                    {/**Left Side */}
                    <div style = {{width: "45%", height: "100%", flexDirection: "column", display: "flex", justifyItems: "center"}}>
                        <div style = {{width: "100%", height: "15px"}}></div>
                        <Paper elevation = {5} sx = {{borderRadius: "20px"}}>
                            <div style = {{wdith: "100%", height: "40%"}}>
                                <div style = {{width: "100%", height: "300px", display: "flex", justifyContent: "center"}}>
                                    <Line data = {this.state.weightData} options = {this.state.options}></Line>
                                </div>
                                <div style = {{width: "100%", height: "40px", display: "flex", flexDirection: "row", marginTop: "10px", marginLeft: "10px"}}>
                                    <TextField variant = "outlined" label = "Enter Weight" size = "small" sx = {{width: "120px", height: "15px"}} value = {this.state.addWeight} onChange = {(e)=> {
                                        this.setState({addWeight: e.target.value})
                                    }}/>
                                    <IconButton onClick = {() => {
                                        this.uploadData(this.props);
                                    }}>
                                        <AddCircleIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        </Paper>
                    </div>
                    <div style = {{width: "0.5%", height: "100%"}}></div>
                    {/**Right side */}
                    <div style = {{width: "54.5%", height: "100%"}}>
                        <div style = {{width: "100%", height: "15px"}}></div>
                        <Paper elevation = {5} sx = {{borderRadius: "20px"}}>
                            <div style = {{width: "100%", height: "40%", display: "flex", flexDirection: "column", backgroundImage: `url(${exerciseImg})`, backgroundRepeat: "no-repeat", backgroundPosition: "right 20px bottom 30px"}}>
                                <p style = {{fontWeight: "bold", paddingLeft: "10px", fontSize: "30px"}}>
                                    {"Welcome, " + this.state.name}
                                </p>
                                <p style = {{paddingLeft: "10px", fontSize: "18px"}}>
                                    Remember to track all your workouts, weight, and nutrition to see your daily progress towards your fitness goals!
                                </p>
                            </div>
                        </Paper>
                        <div style = {{width: "100%", height: "15px"}}></div>
                        <Paper elevation = {5} sx = {{borderRadius: "20px"}}>
                            <div style = {{width: "100%", height: "40%", display: "flex", flexDirection: "column"}}>
                                <p style = {{fontWeight: "bold", paddingLeft: "10px", fontSize: "30px"}}>
                                    Workout of the Day
                                </p>
                            </div>
                        </Paper>
                    </div>
                </div>
            </motion.div>
        );
    }
}

export function HomePageWithRouter() {
    const location = useLocation();
    const navigation = useNavigate();
    return(<Homepage location = {location} navigation = {navigation}/>);
}

export default Homepage