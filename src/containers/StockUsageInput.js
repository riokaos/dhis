// multiple Orgunit selector using react-select library MIT license
import React, { Component } from 'react';
import {getAllIndicators,getAllDataElements} from '../logic/api';
import Select from 'react-select';
import '../App.css';

class StockUsageInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataElements: [],
      indicators: [],
    };
  }

    /* Fetch all indicators and dataElements from DHIS, and
       store them in the state. */
    componentDidMount(){
		//Call the fetch to get elements
        getAllDataElements().then((dataElements) => {
            this.setState({dataElements: dataElements});
		}).catch((e) => {
        	console.log('Error while loading data elements for stocks: ', e.message);
		});
	
		//call the fetch to get indicators
		getAllIndicators().then((indicators) => { 
			this.setState({indicators: indicators});
		}).catch((e) => {
			console.log('Error while loading indicators for stocks: ', e.message);
		});
    }
    
    render() {
		let dataOptions = [];
		if(this.state.dataElements.length > 0){
	    	this.state.dataElements.forEach((dataElement) => {
				dataOptions.push({value: dataElement.id,
				label: dataElement.displayName});
	    	});
		}
		if(this.state.indicators.length > 0){
	    	this.state.indicators.forEach((indicator) => {
				dataOptions.push({value: indicator.id,
				label: indicator.displayName});
	    	});
		}

		return (
	    	<div>
				<Select className='Dropdown'
		     		name="form-field-stockuse"
		      		value={this.props.stockUsage}
		      		placeholder=
		      		"Select variable for stock usage"
		      		options={dataOptions}
		      		onChange={this.props.setStockUsage} 
				/>
	    	</div>
		);
    }
}

export default StockUsageInput;