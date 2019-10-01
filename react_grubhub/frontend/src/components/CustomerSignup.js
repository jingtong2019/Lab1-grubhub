import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router';
import {setLoginError, setLoginPending, setLoginSuccess, setSignupError} from '../redux_files/reducer/index';
import {connect} from 'react-redux';
import './Signup.css';

class CustomerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        this.props.csignupToHome(data);
    }

    render() {
        console.log("this.props", this.props);
        let {isLoginPending, isLoginSuccess, isLoginError, isSignupError} = this.props;
        console.log(isLoginPending, isLoginSuccess, isSignupError);
        
        let redirectVar = null;
        if (isLoginSuccess) {
            redirectVar = <Redirect to= "/home"/>
            localStorage.setItem("usertype", "customer");
        }
        return (
            <div>
                {redirectVar}
                <div className="container">
                    
                    <form name = "customersignup" onSubmit={this.onSubmit}>
                        <p className="bigtitle">Create your Grubhub customer account</p>
                        
                        <input className="boxes" type="text" name="fname" placeholder="First name" onChange={e=>this.setState({fname:e.target.value})} required/>
                        
                        <input className="boxes" type="text" name="lname" placeholder="Last name" onChange={e=>this.setState({lname:e.target.value})} required/><br/>
                        <br/>
                        <input className="box_input" type="email" name="email" placeholder="Email" onChange={e=>this.setState({email:e.target.value})} required/><br/>
                        <br/>
                        <input className="box_input" type="password" name="password" placeholder="Password" onChange={e=>this.setState({password:e.target.value})} required/><br/>
                        <input className="submit_button" type="submit" value="Sign up" />
                        {isSignupError && <div>{"This email address has been used!"}</div>}
                        <br/>
                        <button className="back" name="backToLogin"><Link to="/">Back to login</Link></button>
                    </form>
                </div>
            </div>
        );
    }
}

function csignupToHome(data) {
    console.log("isisisiisisisi???");
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        dispatch(setSignupError(false));

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/csignup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("sign up successfully!");
                    localStorage.setItem("authLogin", "true");
                    console.log("cresponse", response.data);
                    localStorage.setItem("userid", response.data);
                    dispatch(setLoginPending(false));
                    dispatch(setLoginSuccess(true));
                }
                else {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginError(true));
                    dispatch(setSignupError(true));
                }
        })
    };
}


const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError,
        isSignupError: state.isSignupError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        csignupToHome: (data) => dispatch(csignupToHome(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignup);

//export default CustomerSignup;