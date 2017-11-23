import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { EditHook } from 'react-revise'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <EditHook>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </EditHook>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
