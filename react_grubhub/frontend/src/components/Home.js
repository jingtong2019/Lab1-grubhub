import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {setLoginError, setLoginPending, setLoginSuccess} from '../redux_files/reducer/index';
import store from '../redux_files/store/index'
//import { Provider } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //console.log("construct this.state: ", this.state);
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.logout();
        localStorage.setItem("authLogin", "false");
    }

    render() {
        //let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
        let flag = localStorage.getItem("authLogin");
        console.log("local storage:", typeof(flag), flag);
        //console.log("this.state: ", this.state);
        console.log("state done!");
        //let {isLoginPending, isLoginSuccess, isLoginError} = store.getState();
        //console.log(isLoginPending, isLoginSuccess, isLoginError);
        
        let redirectVar = null;
        if (flag !== "true") {
            console.log("!flag:", !flag);
            redirectVar = <Redirect to= "/"/>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <button name="logout" onClick={this.onClick}><Link to="/">Log out</Link></button>
                    <h1>Home Page</h1>
                    
                </div>
            </div>
        );
    }
}


function logout() {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
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
        logout: () => dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);