import React from 'react';
import Plot from 'react-plotly.js';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            stockChartXValues: [],
            stockChartYValues: [],
        }
    }

    render() {
        return (
            <div>
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
                    layout={{title: this.state.title + '  Chart'}}
                />
            </div>
        )
    }
    componentDidUpdate(prevProps) {
        if (prevProps.stockChartYValues !== this.props.stockChartYValues) {
            this.setState( {
                stockChartXValues : this.props.stockChartXValues,
                stockChartYValues : this.props.stockChartYValues,
                title: this.props.title,
            })
        if (prevProps.title !== this.props.title) {
            this.setState( {
                stockChartXValues : this.props.stockChartXValues,
                stockChartYValues : this.props.stockChartYValues,
                title: this.props.title,
            })
        }
      }
}
}




export default Chart;
