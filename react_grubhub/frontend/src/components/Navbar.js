import React,{Component} from 'react';
//import {Link} from 'react-router-dom';
//import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {

    render(){
        return(
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Book Store App</a>
                    </div>
                   
                </div>
            </nav>
        );
    }
}

export default Navbar;