import React from 'react';


class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "You",
            ticker: this.props.ticker,
            shares: this.props.shares,
            currentPrice: this.props.currentPrice,
            cash: this.props.cash,
            netWorth: this.props.networth,
            status: this.props.status
        }
    }

    addCommas(num) {
        if (typeof num === 'undefined') {
            return 0
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }

    componentDidMount() {
        this.setState({
            ticker: this.props.ticker,
            shares: this.props.shares,
            currentPrice: this.props.currentPrice,
            cash: this.props.cash,
            netWorth: this.props.networth
        })
    }
    setStatus() {
        if (this.state.status === "Stonks!")
        {
            return (
                <div class="image round fit" style={{width: '250px', height: "auto", display: "block",margin: "0 auto"}}>
                    <img src={require("./images/stonks.png")} alt=""/>
                </div>
            )
        } else if (this.state.status === "Not Stonks!") {
            return (
                <div class="image round fit" style={{width: '250px', height: "auto", display: "block",margin: "0 auto"}}>
                    <img src={require("./images/notstonks.jpg")} alt="" />
                </div>
            )
        } else {
            return <div></div>
        }
    }

    render() {
        return (
            <div>
                <h4>{this.state.user} have {this.state.shares} shares of {this.state.ticker}</h4>
                <h4>{this.state.status}</h4>
                {this.setStatus()}
            </div>
        )
    }
    componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            this.setState({
                ticker: this.props.ticker,
                shares: this.props.shares,
                currentPrice: this.props.currentPrice,
                cash: this.props.cash,
                netWorth: this.props.networth,
                status: this.props.status
            })
        }
        if (prevProps.shares !== this.props.shares) {
            this.setState({
                ticker: this.props.ticker,
                shares: this.props.shares,
                currentPrice: this.props.currentPrice,
                cash: this.props.cash,
                netWorth: this.props.networth,
                status: this.props.status
            })
        }
        if (prevProps.status !== this.props.status) {
            this.setState({
                ticker: this.props.ticker,
                shares: this.props.shares,
                currentPrice: this.props.currentPrice,
                cash: this.props.cash,
                netWorth: this.props.networth,
                status: this.props.status
            })
        }
    }
}

export default GameInfo;