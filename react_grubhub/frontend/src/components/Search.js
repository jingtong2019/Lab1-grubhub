import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import './Search.css';
import {Link} from 'react-router-dom';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_search: localStorage.getItem("to_search"),
            cuisine_type: "All"
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
                    this.setState({
                        result_number: response.data[1],
                        result_list: response.data[0]
                    })

                    let cuisine_list = [];
                    for (let i=0; i<response.data[1]; i++) {
                        let cur = response.data[0][i].cuisine;
                        if (cur !== "" && !cuisine_list.includes(cur)) {
                            cuisine_list.push(cur);
                        }
                    }
                    this.setState({cuisine_list: cuisine_list});
                    this.setState({cuisine_length: cuisine_list.length});
                }
        })
    }
    
    onClick(rid, rname) {
        localStorage.setItem("rid_visit", rid);
        localStorage.setItem("rname_visit", rname);
    }


    createSelect = () => {
        let select = [];
        for (let i = 0; i < this.state.cuisine_length; i++) {
            select.push(<option value={this.state.cuisine_list[i]}>{this.state.cuisine_list[i]}</option>);
        }
        return select;
    }

    createTable = () => {
        let table = [];
        table.push(
            <tr>
                <td>Item</td>
                <td>Restaurant</td>
                <td>Cuisine</td>
            </tr>
        );
        for (let i=0; i< this.state.result_number; i++) {
            if (this.state.cuisine_type === "All" || this.state.result_list[i].cuisine === this.state.cuisine_type) {
                let children = [];
                children.push(
                    <tr>
                        <td>{this.state.result_list[i].name}</td>
                        <td><Link to="/detail" onClick={(e) => this.onClick(this.state.result_list[i].rid, this.state.result_list[i].rname)}>{this.state.result_list[i].rname}</Link></td>
                        <td>{this.state.result_list[i].cuisine}</td>
                    </tr>
                );
            
                table.push(children);
            }
            
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
                    <h1 className="h1_style">We found these dishes for you</h1>

                    <label className="h1_style">Choose cuisine type</label>
                    <select onChange={(e) => this.setState({cuisine_type: e.target.value})}>
                        <option value="All" selected>All</option>
                        {this.createSelect()}
                    </select>

                    <div className="search_result">
                        <table class="table">
                            {this.createTable()}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}



export default Search;