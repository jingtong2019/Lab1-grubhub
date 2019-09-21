import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CustomerSignup from './CustomerSignup';
import OwnerSignup from './OwnerSignup';
import Home from './Home';
// import Landing from './Landing';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/index" component={Landing}/> */}
                <Route exact path="/" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home" component={Home}/>
                <Route path="/csignup" component={CustomerSignup}/>
                <Route path="/osignup" component={OwnerSignup}/>
            </div>
        );
    }
}
//Export The Main Component
export default Main;