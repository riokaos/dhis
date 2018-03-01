// multiple Orgunit selector using react-select library MIT license
import React, { Component } from 'react';
import {getAllIndicators,getAllDataElements} from '../logic/api';
import Select from 'react-select';
import '../App.css';

class StockAvailabilityInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataElements: [],
      indicators: [],
    };
  }

  /**
  *Fetch all indicators and dataElements from DHIS, and
  *store them in the state.
  **/
  componentDidMount(){
	// call the fetch to get elements
    getAllDataElements().then((dataElements) => {
      this.setState({dataElements: dataElements});
	  }).catch((e) => {
      console.log('Error while loading ', e.message);
	  });

	  //call the fetch to get elements
	  getAllIndicators().then((indicators) => {
      this.setState({indicators: indicators});
	  }).catch((e) => {
            console.log('Error while loading ', e.message);
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
	    <div className='Dropdown'>
        <Select className="StockAvailability"
		      name="form-field-availability"
		      value={this.props.stockAvailability}
		      placeholder="Select variable for stock availability"
		      options={dataOptions}
		      onChange={this.props.setStockAvailability} />
	    </div>
	);
 }
}

export default StockAvailabilityInput;
