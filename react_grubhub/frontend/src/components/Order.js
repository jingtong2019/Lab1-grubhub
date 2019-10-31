import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import './Order.css';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: localStorage.getItem('userid')
        };
    }

    componentDidMount(){
        this.getOrders(false);
    }


    getOrders = (past) => {
        //console.log("===============past:", past);
        let data = {
            cid: this.state.cid,
            past: past
        };
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/order', data)
            .then((response) => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                //update the state with the response data
                this.setState({
                    orders: response.data.result,
                    number: response.data.number
                });
            }
        });

    }

    upcome = () => {
        this.getOrders(false);
    }

    past = () => {
        this.getOrders(true);
    }

    helper(i) {
        let s = this.state.orders[i].items;
        let item_list = s.split(/;/);
        //console.log("test", item_list);
        let children = [];

        for (let i=0; i < item_list.length-1; i++) {
            let item = item_list[i].split(/,/);
            //console.log("item", item);
            children.push(
                <tr>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                </tr>
            );
        }
        return children;
    }

    createTable = () => {
        let table = [];
        for (let i=0; i< this.state.number; i++) {
            if (i === 0) {
                table.push(
                    <tr>
                    <td>{this.state.orders[i].rname}</td>
                    <td>
                        <table class="table" className="innertable">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>quantity</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.helper(i)}
                        </tbody>
                        </table>
                    </td>
                    <td>{this.state.orders[i].status}</td>
                    </tr>
                );
            }
            else {
                table.push(
                    <tr>
                    <td>{this.state.orders[i].rname}</td>
                    <td>
                        <table class="table">
                        <tbody>
                        {this.helper(i)}
                        </tbody>
                        </table>
                    </td>
                    <td>{this.state.orders[i].status}</td>
                    </tr>
                );
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

        return(
            <div>
                {redirectVar}
                <div>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1} onClick={this.upcome}>Upcoming orders</ToggleButton>
                        <ToggleButton value={2} onClick={this.past}>Past orders</ToggleButton>
                        </ToggleButtonGroup>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>item</th>
                                    {/* <th>quantity</th>
                                    <th>price</th> */}
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                                
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
        
    }
}



export default Order;