import React from 'react';
import Plot from 'react-plotly.js';


class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            ticker: "AMZN",
            marketData: 'open',
            startDate: "2013-05-01",
            endDate: "2015-02-01",
            shares: "100",
            currentPrice: 0,
            user: "Joe",
            cash: 100000, 
            startPrice: 0, 
        }
        this.handleBuyClick = this.handleBuyClick.bind(this);
        this.handleSellClick = this.handleSellClick.bind(this);
        this.handleHoldClick = this.handleHoldClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    setPlot() {
        let ticker = this.state.ticker;
        const dict = require('./data/ticker_data.json')

        if (Object.keys(dict).indexOf(ticker) > -1) {
            this.fetchCollected(dict, ticker)
        } else {
            //Not collected
            this.fetchStock();
        }
    }

    componentDidMount() {
        this.setPlot()
    }

    // console.log(stockChartYValuesFunction)
    fetchCollected(dict, ticker){
            //Collected
            // y ->  values, x -> date
            let daily_price = dict[ticker]['Daily Price']
            let date = []
            let price = []
            let startDate = this.state.startDate
            let endDate = this.state.endDate
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

    fetchStock() {
        /* Here I would read data for */

        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = "78HGZ743HVYWQ488";

        let StockSymbol = this.state.ticker;
        /* compact -> last 100 days  full -> last 20 years*/
        let OutputSize = 'full';
        let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + StockSymbol + '&outputsize=' + OutputSize + '&apikey=' + API_KEY;

        let date = []
        let price = []
        let startDate = this.state.startDate
        let endDate = this.state.endDate

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
                        ticker: StockSymbol,
                        currentPrice: cPrice
                    })
                }
            )
    }

    // Handle button clicks
    handleBuyClick() {
    console.log("#### BUY CLICKED! #####")
    this.setState((state, props) => ({
        shares: 200,
        endDate : "2018-02-01",
        startPrice: this.state.currentPrice,
        cash: this.state.cash - this.state.currentPrice * 100
        }));
    this.setPlot()
}
    handleSellClick() {
    console.log("#### SELL CLICKED! #####")
    this.setState((state, props) => ({
        shares: 0,
        endDate : "2018-02-01",
        startPrice: this.state.currentPrice,
        cash: this.state.cash + this.state.currentPrice * 100
    }));
    this.setPlot()
}
    handleHoldClick() {
    console.log("#### HOLD CLICKED! #####")
    this.setState((state, props) => ({
        shares: 100,
        endDate : "2018-02-01",
        startPrice: this.state.currentPrice
    }));
    this.setPlot()
    }
    handleResetClick() {
        console.log("#### HOLD CLICKED! #####")
        this.setState((state, props) => ({
            shares: 100,
            endDate : "2015-02-01",
        }));
        this.setPlot()
        }

    render() {
        let netWorth = parseInt(this.state.shares) * parseInt(this.state.currentPrice) + parseInt(this.state.cash)
        return (
            <div>
                <div>
                    <h2>Joe has {this.state.shares} shares in {this.state.ticker}</h2>
                    <h2>Joe's Cash: ${this.state.cash}</h2>
                    <h2>Joe's Networth: ${netWorth}</h2>
                    
                    <h4>{parseInt(this.state.shares)} * {this.state.currentPrice}</h4>
                </div>
                <p>{this.state.startDate} to {this.state.endDate}</p>
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            //type: 'scatter',
                            //mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={{width: 860, height: 720, title: this.state.ticker + '  Chart'}}
                />
                <h3>Actions!</h3>
                    <ul class="actions fit">
                      <li><button class="button alt fit" onClick={this.handleBuyClick}>Buy</button></li>
                      <li><button class="button alt fit" onClick={this.handleSellClick}>Sell</button></li>
                      <li><button class="button alt fit" onClick={this.handleHoldClick}>Hold</button></li>
                      <li><button class="button alt fit" onClick={this.handleResetClick}>Reset</button></li>
                    </ul>
            </div>
        )
    }
    componentDidUpdate(prevProps) {
      }
}




export default Stock;
