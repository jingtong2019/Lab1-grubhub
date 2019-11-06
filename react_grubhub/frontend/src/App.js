import React from 'react';
import './App.css';
import './components/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main'
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Main/>
        </div>
    </BrowserRouter>
  );
}

export default App;
