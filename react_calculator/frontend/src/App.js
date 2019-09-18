import React, { Component } from 'react';
import './App.css';
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
        //this.calculate()
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
