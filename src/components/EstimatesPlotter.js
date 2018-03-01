import Plotter from './Plotter';

/*
Generates a highchart plot given the following input as props:
xSeries = the x-coordinates of plotted points
ySeries = the y-coordinates of plotted points
min = the value of the min boundary
max = the value of the max boundary
orgName = Name of organization
stockName = Name of Stock
*/
export default class EstimatesPlotter extends Plotter{
    chartType = "column";
    color = '#33ccff';
    belowMinColor = 'red';
    aboveMaxColor = 'red'
    xTitle = 'Organisation';
    yTitle = 'Months of supply';
    unit = 'months';
    pointFormat = "{point.y:,.3f}";

    //Gets the series in Highcharts format
    getSeries(){
        return [{
            name: 'Availability of ' + this.props.stockName,
            data: this.createDatapoints(),
            color: this.color,

            zones: this.getZones()
        }]
    }

    //Gets the zones in Highcharts format, to help the graph highlight values outside the min/max boundary
    getZones(){
        if (isNaN(this.props.min) && isNaN(this.props.max)) {
            return [];
        }

        let zones = []
        if (!isNaN(this.props.min)) zones.push({value: this.props.min, color: this.belowMinColor})
        if (!isNaN(this.props.max)) {
            zones.push({value: this.props.max, color: this.color})
            zones.push({color: this.aboveMaxColor})
        }
        return zones;
    }

    //Gets the categories for this graph (organisation names)
    getCategories(){
        return this.props.xSeries
    }

    //Gets the title of this graph
    getTitle(){
        return 'Months availability of ' + this.props.stockName + ' for different organisations'
    }
}
