import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    

    render() {
        return (
            <div>
                <h1>Choose which type of account you want to sign up:</h1>
                
                <button name="buyer"><Link to="/csignup">You Are a Customer</Link></button><br/>
                <button name="owner"><Link to="/osignup">You Are a Restaurant Owner</Link></button><br/>
                <button name="signin"><Link to="/">Back to Sign In</Link></button>

            </div>
        );
    }
}

export default Signup;