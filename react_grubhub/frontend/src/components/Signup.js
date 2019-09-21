import React, {Component} from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    

    render() {
        return (
            <div>
                <h1>Welcommmmmmmmmm!</h1>
                <button name="signin" onClick={this.onClick1}>Sign In</button>
                <button name="buyer" onClick={this.onClick2}>You are a Customer</button>
                <button name="owner" onClick={this.onClick3}>You are a restaurant Owner</button>

            </div>
        );
    }
}

export default Signup;