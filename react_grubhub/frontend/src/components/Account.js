import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import './Account.css';
import testimage from '../images/default_profile.jpeg';
import axios from 'axios';


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = (e) => {
        e.preventDefault();
        const data = this.state;
        console.log("image:", typeof(this.state.image), this.state.image);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/account',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("sign up successfully!");
                }
        })
    }

    render() {
        let flag = localStorage.getItem("authLogin");
        
        let redirectVar = null;
        if (flag !== "true") {
            console.log("!flag:", !flag);
            redirectVar = <Redirect to= "/"/>
        }
        console.log("testimage:", typeof(testimage), testimage);
        return (
            <div>
                {redirectVar}
                <div className="account_container">
                    <br/><br/>
                    <h4 className="h4_style">Your account</h4>
                    <div className="account_container">
                    
                    <img src={testimage} height="100" width="100"></img>

                    <form>
                    <input type="file" accept="image/*" onChange={e=>this.setState({image:e.target.value})} required/>
                    <button type="button" onClick={this.onClick}>upload</button>
                    </form>

                    <form>
                    <input className="boxes" type="text" name="fname" placeholder="First name" onChange={e=>this.setState({fname:e.target.value})} required/>
                    <input className="boxes" type="text" name="lname" placeholder="Last name" onChange={e=>this.setState({lname:e.target.value})} required/><br/>
                    <br/>
                    <input className="box_input" type="email" name="email" placeholder="Email" onChange={e=>this.setState({email:e.target.value})} required/><br/>
                    <br/>
                    <input className="box_input" type="text" name="phone" placeholder="phone number" onChange={e=>this.setState({phone:e.target.value})} required/><br/>
                    
                    <input className="save_button" type="submit" value="Save" />
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default Account;