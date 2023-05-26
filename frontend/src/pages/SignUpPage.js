import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import { useInRouterContext, useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";


class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "password",
            usernameContent: "",
            passwordContent: "",
            nameContent: "",
        };
    }
    
    async submit() {
        let user = this.state.usernameContent;
        let pass = this.state.passwordContent;
        let name = this.state.nameContent;
        console.log("attempting to send sign up info");
        const response = await fetch("http://localhost:3001/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,
                pass,
                name
            }),
        });

        const data = await response.json();
        console.log(data);
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
        <div style = {{width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", justifyItems: "center"}}>
            <div style = {{width:"100%", height:"100px"}}></div>
            <div style = {{width: "100%", height: "50px", textAlign: "center", fontSize: "45px", fontFamily: "Roboto", color: "rgba(113, 176, 255, 0.8)"}}>
                MyFitnessCompanion
            </div>
            <div style = {{width: "100%", height: "50px"}}></div>
            <div style = {{width:"100%", height:"50px", textAlign: "center", fontSize: "30px", fontFamily: "Roboto"}}>
                Create Your Account Below
            </div>
            <TextField label = "Enter Email" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}} value = {this.state.usernameContent} onChange = {(e) => {
                this.setState({usernameContent: e.target.value})
            }}/>
            <div style = {{width: "100%", height: "20px"}}></div>
            <TextField label = "Enter Name" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}} value = {this.state.nameContent} onChange = {(e) => {
                this.setState({nameContent: e.target.value})
            }}/>
            <div style = {{width: "100%", height: "20px"}}></div>
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
            <div style = {{width: "100%", height: "20px"}}></div>
            <div style = {{width: "100%", height: "40px", display:"flex", justifyContent: "center", flexDirection: "row"}}>
                <Button variant="contained" sx = {{width: "100px", backgroundColor: "rgba(113, 176, 255, 0.8)"}} onClick = {() => {
                    this.submit();
                }}>Sign up</Button>
                <div style = {{width: "20px", height: "100%"}}></div>
                <Link to = "/" style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>Back to Login</Link>
            </div>
        </div>
    );}
}

export function SignUpWithRouter() {
    const navigate = useNavigate();
    return (<SignUpPage navigate = {navigate}/>);
}

export default SignUpPage