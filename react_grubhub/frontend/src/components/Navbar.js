import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import './Navbar.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        //this.handleLogout = this.handleLogout.bind(this);
    }
    
    render(){
        let flag = localStorage.getItem("authLogin");
        console.log("navbar:", typeof(flag), flag);
        return(
            <div>
            <head>
            <meta charset="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"></link>
            </head>

            
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Grubhub</a>
                    </div>
                    {flag === "true" && <div className="topnav-right">
                    <ul class="nav navbar-nav">
                    
                    <li class="nav-item"><a href="#">Cart</a></li>
                    </ul>
                    </div>}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;