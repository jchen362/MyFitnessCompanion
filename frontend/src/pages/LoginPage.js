import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import { Link, useNavigate, navigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./LoginPage.css";

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            password: "password",
            usernameContent: "",
            passwordContent: "",
        };
    }

    async submit() {
        let user = this.state.usernameContent;
        let pass = this.state.passwordContent;
        console.log("attempting to login");
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,
                pass
            }),
        });

        const data = await response.json();

        if (data.user) {
            console.log("logged in successfully");
            this.props.navigation("homepage", {state:{
                token: data.user,
            }});
        } else {
            console.log("failed to log in");
        }
    }
    

    render() {

        /**Function to handle password visibility button */
        const handlePasswordVisibility = () => {
            if (this.state.password === "password") {
                this.setState({password: "text"});
            } else {
                this.setState({password: "password"});
            }
        }


    return(
        <motion.div style = {{width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", justifyItems: "center"}}
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
        >
            {/**Title screen and blank space */}
            <div style = {{width:"100%", height:"100px"}}></div>
            <div style = {{width: "100%", height: "50px", textAlign: "center", fontSize: "45px", fontFamily: "Roboto", color: "rgba(113, 176, 255, 0.8)"}}>
                MyFitnessCompanion
            </div>
            <div style = {{width: "100%", height: "50px"}}></div>
            <div style = {{width:"100%", height:"50px", textAlign: "center", fontSize: "30px", fontFamily: "Roboto"}}>
                Let's get Jacked Together!
            </div>
            {/**Username textfield */}
            <TextField label = "Enter Email" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}} value = {this.state.usernameContent}
                onChange = {(e) => {
                    this.setState({usernameContent: e.target.value})
                }}/>
            <div style = {{width: "100%", height: "20px"}}></div>
            {/**Password textfield */}
            <TextField label = "Enter Password" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}} 
                InputProps = {{
                    endAdornment: (
                    <InputAdornment position = "start" onClick = {handlePasswordVisibility}>
                        <KeyIcon/>
                    </InputAdornment>),
                }}
            type = {this.state.password} value = {this.state.passwordContent} onChange = {(e) => {
                this.setState({passwordContent: e.target.value})
            }}></TextField>
            {/**Button for Sign up and Log in */}
            <div style = {{width: "100%", height: "20px"}}></div>
            <div style = {{width: "100%", height: "40px", display:"flex", justifyContent: "center", flexDirection: "row"}}>
                <Button variant="contained" sx = {{width: "100px", backgroundColor: "rgba(113, 176, 255, 0.8)"}} onClick = {() => {
                    this.submit();
                }}>Log in</Button>
                <div style = {{width: "20px", height: "100%"}}></div>
                <Link to = "signup" style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>Sign up</Link>
            </div>
        </motion.div>
    );}
}

export function LoginWithRouter(props) {
    const navigation = useNavigate();
    return (<LoginPage navigation = {navigation}/>);
}

export default LoginPage