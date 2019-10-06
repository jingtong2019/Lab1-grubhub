import React, {Component} from 'react';
import {Redirect} from 'react-router';
import './Home.css';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


class Home_for_Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem('userid'),
            past: false
        };
    }

    componentDidMount(){
        this.getOrders();
    }

    getOrders = () => {
        let data = {
            userid: this.state.userid,
            past: this.state.past
        };
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/ohome', data)
            .then((response) => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log("result: ",response.data.result);
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

    cancel_order(id) {
        let data = {order_id: id};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ohomeCancel',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("Cancel order successfully");
                    this.getOrders();
                }
        })
    }

    change_status(id, value) {
        console.log("change status", id, value);
        let data = {order_id: id, new_status: value};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ohomeChange',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("update status successfully");

                }
        })
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

            let order = this.state.orders[i];
            table.push(
                <tr>
                    <td>{i+1}</td>
                    <td>
                        <table>
                        <tbody>
                        {this.helper(i)}
                        </tbody>
                        </table>
                    </td>
                    <td>{order.cname}</td>
                    <td>{order.caddress}</td>
                    <td>
                        <select onChange={(e) => this.change_status(order.order_id, e.target.value)}>
                        <option selected="selected">{order.status}</option>
                        {order.status !== "new" && <option value="new">new</option>}
                        {order.status !== "preparing" && <option value="preparing">preparing</option>}
                        {order.status !== "ready" && <option value="ready">ready</option>}
                        {order.status !== "delivered" && <option value="delivered">delivered</option>}
                        </select>
                    </td>
                    <td><button onClick={() => this.cancel_order(order.order_id)}>cancel</button></td>
                    
                </tr>
            );
            
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
                                    <th>No.</th>
                                    <th>items</th>
                                    <th>cname</th>
                                    <th>caddress</th>
                                    <th>status</th>
                                    <th>cancel order</th>
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



export default Home_for_Owner;