import React from 'react';


class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "Joe",
            ticker: this.props.ticker,
            shares: this.props.shares,
            currentDate: this.props.currentDate,
            netWorth: this.props
        }
    }

    componentDidMount() {
        //pass
    }

    render() {
        return (
            <div>
            <h2>{this.state.user} info:</h2>
            <h5>{this.state.shares} of {this.state.ticker}</h5>
            <h5>netWorth</h5>
            </div>
        )
    }
    componentDidUpdate(prevProps) {
        if (prevProps.currentDate !== this.props.currentDate) {
            this.setState( {
                ticker: this.props.ticker,
                shares: this.props.shares,
                currentDate: this.props.currentDate,
            })
        }
      }
}

export default GameInfo;