import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
// import Landing from './Landing';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/index" component={Landing}/> */}
                <Route path="/" component={Login}/>
                <Route path="/signup" component={Signup}/>
            </div>
        );
    }
}
//Export The Main Component
export default Main;