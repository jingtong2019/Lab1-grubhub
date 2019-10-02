import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import './Home.css';
import axios from 'axios';


class Home_for_Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem('userid'),
            orders: [],
            show_no_delivered: true,
            show_delivered: false
        };
        // this.boxChange = this.boxChange.bind(this);
        // this.cancel_order = this.cancel_order.bind(this);
        // this.getOrders = this.getOrders.bind(this);
        // this.change_status = this.change_status.bind(this);
    }

    componentDidMount(){
        this.getOrders();
    }

    getOrders = () => {
        let data = this.state;
        if (!data.show_no_delivered && !data.show_delivered) {
            this.setState({
                orders: []
            });
        }
        else {
            axios.post('http://localhost:3001/ohome', data)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    orders: response.data
                });
            });
        }
    }

    cancel_order(id) {
        console.log("id", id);
        let data = {order_id: id};
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ohomeCancel',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                //console.log("type",typeof(response.data));
                if(response.status === 200){
                    console.log("Cancel order successfully");
                    let newstate = this.state.orders;
                    let i;
                    for (i=0; i< newstate.length; i++) {
                        if (newstate[i].order_id === id) {
                            newstate.splice(i);
                            break;
                        }
                    }
                    this.setState({
                        orders: newstate
                    })
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

    boxChange(whichone, curstatus) {
        //e.preventDefault();
        console.log(curstatus);
        if (whichone) {this.setState({show_no_delivered: curstatus}, this.getOrders);}
        else {this.setState({show_delivered: curstatus}, this.getOrders);}

    }



    render() {
        let flag = localStorage.getItem("authLogin");
        let redirectVar = null;
        if (flag !== "true") {
            console.log("!flag:", !flag);
            redirectVar = <Redirect to= "/"/>
        }

        let details = this.state.orders.map(order => {
            return(
                <tr>
                    <td>{order.order_id}</td>
                    <td>{order.items}</td>
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
            )
        })

        return(
            <div>
                {redirectVar}
                <div>
                    <h2>List of All Orders</h2>
                        <div>
                        <input type="checkbox" onChange={(e) => this.boxChange(true, e.target.checked)} defaultChecked={true}/>Orders not delivered
                        <input type="checkbox" onChange={(e) => this.boxChange(false, e.target.checked)}/>Orders delivered
                        
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>order_id</th>
                                    <th>items</th>
                                    <th>cname</th>
                                    <th>caddress</th>
                                    <th>status</th>
                                    <th>cancel order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                                
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
        
    }
}



export default Home_for_Owner;