import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';
import { Link, useNavigate, navigate, useLocation } from "react-router-dom";
import "./navbar.css";


function Navbar(props) {

    const theme = createTheme({
        typography: {
            fontFamily: "Roboto",
            fontSize: 20,
            color: "red",
        }
    });

    return (
        <Box sx = {{ flexGrow: 1}}>
            <AppBar position = "static" sx = {{bgcolor: "rgba(113, 176, 255, 0.8)"}}>
                <Toolbar>
                        <Button variant="text" sx = {{fontSize: 25, color: "white"}} onClick = {() => {
                            props.navigation("/homepage", {state: {
                                token: props.location.state.token,
                            }});
                        }}>
                            MyFitnessCompanion
                        </Button>
                        <div style = {{flexGrow: "1"}}></div>
                        <Button variant="text" sx = {{fontSize: 15, color: "white"}} onClick = {() => {
                            props.navigation("/", {state: {
                                token: props.location.state.token,
                            }});
                        }}>
                            Sign Out
                        </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar