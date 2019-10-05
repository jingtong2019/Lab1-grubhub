import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: localStorage.getItem('userid'),
            past: false
        };
    }

    componentDidMount(){
        this.getOrders();
    }


    getOrders = () => {
        let data = {
            cid: this.state.cid,
            past: this.state.past
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
        this.setState({past: false});
        this.getOrders();
    }

    past = () => {
        this.setState({past: true});
        this.getOrders();
    }

    createTable = () => {
        let table = [];
        for (let i=0; i< this.state.item_number; i++) {
            console.log("image", this.state.item_list[i]);
            let image = "data:image/jpeg;base64," + this.state.item_list[i].menu_image;
            table.push(
                <tr>
                <td><img src={image} height="100" width="100"></img></td>
                <td>{this.state.item_list[i].name}</td>
                <td>{this.state.item_list[i].price}</td>
                <td>{this.state.item_list[i].quantity}</td>
                <td><button onClick={() => this.onClick(i)}>Remove</button></td>
                </tr>
            );
        }
        return table;
      }

    render() {
        console.log("result", this.state.past);
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
                    <h2>List of All Orders</h2>

                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1} onClick={this.upcome}>Upcoming orders</ToggleButton>
                        <ToggleButton value={2} onClick={this.past}>Past orders</ToggleButton>
                        </ToggleButtonGroup>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Restaurant</th>
                                    <th>items</th>
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