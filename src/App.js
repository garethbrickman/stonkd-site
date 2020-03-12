import React, { Component } from 'react';
import Stock from './chartApp.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //temp
    }

  }

      componentDidUpdate() {
        //temp
      }
  render() {
    return (
      <div className="App">
      <div></div>
            <div className="game">
                  <h2>{this.state.ticker} Stock chart</h2>
                    <p>charts with plotly.js</p>
                    <Stock  
                    ></Stock>
            </div>
      </div>
    );
  }
}
export default App;
