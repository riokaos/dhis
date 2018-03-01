
import React, {Component} from 'react';
import {store, deleteItem,getAuthoroties} from '../logic/api'
import BoundaryInput from '../components/BoundaryInput'
import PeriodSelector from '../containers/PeriodSelector'
import AdminButton from '../components/AdminButton'
import AdminInputName from '../components/AdminInputName';
import StockAvailabilityInput from './StockAvailabilityInput';
import StockUsageInput from './StockUsageInput';
import DeleteButton from '../components/DeleteButton';
import '../App.css';


/*
Connects with the API and checks if the user have admin authorities.
If yes displays AdminComponent inheriting props from this
If no displays an empty div
*/
export default class AdminPanel extends Component{
	//Using proxy indicator recommended in Piazza to represent admin rights.
	adminAuthorities = ["F_INDICATOR_PUBLIC_ADD"];

	constructor(){
		super()
		this.state = {child: null}

		this.showAdminContainer = this.showAdminContainer.bind(this)
	}

	componentDidMount() {
		this.checkAuthoroties().then(this.showAdminContainer)
	}

	//Checks if the user has admin authorities
	checkAuthoroties() {
		return getAuthoroties()
		.then((userAuthorities) => this.adminAuthorities.every((authority) => userAuthorities.indexOf(authority) >= 0) ? Promise.resolve():Promise.reject() )
	}

//Shows the component containing the admin options
  showAdminContainer() {
		//Get the props to send to the adminContainer
		var containerProps = Object.assign({}, this.props)
		containerProps.id = "AdminContainer"
		//Create the adminContainer
		var boundary = React.createElement(AdminContainer, containerProps)
	  this.setState({child:boundary})
	}

  render() {
		return (
			<div id="AdminBoundaryContainer">
				{this.state.child}
			</div>
		);
	}
}

//Component controlling the layout of the AdminPanel if displayed
class AdminContainer extends Component{
    constructor() {
		super();

		this.state = {
	    name: "",
	    availableID: null,
	    usageID: null,
	    availableName: null,
	    usageName: null,
	    min_estimates: "",
	    max_estimates: "",
	    min_timetrend: "",
	    max_timetrend: "",
	    fromMonth: "01",
	    toMonth: "12",
	    fromYear: new Date().getFullYear(),
	    toYear: new Date().getFullYear()
		};

	this.updateAdminBoundary = this.updateAdminBoundary.bind(this);
	this.updateAdminPeriod = this.updateAdminPeriod.bind(this);
	this.updatePresetName = this.updatePresetName.bind(this);
	this.setStockAvailability = this.setStockAvailability.bind(this);
	this.setStockUsage = this.setStockUsage.bind(this);
	this.deletePreset = this.deletePreset.bind(this);
	this.tryItOut = this.tryItOut.bind(this);
  }

	/**
	*Updates the name of the query preset
	*value: A string
	**/
  updatePresetName(value) {
		this.setState({name : value});
  }

	/**
	*Updates the value of availableID and availableName
	*value: An object containing new values for availableID and availableName
	**/
  setStockAvailability(value) {
		if(value != null) {
	    this.setState({availableID: value.value,availableName: value.label});
		}else {
	    this.setState({availableID: null,availableName: null});
		}
  }

	/**
	*Update the value of usageID and usageName
	*value: An object conating new values for usageID and usageName
	**/
  setStockUsage(value) {
		console.log("Selected stock usage: ", value);

		if(value != null) {
	    this.setState({usageID: value.value,usageName: value.label});
		}else {
	    this.setState({usageID: null,usageName: null});
		}
  }

	/**
	*Updates the values of min_estimates, min_timetrend, max_estimates and
	*max_timetrend
	*value: The new value
	*boundaryType: "min" or "max"
	*mode: "estimates" or "timetrend"
	**/
  updateAdminBoundary(value, boundaryType, mode) {
		if (mode === "estimates") {
	    if (boundaryType === "min") {
				this.setState({
		    	min_estimates: value
				});
	    }else if (boundaryType === "max") {
				this.setState({
		    	max_estimates: value
				});
	    }
		}else if (mode === "timetrend") {
	    if (boundaryType === "min") {
				this.setState({
		    	min_timetrend: value
				});
	    } else if (boundaryType === "max") {
				this.setState({
		    	max_timetrend: value
				});
	    }
		}
  } // end updateAdminBoundary

