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
export default class timeTrendPlotter extends Plotter{
    chartType = "line";
    color = '#33ccff';
    xTitle = 'Month';
    yTitle = 'Stock';
    unit = 'units';
    pointFormat = "{point.y:,.0f}";

    //Gets the series in the highcharts format.
    getSeries(){
        return [{
            name: 'Availability of ' + this.props.stockName,
            data: this.createDatapoints(),
            color: this.color,
            dashStyle: 'solid'
        }]
    }

    //Returns the all the dates between the first and last datapoint
    //We use this as a category rather than ySeries, because it shows holes in the data set better.
    getCategories(){
        if (this.props.xSeries.length === 0) return []

        let minDate = this.props.xSeries[0]
        let maxDate = this.props.xSeries[this.props.xSeries.length-1]


        let currentYear = parseInt(minDate.substring(3,7))
        let currentMonth = parseInt(minDate.substring(0,2))
        let currentDate = minDate

        let period = [minDate]
        let i = 0;
        while (currentDate !== maxDate && i < 100){
            currentMonth = (currentMonth)%12 + 1
            currentYear += (currentMonth == 1) ? 1:0
            currentDate = (currentMonth < 10 ? "0":"") + currentMonth + "-" + currentYear
            period.push(currentDate)
            i++
        }
        return period
    }

    //Get title of graph
    getTitle(){
        return 'Availability of ' + this.props.stockName + ' for ' + this.props.orgName
    }
}
