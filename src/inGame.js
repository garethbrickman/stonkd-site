import React from 'react';
import GameInfo from './gameInfo.js';
import Chart from './chartApp.js';

class InGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stockChartXValues: [],
          stockChartYValues: [],
          ticker: this.props.ticker,
          marketData: 'close',
          startDate: this.props.startDate,
          endDate: this.props.endDate,
          shares: this.props.shares,
          jump: this.props.jump
        }
    
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.handleSellClick = this.handleSellClick.bind(this);
        this.handleHoldClick = this.handleHoldClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    
      }
    
    
        // console.log(stockChartYValuesFunction)
        fetchCollected(dict, ticker, startDate, endDate){
          //Collected
          console.log("FETCHING FROM COLLECTED")
          // y ->  values, x -> date
          let daily_price = dict[ticker]['Daily Price']
          let date = []
          let price = []
          for (const key in daily_price) {
              var d1 = new Date(key)
              var d2 = new Date(startDate)
              var d3 = new Date(endDate)
              if (d1 >= d2 && d1 < d3) {
                  date.push(key)
                  price.push(daily_price[key][this.state.marketData])
              }
    
          }
          this.setState({
              stockChartXValues : date,
              stockChartYValues: price,
              ticker: ticker,
              endDate: endDate
          })
    }
    
    fetchStock(ticker, startDate, endDate) {
      /* Here I would read data for */
      console.log("FETCHING FROM API")
      const pointerToThis = this;
      console.log(pointerToThis);
      const API_KEY = "78HGZ743HVYWQ488";

      /* compact -> last 100 days  full -> last 20 years*/
      let OutputSize = 'full';
      let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&outputsize=' + OutputSize + '&apikey=' + API_KEY;
    
      let date = []
      let price = []
    
      fetch(API_Call)
        .then(
            function (response) {
                return response.json()
            }
        )
        .then(
          function (data) {
            console.log(data)
            for (var key in data['Time Series (Daily)']) {
              var d1 = new Date(key)
              var d2 = new Date(startDate)
              var d3 = new Date(endDate)
              if (d1 >= d2 && d1 < d3) {
                date.push(key)
                price.push(data['Time Series (Daily)'][key]['1. close'])
                console.log(data['Time Series (Daily)'][key]['1. close'])
              }
            }
            // console.log(stockChartYValuesFunction)
    
            pointerToThis.setState({
              stockChartXValues : date,
              stockChartYValues: price,
            })
          }
        )
      }
      setPlot(ticker, startDate, endDate) {
        const dict = require('./data/ticker_data.json')
        console.log("Fetching data for " + ticker)
    
        if (dict.hasOwnProperty(ticker)) {
            //collected
            this.fetchCollected(dict, ticker, startDate, endDate)
        } else {
            //Not collected - Make api call to alphavantage
            this.fetchStock(ticker, startDate, endDate);
        }
    }
      handleChange(shares, endDate) {
        this.setState((state, props) => ({
          ticker: this.state.ticker,
          marketData: this.state.marketData,
          startDate: this.state.startDate,
          endDate: endDate,
          shares: shares,
        }), this.setPlot(this.state.ticker, this.state.startDate, endDate))
      }
    
      // Handle button clicks
      handleBuyClick() {
        console.log("#### BUY CLICKED! #####")
        if (this.state.endDate !== this.state.jump){
        this.handleChange(200, this.props.jump)}
        }
      handleSellClick() {
      console.log("#### SELL CLICKED! #####")
      if (this.state.endDate !== this.state.jump){
      this.handleChange(0, this.props.jump)}
    }
    
      handleHoldClick() {
      console.log("#### HOLD CLICKED! #####")
      if (this.state.endDate !== this.state.jump){
          this.handleChange(100, this.props.jump)
        }
      }
    
      handleResetClick() {
          console.log("#### RESET CLICKED! #####")
          if (this.state.endDate === this.state.jump){
          this.handleChange(100, this.props.endDate)}
          }
    
      componentDidMount() {
        this.setPlot(this.props.ticker, this.props.startDate, this.props.endDate)
        }
      componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            this.setPlot(this.props.ticker, this.props.startDate, this.props.endDate)
          }
        else if (prevProps.endDate !== this.props.endDate) {
          this.setPlot(this.props.ticker, this.props.startDate, this.props.endDate)
        }
      }
    
      render() {
        return (
          <div className="App">
          <p style={{color: 'black', fontSize: '16px'}}>The information provided is for information purposes only.  It is not intended to be investment advice.  Seek a duly licensed professional for investment advice.</p>
                <div className="game">
                      <h2>{this.state.ticker} Stock chart</h2>
                        <GameInfo 
                          shares = {this.state.shares}
                          ticker = {this.state.ticker}
                          currentDate = {this.state.endDate}
                        ></GameInfo>
                        <Chart
                          title = {this.state.ticker}
                          stockChartXValues = {this.state.stockChartXValues}
                          stockChartYValues = {this.state.stockChartYValues}
                        ></Chart>
                        <p style={{color: 'black',  fontSize: '20px'}}>{this.state.startDate} to {this.state.endDate}</p>
                </div>
                <h3>Actions!</h3>
                  <ul className="actions fit">
                    <li><button className="button alt fit" onClick={this.handleBuyClick}>Buy</button></li>
                    <li><button className="button alt fit" onClick={this.handleSellClick}>Sell</button></li>
                    <li><button className="button alt fit" onClick={this.handleHoldClick}>Hold</button></li>
                    <li><button className="button alt fit" onClick={this.handleResetClick}>Reset</button></li>
                  </ul>
          </div>
        );
      }
    }
export default InGame;
