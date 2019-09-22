import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router';
import {setLoginError, setLoginPending, setLoginSuccess} from '../redux_files/reducer/index';
import {connect} from 'react-redux';

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
                        {isLoginPending && <div>Please wait...</div>}
                        {isLoginSuccess && <div>Welcome back!</div>}
                        {isLoginError && <div>{"This email address has been used!"}</div>}
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

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/csignup',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("sign up successfully!");
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
        csignupToHome: (data) => dispatch(csignupToHome(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignup);

//export default CustomerSignup;