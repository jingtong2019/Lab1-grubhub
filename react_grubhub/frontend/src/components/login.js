import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginFunc} from '../redux_files/reducer/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {email, password} = this.state;
        this.props.loginFunc(email, password);
    }

    render() {
        let {email, password} = this.state;
        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;

        return (
            <div>
                <form name = 'loginForm' onSubmit={this.onSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={e=>this.setState({email:e.target.value})}/><br/>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={e=>this.setState({password:e.target.value})}/><br/>
                    <input type="submit" value="Login" />
                    {isLoginPending && <div>Please wait...</div>}
                    {isLoginSuccess && <div>Welcome back!</div>}
                    {isLoginError && <div>{isLoginError.message}</div>}
                </form>
            </div>
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