import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import {Redirect} from 'react-router';

class Landing extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         flag : 0
    //     }
    // }

    render(){
        
        return(
            <div>
                <h1>Welcome!</h1>
                <button name="signinbutton"><Link to="/login">Sign In</Link></button><br/>
                <button name="signupbutton"><Link to="/signup">Sign Up</Link></button>
            </div>
            
        );
    }
}

export default Landing;