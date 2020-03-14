import React, { Component } from 'react';
import './App.css';
import InGame from './inGame.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ticker: "AMZN",
          startDate: "2013-05-01",
          _endDate: "2015-02-01",
          get endDate() {
            return this._endDate;
          },
          set endDate(value) {
            this._endDate = value;
          },
          shares: "100",
          marketData: 'close',
        }
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    handleChange(ticker) {
      this.setState((state, props) => ({
        ticker: ticker,
        startDate: "2011-05-01",
        endDate: "2015-05-01",
        shares: "100",
        marketData: 'close',
      }))
    }

    handleNextClick() {
      console.log("#### NEXT CLICKED! #####")
      this.handleChange("TSLA")
      }

    render() {
        return (
            <div>
            <InGame
              ticker = {this.state.ticker}
              startDate = {this.state.startDate}
              endDate = {this.state.endDate}
              shares = {this.state.shares}
              marketData = {this.state.marketData}
            ></InGame>
            <div>
              <ul class="actions fit">
                <li><button class="button alt fit" onClick={this.handleNextClick}>Next Game!</button></li>
              </ul>
            </div>
            </div>
        )
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.stockChartXValues !== this.props.stockChartXValues) {
    //         this.setState( {
    //             // stockChartXValues : this.props.stockChartXValues,
    //             // stockChartYValues : this.props.stockChartYValues
    //         })
    // 
    
  }
export default App;
