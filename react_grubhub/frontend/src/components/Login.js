import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
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
        let data = this.state;
        this.props.loginFunc(data);
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
                    <button name="signup"><Link to="/signup">Sign Up</Link></button>
                    
                    <form name = "login" onSubmit={this.onSubmit}>
                        <p>Sign in with your Grubhub account</p>
                        <label>You are a  </label>
                        <select onChange={e=>this.setState({usertype:e.target.value})}>
                        <option value="Customer">Customer</option>
                        <option value="Restaurant Owner">Restaurant Owner</option>
                        </select><br/>
                        <label>Email:</label><br/>
                        <input type="email" name="email" onChange={e=>this.setState({email:e.target.value})}/><br/>
                        <label>Password:</label><br/>
                        <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})}/><br/>
                        <input type="submit" value="Login" />
                        {isLoginError && <div>{"Invalid email or password!"}</div>}
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
