import React, { Component } from 'react';
import TimeTrendPlotter from '.././components/TimeTrendPlotter';
import EstimatesPlotter from '.././components/EstimatesPlotter';
import InstructionSheet from '../components/InstructionSheet'
import SaveToDashboardButton from '../components/SaveToDashboardButton'
import {storeUserData} from '../logic/api';

export default class PlotContainer extends Component{

    constructor(props){
        super(props)
        this.plot = null
        this.state = {data: null, mode: "instructions", properties: null}
        this.props.globalCalls.setPlotContainer(this);
        this.createEstimatesPlot = this.createEstimatesPlot.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    //Sets the container to display an estimates plot for the given values
    createEstimatesPlot(xseries, yseries, min, max, stockName, properties){
        let data = {xSeries: xseries, ySeries: yseries, min:min, max: max, stockName: stockName}
        this.setState({mode: ""}, () => this.setState({data: data, mode: "estimates", properties: properties}))
    }

    //Sets the continer to display a timetrend plot for the given values
    createTimeTrendPlot(xseries, yseries, min, max, stockName, orgName, properties){
        let data = {xSeries: xseries, ySeries: yseries, min:min, max: max, stockName: stockName, orgName: orgName}
        this.setState({mode: ""}, () => this.setState({data: data, mode: "timetrend", properties: properties}))
    }

    toCurrentMonth(properties){
        let today = new Date();
        let isCorrectMonth = parseInt(properties.toMonth) === today.getMonth();
        let isCorrectYear = parseInt(properties.toYear) === today.getFullYear();
        return (isCorrectMonth && isCorrectYear);
    }

    //Saves current plot to users dashboard
    onClick() {
        let properties = Object.assign({}, this.state.properties)
        properties.toCurrent = this.toCurrentMonth(properties);
        storeUserData("defaultPlot", properties)
        .then(() => alert("Plot saved to dashboard"))
        .catch(() => alert("Error when saving to dashboard"));
    }

    render(){
        if (this.state.mode === "estimates"){
            return (
              <div>
                <div className="PlotContainer">
                <EstimatesPlotter id={this.state.data.min} {...this.state.data} />
                </div>
                {(this.state.properties != null) ?
                  <SaveToDashboardButton onClick={this.onClick}/>
                  :
                  null
                }
                </div>
            )
        }

        if (this.state.mode === "timetrend"){
            return (
              <div>
                <div className="PlotContainer">
                <TimeTrendPlotter id={this.state.data.min} {...this.state.data} />
                </div>
                {(this.state.properties != null) ?
                  <SaveToDashboardButton onClick={this.onClick}/>
                  :
                  null
                }
                </div>
            )
        }

        if (this.state.mode === 'instructions'){
            return <InstructionSheet />
        }

        else{
            return (
                <div>
                </div>
            )
        }

    }
}
