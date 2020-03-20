import React, { Component } from 'react';
import './App.css';
import InGame from './inGame.js';


let games = require("./data/stockpickergame.json")

class App extends Component {
    constructor(props) {
        let num = 1
        super(props);
        this.state = {
          key: num,
          ticker: games["game" + num]["ticker"],
          startDate: games["game" + num]["startDate"],
          endDate: games["game" + num]["endDate"],
          shares: games["game" + num]["shares"],
          marketData: games["game" + num]["marketData"],
          jump: games["game" + num]["jump"],
          endPrice: games["game" + num]["endPrice"]["close"],
          jumpPrice: games["game" + num]["jumpPrice"]["close"]
        }
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    handleChange() {
      let num = this.state.key + 1
      if (num < 16) {
      this.setState((state, props) => ({
        key: num,
        ticker: games["game" + num]["ticker"],
        startDate: games["game" + num]["startDate"],
        endDate: games["game" + num]["endDate"],
        shares: games["game" + num]["shares"],
        marketData: games["game" + num]["marketData"],
        jump: games["game" + num]["jump"],
        endPrice: games["game" + num]["endPrice"]["close"],
        jumpPrice: games["game" + num]["jumpPrice"]["close"]
      }))
    } else {
      alert("GAME OVER REFRESH TO PLAY AGAIN. HIGH SCORE FEATURE COMING SOON")
    }
    }

    handleNextClick() {
      console.log("#### NEXT CLICKED! #####")
      this.handleChange()
      }
    componentDidMount() {
      //pass
      }

    render() {
      console.log("Game Change")
      console.log(this.state.ticker)
      console.log(this.state.startDate)
      console.log(this.state.endDate)
      console.log(this.state.shares)
      console.log(this.state.marketData)
        return (
            <div>
            <InGame
              ticker = {this.state.ticker}
              startDate = {this.state.startDate}
              endDate = {this.state.endDate}
              shares = {this.state.shares}
              marketData = {this.state.marketData}
              jump = {this.state.jump}
              endPrice = {parseInt(this.state.endPrice)}
              jumpPrice = {parseInt(this.state.jumpPrice)}
              cash = {10000}
            ></InGame>
            <div>
              <ul className="actions fit">
                <li><button className="button alt fit" onClick={this.handleNextClick}>Next Chart!</button></li>
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
