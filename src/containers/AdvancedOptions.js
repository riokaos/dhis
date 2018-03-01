import React from 'react';
import '../App.css';

import BoundaryInput from '../components/BoundaryInput';
import PeriodSelector from './PeriodSelector';
import StockAvailabilityInput from './StockAvailabilityInput';
import StockUsageInput from './StockUsageInput';

class AdvancedOptions extends React.Component{
    constructor () {
	     super();

	    this.state = {
	       show: false
	    };
    };

    //Used by the "Show/hide advanced options" buttons
    //Flips the show attribute
    onClick() {
	     this.setState({show: !this.state.show});
    }

    render () {
	     return (
	        <div>
		        {this.state.show
		        ?
		          <div className='AdvancedOptionsBox'>
		            <br/>

		              <StockAvailabilityInput className='Dropdown'
		                stockAvailability=
		                  {this.props.stockAvailability}
		                setStockAvailability=
		                   {this.props.setStockAvailability}
		              />
		              <br/>
		              {(this.props.mode === "estimates")
		              ?
		                <StockUsageInput className='Dropdown'
		                  stockUsage={this.props.stockUsage}
		                    setStockUsage={this.props.setStockUsage}
		                      />
                  :
		                null}
		              <br/>
		              <BoundaryInput
			               label={"Set min and max borders:"}
			                  mode={this.props.mode}
			                  updateBoundary=
			                     {this.props.updateUserBoundary}
			                  minValue={this.props.userMinBorder}
			                  maxValue={this.props.userMaxBorder}
			              />
		                <br/>
		                <PeriodSelector
		                  updatePeriod=
		                    {this.props.updateUserPeriod}
		                  fromMonth={this.props.fromMonth}
		                  toMonth={this.props.toMonth}
		                  fromYear={this.props.fromYear}
		                  toYear={this.props.toYear}
		                  period={this.props.userPeriod}
                      mode={this.props.mode}
		               />
		               <br/>
                   <div className='TextAdvanced'>
 		                <label>Advanced options</label>
 		                <button className="ui fluid button" onClick={() => this.onClick()}>Hide <i aria-hidden="true" class="chevron up icon"></i></button>
 		              </div>
 		              <br/>
		         </div>
            :
		    <button className="ui fluid button" onClick={() => this.onClick()}>Show advanced options <i aria-hidden="true" className="chevron down icon"></i></button>}
	    </div>
	);
    };
}

export default AdvancedOptions;
