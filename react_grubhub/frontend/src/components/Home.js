import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let flag = localStorage.getItem("authLogin");
        
        let redirectVar = null;
        if (flag !== "true") {
            console.log("!flag:", !flag);
            redirectVar = <Redirect to= "/"/>
        }
        return (
            <div>
                {redirectVar}
                <div className="home_container">
                    <br/><br/>
                    <h1 className="h1_style">Who delivers in your neighborhood?</h1>
                    <div className="search_container">
                    <form>
                    <input className="box" type="text" name="to_search" onChange={e=>this.setState({to_search:e.target.value})}/>
                    <input className="find_button" type="submit" value="Find food" />
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}



export default Home;