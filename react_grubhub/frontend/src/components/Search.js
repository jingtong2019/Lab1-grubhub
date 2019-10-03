import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_search: localStorage.getItem("to_search")
        };
    }

    componentDidMount(){
        let data = {
            to_search: this.state.to_search
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/search',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("search success");
                    this.setState({
                        result_number: response.data.length,
                        result_list: response.data
                    })
                }
        })
    }
    

    createTable = () => {
        let table = [];
        
        for (let i=0; i< this.state.result_number; i++) {
            let children = [];
            children.push(
                <tr>
                    <td>{this.state.result_list[i].name}</td>
                    <td>{this.state.result_list[i].rname}</td>
                    <td>{this.state.result_list[i].cuisine}</td>
                </tr>
            );
            
            table.push(children);
        }
        return table;
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
                    <h1 className="h1_style">Who delivers in your neighborhood?</h1>
                    <table>
                        {this.createTable()}
                    </table>
                </div>
            </div>
        );
    }
}



export default Search;