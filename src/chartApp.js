import React from 'react';
import Plot from 'react-plotly.js';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            stockChartXValues: this.props.stockChartXValues,
            stockChartYValues: this.props.stockChartYValues,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stockChartYValues !== this.props.stockChartYValues) {
            console.log("UPDATE")
            this.setState({
                stockChartXValues: this.props.stockChartXValues,
                stockChartYValues: this.props.stockChartYValues,
                title: this.props.title,
            })
        }
    }
    render() {
        console.log("RERENDER CHART1")
        return (
            <div style={{width: '100%', height: '650px', marginTop: '20px'}}>
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
                    layout={
                        {title: this.state.title + ' Chart',
                        xaxis: {fixedrange: true},
                        yaxis: {fixedrange: true},
                        margin: {l: 35, r: 35},
                        legend: {
                            x:0,
                            y:1
                        }}
                    }
                    style={{width: '100%', height: '100%'}}
                    config={{responsive: true}}
                />
            </div>
        )
    }
    
}




export default Chart;
