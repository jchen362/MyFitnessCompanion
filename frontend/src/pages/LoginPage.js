import React from 'react';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import "./LoginPage.css";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "text"
        };
    }
    

    render() {


        const handlePasswordVisibility = () => {
            if (this.state.password == "password") {
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
                Let's get Jacked Together!
            </div>
            <TextField label = "Enter Username" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}}/>
            <div style = {{width: "100%", height: "20px"}}></div>
            <TextField label = "Enter Password" id="outlined-basic" variant="outlined" style = {{margin:"auto", width: "600px"}} 
                InputProps = {{
                    endAdornment: (
                    <InputAdornment position = "start" onClick = {handlePasswordVisibility}>
                        <KeyIcon/>
                    </InputAdornment>),
                }}
            type = {this.state.password}></TextField>
        </div>
    );}
}

export default LoginPage