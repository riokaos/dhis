// stock unit selector using react-select library MIT license
//is this used?
import React, { Component } from 'react';
import {getAdminStocks} from '../logic/api';
import Select from 'react-select';
import '../App.css';

//Drop down menu for selecting stocks from list.
export default class StockSelector extends Component {
  constructor(props) {
		super(props);

    this.state = {
      dataElements: [],
      indicators: [],
		};

    props.globalCalls.setStockSelector(this);
    this.refresh = this.refresh.bind(this);
  }

  // Get all the stocks registered in our namespace
  refresh(){
    getAdminStocks().then((dataElements) => {
			this.setState({dataElements: dataElements});
		})
	}

// call the json api in dhis via promise to get all the comodities and stocks in the same array
  componentDidMount(){
	  this.refresh();
  }

render() {
    let dataElements = [];

    //Display data elements
    if(this.state.dataElements.length > 0){
      this.state.dataElements.forEach((dataElement) => {
        dataElements.push({value: dataElement, label: dataElement});
      });
    }

    //Display indicators
    if(this.state.indicators.length > 0){
      this.state.indicators.forEach((indicator) => {
        dataElements.push({value: indicator.id, label: indicator.displayName});
      });
    }

    return (
      <div className='Dropdown'>
        <Select
          name="form-field-stocks"
          value={this.props.value}
          placeholder="Select your Stock(s)"
          options={dataElements}
          onChange={this.props.updateStockType} />
      </div>
    );
  }
}
