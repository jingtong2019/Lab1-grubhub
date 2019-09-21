import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginFunc} from '../redux_files/reducer/index';
//import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

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
        this.props.loginFunc(email, password);
    }


    render() {
        //let {email, password} = this.state;
        // let redirectVar = null;
        // console.log(this.state.isSignupClicked);
        // if (this.state.isSignupClicked) {
        //     redirectVar = <Redirect to= "/signup"/>
        // }

        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;


        return (
            // <div>
            //     {redirectVar}
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
                        {isLoginError && <div>{isLoginError.message}</div>}
                    </form>
                </div>
            // </div>
        );
    }
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