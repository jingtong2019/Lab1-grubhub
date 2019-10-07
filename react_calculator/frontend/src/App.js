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
      let result = this.state.operation;
      if(result.includes('--')){
        result = result.replace('--','+')
      }
      const data = {
        operation : result
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post('http://localhost:5001/App',data)
          .then(response => {
              console.log("Status Code : ",response.status);
              console.log("type",typeof(response.data));
              if(response.status === 200){
                  this.setState({
                    operation: (response.data).toString()
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
      console.log(this.state.operation);
      console.log(typeof(this.state.operation));
      this.setState({
        operation: this.state.operation.slice(0, -1)
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
