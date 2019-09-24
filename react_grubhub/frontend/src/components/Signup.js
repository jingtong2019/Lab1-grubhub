import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';

import styled from 'styled-components';


export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    color: rgba(22, 22, 22, 0.733);
`;


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    

    render() {
        return (
            <div>
                <p>Choose your account type</p>
                
                <button name="buyer"><StyledLink to="/csignup">You Are a Customer</StyledLink></button><br/><br/>
                <button name="owner"><StyledLink to="/osignup">You Are a Restaurant Owner</StyledLink></button><br/><br/>
                <button name="signin"><StyledLink to="/">Back to Sign In</StyledLink></button>

            </div>
        );
    }
}

export default Signup;