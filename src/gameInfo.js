import React from 'react';


class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "You",
            ticker: this.props.ticker,
            shares: this.props.shares,
            netWorth: this.props
        }
    }

    componentDidMount() {
        this.setState({
            ticker: this.props.ticker,
            shares: this.props.shares,
        })
    }

    render() {
        return (
            <div>
                <h4>{this.state.user} have {this.state.shares} shares of {this.state.ticker}</h4>
            </div>
        )
    }
    componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            this.setState({
                ticker: this.props.ticker,
                shares: this.props.shares,
            })
        }
        if (prevProps.shares !== this.props.shares) {
            this.setState({
                ticker: this.props.ticker,
                shares: this.props.shares,
            })
        }
    }
}

export default GameInfo;