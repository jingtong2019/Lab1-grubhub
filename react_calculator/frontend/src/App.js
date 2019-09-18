import React, { Component } from 'react';
import './App.css';
import AllButtons from './components/AllButtons';

class App extends Component {
  constructor(){
    super();
    this.state = {
      operation: ""
    }
  }

  render() {
    return (
      <div className="App">
        <h1> Calculator </h1>
        <AllButtons onClick={this.onClick}/>
      </div>
    );
  }
}

export default App;
