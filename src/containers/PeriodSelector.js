import React from "react";
import DateSelector from "../components/DateSelector";

class PeriodSelector extends React.Component {
    constructor(props) {
	     super(props);

      this.updateFrom = this.updateFrom.bind(this);
	    this.updateTo = this.updateTo.bind(this);
    }

    /**
    *Sends the update of "from" values up to the menu
    *value: The new value
    *isMonth: Boolean value, true = month, false = year
    **/
    updateFrom(value, isMonth) {
	     this.props.updatePeriod(value, "from", isMonth);
    }

    /**
    *Sends the update of "to" values up to the menu
    *value: The new value
    *isMonth: Boolean value, true = month, false = year
    **/
    updateTo(value, isMonth) {
	     this.props.updatePeriod(value, "to", isMonth);
    }

    render() {
	     return (
	        <div className='PeriodFrom'>
		        <label>Select period:</label>
		        <div className = "SelectFrom">
		          <DateSelector
		            label="From:"
		            updateDate={this.updateFrom}
		            monthVal={this.props.fromMonth}
		            yearVal={this.props.fromYear}
		          />
		       </div>
		       {(this.props.mode !== "estimates")
		         ?
		         <div className = "SelectTo">
		           <DateSelector
		             label="To:"
		             updateDate={this.updateTo}
		             monthVal={this.props.toMonth}
		             yearVal={this.props.toYear}
		           />
		         </div>
           :
		         null
		       }
		     </div>
	     );
    }
}

export default PeriodSelector;
