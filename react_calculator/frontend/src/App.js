import React, { Component } from 'react';
import './App.css';
import AllButtons from './components/AllButtons';
import Operations from './components/Operations';

class App extends Component {
  constructor(){
    super();
    this.state = {
      operation: "TEST"
    }
  }

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
