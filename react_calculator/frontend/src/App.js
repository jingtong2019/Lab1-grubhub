import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AllButtons from './components/AllButtons';
import Operations from './components/Operations';

class App extends Component {
  constructor(){
    super();
    this.state = {
      operation: ""
    }
  }


  onClick = button => {
    if(button === "="){
      const data = {
        operation : this.state.operation
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post('http://localhost:3001/App',data)
          .then(response => {
              console.log("Status Code : ",response.status);
              if(response.status === 200){
                  this.setState({
                    operation: response.data
                  })
              }
      });
    }
    else if(button === "AC"){
      this.setState({
        operation: ""
      })
    }
    else if(button === "C"){
      this.setState({
        operation: this.state.operation.slice(-1, 0)
      })
    }
    else {
      this.setState({
          operation: this.state.operation + button
      })
    }
};

  render() {
    return (
      <div className="App">
        <h1> Calculator </h1>
        <Operations operation={this.state.operation}/>
        <AllButtons onClick={this.onClick}/>
      </div>
    );
  }
}

export default App;
