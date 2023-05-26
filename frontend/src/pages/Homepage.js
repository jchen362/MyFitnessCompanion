import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        return(
            <div>{this.props.location.state.token}</div>
        );
    }
}

export function HomePageWithRouter() {
    const location = useLocation();
    const navigation = useNavigate();
    return(<Homepage location = {location} navigation = {navigation}/>);
}

export default Homepage