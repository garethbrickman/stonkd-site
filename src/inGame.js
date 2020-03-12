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
          marketData: this.props.marketData,
          startDate: this.props.startDate,
          endDate: this.props.endDate,
          shares: this.props.shares,
        }
    
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.handleSellClick = this.handleSellClick.bind(this);
        this.handleHoldClick = this.handleHoldClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    
      }
    
    
        // console.log(stockChartYValuesFunction)
        fetchCollected(dict, ticker, startDate, endDate){
          //Collected
          // y ->  values, x -> date
          let daily_price = dict[ticker]['Daily Price']
          let date = []
          let price = []
          let cPrice = 0
          for (const key in daily_price) {
              var d1 = new Date(key)
              var d2 = new Date(startDate)
              var d3 = new Date(endDate)
              if (d1 >= d2 && d1 < d3) {
                  date.push(key)
                  price.push(daily_price[key][this.state.marketData])
              }
              if (d1 >= d3) {
                  cPrice = parseInt(daily_price[key][this.state.marketData]);
                  console.log("GOT IN HERE NOW IM A BREAK  cPrice ->" + cPrice)
              }
    
          }
          this.setState({
              stockChartXValues : date,
              stockChartYValues: price,
              ticker: ticker,
              currentPrice: cPrice
          })
    }
    
    fetchStock(ticker, startDate, endDate) {
      /* Here I would read data for */
    
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
            let cPrice = ""
            for (var key in data['Time Series (Daily)']) {
              var d1 = new Date(key)
              var d2 = new Date(startDate)
              var d3 = new Date(endDate)
              if (d1 >= d2 && d1 < d3) {
                date.push(key)
                price.push(data['Time Series (Daily)'][key]['1. ' + this.state.marketData])
              }
              if (d1 >= d3) {
                cPrice = data['Time Series (Daily)'][key]['1. ' + this.state.marketData];
                console.log("GOT IN HERE NOW IM A BREAK  cPrice ->" + cPrice)
              }
            }
            // console.log(stockChartYValuesFunction)
    
            pointerToThis.setState({
              stockChartXValues : date,
              stockChartYValues: price,
              currentPrice: cPrice
            })
          }
        )
      }
      setPlot(ticker, startDate, endDate) {
        const dict = require('./data/ticker_data.json')
    
        if (Object.keys(dict).indexOf(ticker) > -1) {
            //collected
            this.fetchCollected(dict, ticker, startDate, endDate)
        } else {
            //Not collected - Make api call to alphavantage
            this.fetchStock(ticker, startDate, endDate);
        }
    }
      handleChange(shares, endDate) {
        this.setState((state, props) => ({
          shares: shares,
          endDate: endDate,
        }), this.setPlot(this.state.ticker, this.state.startDate, endDate))
      }
    
      // Handle button clicks
      handleBuyClick() {
        console.log("#### BUY CLICKED! #####")
        this.handleChange(200, "2018-02-01")
        }
      handleSellClick() {
      console.log("#### SELL CLICKED! #####")
      this.handleChange(0, "2018-02-01")
    }
    
      handleHoldClick() {
      console.log("#### HOLD CLICKED! #####")
      this.handleChange(100, "2018-02-01")
      }
    
      handleResetClick() {
          console.log("#### RESET CLICKED! #####")
          this.handleChange(100, "2015-02-01")
          }
    
      componentDidMount() {
        this.setPlot()
        }
      componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            this.setPlot(this.props.ticker, this.props.startDate, this.props.endDate)
        }
        }
    
      render() {
        return (
          <div className="App">
          <p>{this.state.startDate} to {this.state.endDate}</p>
          <div></div>
                <div className="game">
                      <h2>{this.state.ticker} Stock chart</h2>
                        <GameInfo 
                          shares = {this.state.shares}
                          ticker = {this.state.ticker}
                          currentDate = {this.state.endDate}
                        ></GameInfo>
                        <p>charts with plotly.js</p>
                        <Chart
                          title = {this.state.ticker}
                          stockChartXValues = {this.state.stockChartXValues}
                          stockChartYValues = {this.state.stockChartYValues}
                        ></Chart>
                </div>
                <h3>Actions!</h3>
                  <ul class="actions fit">
                    <li><button class="button alt fit" onClick={this.handleBuyClick}>Buy</button></li>
                    <li><button class="button alt fit" onClick={this.handleSellClick}>Sell</button></li>
                    <li><button class="button alt fit" onClick={this.handleHoldClick}>Hold</button></li>
                    <li><button class="button alt fit" onClick={this.handleResetClick}>Reset</button></li>
                  </ul>
          </div>
        );
      }
    }
export default InGame;
