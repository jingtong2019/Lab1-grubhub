import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {loginFunc} from './Login';

class CustomerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
          //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/csignup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("sign up successfully!");
                    loginFunc(this.state.email, this.state.password);
                }
        });
    }

    render() {
        return (
                <div>
                    <button name="backToLogin"><Link to="/">Login</Link></button>
                    <form name = "customersignup" onSubmit={this.onSubmit}>
                        <p>Create your Grubhub customer account</p>
                        <label>First name:</label><br/>
                        <input type="text" name="fname" onChange={e=>this.setState({fname:e.target.value})}/><br/>
                        <label>Last name:</label><br/>
                        <input type="text" name="lname" onChange={e=>this.setState({lname:e.target.value})}/><br/>
                        <label>Email:</label><br/>
                        <input type="email" name="email" onChange={e=>this.setState({email:e.target.value})}/><br/>
                        <label>Password:</label><br/>
                        <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})}/><br/>
                        <input type="submit" value="Sign up" />
                    </form>
                </div>
        );
    }
}

export default CustomerSignup;