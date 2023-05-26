import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.location.state.token,
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
            p.navigation("/");
        }
        
    }

    componentDidMount() {
        this.interval = setInterval(this.verifySession, 60000, this.props);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {

        return(
            <div style = {{width: "100%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", justifyItems: "center"}}>
                {/**Navigation Bar at the Top */}
                <div></div>
            </div>
        );
    }
}

export function HomePageWithRouter() {
    const location = useLocation();
    const navigation = useNavigate();
    return(<Homepage location = {location} navigation = {navigation}/>);
}

export default Homepage