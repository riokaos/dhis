import React, { Component } from 'react';
var Highcharts = require('highcharts');

/*
Generates a Highchart plot given the following input as props:
xSeries = the x-coordinates of plotted points
ySeries = the y-coordinates of plotted points
min = the value of the min boundary
max = the value of the max boundary
orgName = Name of organization
stockName = Name of Stock
*/
export default class Plotter extends Component{

    //Converts the properties given in props to standard highcharts input
    createProperties(){
        var input = this.props;
        var series = this.getSeries().concat(this.getMimicSeries());
        console.log("Series: ", series)
        return {
            chart: {
                type: this.chartType
            },
            title: {
                text: this.getTitle()
            },
            series: series,
            yAxis: {title: {text: this.yTitle} ,plotLines: this.getPlotLines()},
            xAxis: {title: {text: this.xTitle}, categories: this.getCategories()},
            tooltip: {
                valueSuffix: this.unit,
                pointFormat: this.pointFormat
            }
        }
    }

    //Returns a series s so s[i] = [x[i],y[j]]
    createDatapoints() {
        return this.props.xSeries.map((e,i) => [e,this.props.ySeries[i]])
    }

    //Gets object for plotting lines representing min and max values
    getPlotLines(){
        var plotlines = []
        if (!isNaN(this.props.min)) {
            plotlines.push({
                name: "Min",
                id: "min",
                color: 'red',
                dashStyle: 'longdash',
                width: 2,
                value: this.props.min,
                label: "Min"
            })
        }

        if (!isNaN(this.props.max)){
            plotlines.push({
                name: "Max",
                id: "max",
                color: 'green',
                dashStyle: 'longdash',
                width: 2,
                value: this.props.max,
                label: "Max"
            })
        }

         return plotlines;
    }

    //Adds a series without points, but with the same style, to mimic the plotline
    //Suprisingly this is the official way of adding plotlines to the legend
    getMimicSeries(){
        let plotlines = this.getPlotLines()
        plotlines.forEach(line => line.marker = {enabled:false})
        plotlines.forEach(line => line.type = "line")
        return plotlines
    }

    //When the plot element has been made add a plot to it
    componentDidMount() {
        this.chart = new Highcharts.chart(
            "plot",
            this.createProperties()
        );
    }

    //Clean up when component unmounts
    componentWillUnmount() {
        this.chart.destroy();
    }

    render(){
        return React.createElement('div', { id: "plot",style: {height: "100%"} });
    }
}