  /**
  * value: The value of either a month or a year.
	* periodType: "to" or "from"
 	* isMonth: boolean
  */
  updateAdminPeriod(value, periodType, isMonth) {
		if (periodType === "from") {
	    if (isMonth) {
				console.log("Update admin fromMonth: " + value);
				this.setState({
		    	fromMonth: value
				});
	    } else {
				console.log("Update admin fromYear: " + value);
				this.setState({
		    	fromYear: value
				});
	    }
		}else if (periodType === "to") {
	    if (isMonth) {
				console.log("Update admin toMonth: " + value);
				this.setState({
		    	toMonth: value
				});
	    } else {
				console.log("Update admin toYear: " + value);
				this.setState({
		    	toYear: value
				});
	    }
		}
	}

	/**Checks that all the required values are filled in
	**/
  adminValidate() {
		const name = this.state.name,
	      	min_estimates = this.state.min_estimates,
	      	max_estimates = this.state.max_estimates,
	      	min_timetrend = this.state.min_timetrend,
	      	max_timetrend = this.state.max_timetrend,
	      	fromMonth = this.state.fromMonth,
	      	fromYear = this.state.fromYear,
	      	toMonth = this.state.toMonth,
	      	toYear = this.state.toYear,
	      	usageID = this.state.usageID,
	      	availableID = this.state.availableID;

		//Is there a name
		if(name.length === 0) {
	   	return falseObj("A name is required");
		}

		//Has a stockAvailability been selected
		if(availableID == null) {
	    return falseObj("You must select a variable for stock availability");
		}

		//Has a usageID been selected
		if(usageID == null) {
	    return falseObj("You must select a variable for stock usage");
		}

		/*If user has specified minimum and/or maximum borders,
	   check that they are numbers and that 0<=min<=max. */
		 let retObj = validateMinMax(min_estimates, max_estimates);
		 if (!retObj.valid) {
	    	return retObj;
			}

			retObj = validateMinMax(min_timetrend, max_timetrend);
			if (!retObj.valid) {
	    	return retObj;
			}

			/*If user has specified a period (partially or wholly),
	   check that from <= to. */
		if (fromYear > toYear) {
	    const msg = "The value of fromYear must be less or equal to toYear.";
	    return falseObj(msg);
		}else if (fromYear === toYear && fromMonth > toMonth) {
	    const msg = "The date (FromMonth, FromYear) must " +
									"occur before (or at the same time as) the date " +
									"(ToMonth, ToYear).";
	    return falseObj(msg);
		}

		/* Check that the dates specified have occurred. */
		const currYear = new Date().getFullYear(),
	      currMonth = new Date().getMonth();

		const test1 = fromYear > currYear,
	      	test2 = toYear > currYear,
	      	test3 = (fromYear === currYear &&
		       				fromMonth > currMonth),
	      	test4 = (toYear === currYear &&
		       				toMonth > currMonth);

		if (test1 || test2 || test3 || test4) {
	    const msg = "One or more of the dates have not " +
		  						"occurred yet. Please choose a date from the " +
		  						"past.";
	    return falseObj(msg);
		}

		return trueObj();

		// Create the return object representing a valid state.
		function falseObj(msg) {
	    return {
				valid: false,
				errMsg: msg
	    };
		}

		// Create the return object representing an invalid state.≈ß
		function trueObj() {
	    return {
				valid: true,
				errMsg: null
	    };
		}

		/**
	 	* Check that min and max are numbers, and that min < max.
	 	*/
		function validateMinMax(minStr, maxStr) {
	    const minNr = parseInt(minStr, 10),
		  maxNr = parseInt(maxStr, 10);

	    if (minStr && isNaN(minNr)) {
				return falseObj("Min is not a number.");
	    }
			if (maxStr && isNaN(maxNr)) {
				return falseObj("Max is not a number.");
	    }
			if (minStr && maxStr) {
				if (!(0 <= minNr)) {
		    	return falseObj("Min must be at least 0.");
				}else if (!(minNr <= maxNr)) {
		    	return falseObj("Min must be less or equal " +
				    							"to Max.");
				}
	    }

		  return trueObj();
		}
  } // end validate

