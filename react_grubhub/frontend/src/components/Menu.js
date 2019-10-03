import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem('userid'),
            add_section: false,
            same_section_name: false,
            add_section_success: false
        };
    }

    openForm() {
        this.setState({add_section: true});
    }

    closeForm() {
        this.setState({add_section: false});
        this.setState({same_section_name: false});
        this.setState({add_section_success: false});
    }

    saveSection = (e) => {
        e.preventDefault();
        const data = {
            userid: this.state.userid,
            section_name: this.state.section_name
        };
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/addSection',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("add section successfully");
                    this.setState({same_section_name: false});
                    this.setState({add_section_success: true});
                }
                else if (response.status === 203) {
                    this.setState({same_section_name: true});
                    this.setState({add_section_success: false});
                }
        })
    }

    render() {
        
        let flag = localStorage.getItem("authLogin");
        console.log(flag);
        let redirectVar = null;
        if (flag !== "true") {
            redirectVar = <Redirect to= "/"/>
        }
        return (
            <div>
                {redirectVar}
                <div>
                <button type="button" onClick={() => this.openForm()}>Add section</button>

                {this.state.add_section === true && <form>
                    <input type="text" placeholder="Enter section name" onChange={e=>this.setState({section_name:e.target.value})} required/>
                    <button type="submit" onClick={this.saveSection}>Save</button>
                    <button type="button" onClick={() => this.closeForm()}>Close</button>
                    {this.state.same_section_name === true && <div>{"Section name already exist"}</div>}
                    {this.state.add_section_success === true && <div>{"Section added successfully"}</div>}
                </form>}
                </div>
            </div>
        );
    }
}


export default Menu;