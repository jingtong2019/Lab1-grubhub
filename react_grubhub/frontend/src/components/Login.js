import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {setLoginError, setLoginPending, setLoginSuccess} from '../redux_files/reducer/index';
import axios from 'axios';
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignupClicked: false
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = this.state;
        this.props.loginFunc(data);
        console.log("finished?");
    }
    

    render() {

        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
        console.log(isLoginPending, isLoginSuccess, isLoginError);
        localStorage.setItem("authLogin", isLoginSuccess);
        
        let redirectVar = null;
        if (isLoginSuccess) {
            redirectVar = <Redirect to= "/home"/>
        }
        return (
            <div>
                {redirectVar}
                <div>
                
                    <form name = "login" onSubmit={this.onSubmit}>
                        <p>Sign in with your Grubhub account</p>
                        <label for="select"><b>You are a  </b></label>
                        <select name="select" onChange={e=>this.setState({usertype:e.target.value})}>
                        <option value="Customer">Customer</option>
                        <option value="Restaurant Owner">Restaurant Owner</option>
                        </select>
                        <div class="container">
                            <label for="email"><b>Email</b></label><br/>
                            <input type="email" name="email" onChange={e=>this.setState({email:e.target.value})} required/><br/>
                            <label for="password"><b>Password</b></label><br/>
                            <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})} required/><br/>
                            <input type="submit" value="Sign in" />
                        </div>
                        {isLoginError && <div className="err">{"Invalid email or password!"}</div>}
                        
                        <div class="container">
                        <button name="signup" className="create"><Link to="/signup">Create your account</Link></button>
                        </div>
                    </form>
                    
                </div>
            </div>
        );
    }
}
    

function loginFunc(data) {
    console.log("isisisiisisisi???");
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));

        console.log("data", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if (response.status === 200) {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginSuccess(true));
                } 
                else {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginError(true));
                }
            })
        };
}



const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        isLoginError: state.isLoginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginFunc: (data) => dispatch(loginFunc(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
