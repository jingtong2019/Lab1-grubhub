import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import './Signup.css';

class OwnerSignup2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: "1",
            email: localStorage.getItem("email"),
            usertype: localStorage.getItem("usertype"),
            rname: localStorage.getItem("rname"),
            flag: false
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/osignup2',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("sign up successfully!");
                    this.setState({flag:true})
                    console.log("userid", response.data);
                    localStorage.setItem("userid", response.data.userid);
                    localStorage.setItem("fname", response.data.fname);
                }
        })
    }

    render() {

        let redirectVar = null;
        if (this.state.flag) {
            localStorage.setItem("authLogin", "true");
            redirectVar = <Redirect to= "/ohome"/>
            //localStorage.setItem("usertype", "owner");
        }
        return (
            <div>
                {redirectVar}
                <div className="container2">
                
                    <form name = "ownersignup2" onSubmit={this.onSubmit}>
                        {/* <div className="part1"> */}
                        <p className = "bigtitle">Congrats on getting started with Grubhub!</p>
                        {/* <p className="small">In just four steps, you'll be on your way to growing your business.</p> */}
                        {/* </div> */}

                        {/* <div className="part2"> */}
                        <label><b>How many locations are you signing up?</b></label><br/><br/>
                        <select className="select" onChange={e=>this.setState({locations:e.target.value})}>
                        <option value="1">1</option>
                        <option value="2-9">2-9</option>
                        </select> 
                        {this.state.locations !== "1" && <div>{"call us"}</div>}
                        <br/><br/>
                    
                        <label><b>Restaurant information</b></label><br/><br/>
                        <label className="box_label">Restaurant name</label><br/>
                        <input className="box_input" type="text" name="rname" value={localStorage.getItem("rname")} onChange={e=>this.setState({rname:e.target.value})} required/><br/>
                        <br/>
                        <label className="box_label">Restaurant address</label><br/>
                        <input className="box_input" type="text" name="address" onChange={e=>this.setState({address:e.target.value})} required/><br/>
                        <br/>
                        <label className="box_label">Restaurant phone number</label><br/>
                        <input className="boxes" type="text" name="phone" onChange={e=>this.setState({phone:e.target.value})} required/>
                        <br/>
                        
                        {/* </div> */}
                        <div className="part3">
                        <input className="save_button" type="submit" value="Save and continue" /><br/>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}


export default OwnerSignup2;