	/**
	*Deletes the preset with the name given in state.name
	**/
	deletePreset() {
		if (this.state.name.length <= 0) {
	    alert("Specify a name");
		}else {
	    deleteItem(this.state.name)
			.then(() => {
		    this.props.globalCalls.refreshStocks();})
			.then(() => {
		    const msg = "Stock " + this.state.name +
			  						" has been deleted successfully.";
		    alert(msg);
			}).catch(() => alert(this.state.name + " does not exist"));
		}
  }

	/**
	*Saves the current choices as a preset query
	**/
  onClick() {
		console.log("Current state of adminContainer:\n" +
		   					"name: " + this.state.name + "\n" +
		   					"avaialbleID: " + this.state.availableID + "\n" +
		   					"usageID: " + this.state.usageID + "\n" +
		   					"min" + this.state.min + "\n" +
		   					"max: " + this.state.max + "\n" +
		   					"fromMonth: " + this.state.fromMonth + "\n" +
		   					"fromYear: " + this.state.fromYear + "\n" +
		   					"toMonth: " + this.state.toMonth + "\n" +
		   					"toYear: " + this.state.toYear + "\n");

		//Check that the dat is valid
		let validationObject = this.adminValidate();
		if (!validationObject.valid) {
	    alert(validationObject.errMsg);
		}else {
			//Save preset to data repository
	    store(this.state.name, this.state)
			.then(() => this.props.globalCalls.refreshStocks())
			.then(() => {
		    	const msg = "Stock " + this.state.name +
			  							" has been submitted successfully.";
		    	alert(msg);
			});
	  }
  }

    tryItOut() {
 	const input = {
 	    availableID: this.state.availableID,
 	    usageID: this.state.usageID,
 	    availableName: this.state.availableName,
 	    usageName: this.state.usageName,
 	    min_estimates: this.state.min_estimates,
 	    max_estimates: this.state.max_estimates,
 	    min_timetrend: this.state.min_timetrend,
 	    max_timetrend: this.state.max_timetrend,
 	    fromMonth: this.state.fromMonth,
 	    toMonth: this.state.toMonth,
 	    fromYear: this.state.fromYear,
 	    toYear: this.state.toYear
 	};

 	this.props.globalCalls.autofillInput(input);
    } // end tryItOut

    render(){
	return (
	    <div className='AdminContainer'>
	      <h3>ADMIN OPTIONS:</h3>
	      <br/>
	      <AdminInputName
	    	value={this.state.name}
	    	updatePresetName={this.updatePresetName}/>
	      <br/><br/>
	      <StockAvailabilityInput
	    	stockAvailability={this.state.availableID}
	    	setStockAvailability={this.setStockAvailability}/>
	    	<br/>
		<StockUsageInput
	    	  stockUsage={this.state.usageID}
	    	  setStockUsage={this.setStockUsage}/>
		<br/>
		<BoundaryInput
		  label={"Set min and max borders in plot of " +
		  "estimates:"}
		  mode={"estimates"}
		  minValue={this.state.min_estimates}
		  maxValue={this.state.max_estimates}
		  updateBoundary={this.updateAdminBoundary}/>
		<BoundaryInput
		  label={"Set min and max borders in plot of " +
		  "timetrend:"}
		  mode={"timetrend"}
		  minValue={this.state.min_timetrend}
		  maxValue={this.state.max_timetrend}
		  updateBoundary={this.updateAdminBoundary}/>
		<br/>
		<PeriodSelector
	    	  fromMonth={this.state.fromMonth}
	    	  toMonth={this.state.toMonth}
	    	  fromYear={this.state.fromYear}
	    	  toYear={this.state.toYear}
	    	  updatePeriod={this.updateAdminPeriod}/>
		<br/>
		<AdminButton onClick={() => this.onClick()}/>
		  <DeleteButton onClick={() =>this.deletePreset()}/>
		    <br/><br/>
		    <button className="ui secondary button"
		      onClick={() => this.tryItOut()}>
		      <i aria-hidden="true" className="hospital icon"></i>Try it out
		    </button>
		    <br/>
	    </div>
	);
    }
}
