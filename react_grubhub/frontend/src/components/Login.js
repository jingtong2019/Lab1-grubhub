import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {loginFunc} from '../redux_files/reducer/index';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
//import {LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR} from '../redux_files/reducer/index';
import {setLoginError, setLoginPending, setLoginSuccess} from '../redux_files/reducer/index';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignupClicked: false
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        console.log(email, password);
        this.props.loginFunc(email, password);
        console.log("finished?");
    }
    

    render() {

        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
        console.log(isLoginPending, isLoginSuccess, isLoginError);
        
        let redirectVar = null;
        if (isLoginSuccess) {
            redirectVar = <Redirect to= "/home"/>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <button name="signup" onClick={e=>this.setState({isSignupClicked: true})}><Link to="/signup">Sign Up</Link></button>
                    <form name = "login" onSubmit={this.onSubmit}>
                        <p>Sign in with your Grubhub account</p>
                        <label>Email:</label><br/>
                        <input type="email" name="email" onChange={e=>this.setState({email:e.target.value})}/><br/>
                        <label>Password:</label><br/>
                        <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})}/><br/>
                        <input type="submit" value="Login" />
                        {isLoginPending && <div>Please wait...</div>}
                        {isLoginSuccess && <div>Welcome back!</div>}
                        {isLoginError && <div>{"Invalid email or password!"}</div>}
                    </form>
                </div>
            </div>
        );
    }
}
    

export function loginFunc(email, password) {
    console.log("isisisiisisisi???");
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));

        const data = {email: email, password: password};
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
        loginFunc: (email, password) => dispatch(loginFunc(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
