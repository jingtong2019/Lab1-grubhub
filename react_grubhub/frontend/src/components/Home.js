import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {setLoginError, setLoginPending, setLoginSuccess} from '../redux_files/reducer/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        let {isLoginPending, isLoginSuccess, isLoginError} = this.props;
        console.log(isLoginPending, isLoginSuccess, isLoginError);
        
        let redirectVar = null;
        if (!isLoginSuccess) {
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