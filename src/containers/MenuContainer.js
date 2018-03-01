import React from "react";
import ModeSelector from '../components/ModeSelector'; // organization units dropdown multiselect
import MultipleOrgSearch from './multipleOrgSearch'; // organization units dropdown multiselect
import SimpleOrgSearch from './simpleOrgSearch'; // organization units dropdown multiselect
import StockSelector from './stockSelector'; // organization units dropdown multiselect
import AdvancedOptions from './AdvancedOptions';
import '../App.css';
import {getStockDataValues} from '../logic/api';
import {fetchData, createXYSeries} from '../logic/backend';
import {validate} from './Validation';

/**
 * A component for the user menu.
 */
class MenuContainer extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    // The "mode" of the app can either be "estimates" or
	    // "timetrend".
	    mode: "estimates",

	    /* OrgUnits is an array. Each item is an obj with fields
	       'value' and 'label'. */
	    orgUnits: null,
	    singleOrgUnit: null,     // For mode "timetrend"
	    stockAvailability: null, // Both will be objects with
	    stockUsage: null,        // fields 'value' and 'label'.

	    stockType: null,         // The selected stock.

	    /* Each item in statsInd is an obj with fields 'name',
	       'stockAvailability' and 'stockUsage'. */
      	    statsInd: [],
      	    totalStats: [],
	    min_estimates: "",
	    max_estimates: "",
	    min_timetrend: "",
	    max_timetrend: "",

	    userFromMonth: "09",
	    userFromYear: 2015,
	    userToMonth: "02",
	    userToYear: new Date().getFullYear(),
	};

	this.changeMode = this.changeMode.bind(this);
	this.updateOrgUnit = this.updateOrgUnit.bind(this);
	this.updateStockType = this.updateStockType.bind(this);
	this.updateUserBoundary = this.updateUserBoundary.bind(this);
	this.updateUserPeriod = this.updateUserPeriod.bind(this);
	this.setStockUsage = this.setStockUsage.bind(this);
	this.setStockAvailability = this.setStockAvailability.bind(this);
	this.plot = this.plot.bind(this);
	this.autofillInput = this.autofillInput.bind(this);
	this.props.globalCalls.setMenuContainer(this);
    } // end constructor

    /**
     * Change the 'mode' variable in the state.
     */
    changeMode(event) {
	this.setState({mode: event.target.value},
		      () => {
			  console.log("Show mode " +
				      this.state.mode);
		      });
    } // end changeMode

    /**
       Update the organization unit(s) in the state.
       @param value: Depends on the value of 'mode'.
       If mode == "estimates", the value should be a list of
       objects, where each object have fields 'value' and 'label'.

       If mode == "timetrend", the value should be an object with
       fields 'value' and 'label'.
     */
    updateOrgUnit(value) {
	console.log("You have selected Orgunits:  " + value);
	console.log(value.value);

	if (this.state.mode === "estimates") {
	    this.setState({
		orgUnits: value
	    });
	} else if (this.state.mode === "timetrend") {
	    this.setState({
		singleOrgUnit: value
	    });
	}
    } // end updateOrgUnit

    /**
     * The function is called when the user has chosen a stock
     * from the list of predefined stock queries. Fetch the data
     * associated with the stock from the data store and update
     * the state with the new data.
     */
    updateStockType(value) {
    	this.setState({
    	    stockType: value
    	});

	/* Get data for the new stock from data store, and
	   update the state. */
	if (value != null) {
            getStockDataValues(value).then((statsInd) => {
		this.setState({
		    statsInd: statsInd,
		    stockAvailability: {
			value:statsInd.availableID,
			label:statsInd.availableName
		    },
		    stockUsage: {
			value:statsInd.usageID,
			label:statsInd.usageName
		    },
		    min_estimates: statsInd.min_estimates,
		    max_estimates: statsInd.max_estimates,
		    min_timetrend: statsInd.min_timetrend,
		    max_timetrend: statsInd.max_timetrend,

		    userFromMonth: statsInd.fromMonth,
		    userToMonth: statsInd.toMonth,
		    userFromYear: statsInd.fromYear,
		    userToYear: statsInd.toYear

		});
	    }).catch((e) => {
		console.log('Error while loading ', e.message);
	    });
	}
    } // end updateStockType

    /**
     * Update a boundary value in the state, i.e. 'min_timetrend',
     * 'max_timetrend', 'min_estimates' or 'max_estimates'.
     * either "estimates" or "timetrend" mode.
     * @param value: The new boundary value.
     * @param boundaryType: "min" or "max".
     * @param mode: "estimates" or "timetrend".
     */
    updateUserBoundary(value, boundaryType, mode) {
	if (mode === "estimates") {
	    if (boundaryType === "min") {
		this.setState({
		    min_estimates: value
		});
	    } else if (boundaryType === "max") {
		this.setState({
		    max_estimates: value
		});
	    }
	} else if (mode === "timetrend") {
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
    } // end updateUserBoundary

    /**
     * Update the state for one of the variables defining the
     * period, i.e. 'fromMonth', 'toMonth', 'fromYear' or 'toYear'.
     * value: The new value.
     * periodType: "to" or "from".
     * isMonth: a boolean.
     */
    updateUserPeriod(value, periodType, isMonth) {
	if (periodType === "from") {
	    if (isMonth) {
		console.log("Update fromMonth: " + value);
		this.setState({
		    userFromMonth: value
		});
	    } else {
		console.log("Update fromYear: " + value);
		this.setState({
		    userFromYear: value
		});
	    }
	} else if (periodType === "to") {
	    if (isMonth) {
		console.log("Update toMonth: " + value);
		this.setState({
		    userToMonth: value
		});
	    } else {
		console.log("Update toYear: " + value);
		this.setState({
		    userToYear: value
		});
	    }
	}
    } // end updatePeriod

    /**
     * Set the variable 'stockAvailability' in the state.
     */
    setStockAvailability(value) {
	console.log("You have selected stock availability: ",
		    value);
	this.setState({
	    stockAvailability: value
	});
    }

    /**
     * Set the variable 'stockUsage' in the state.
     */
    setStockUsage(value) {
	console.log("You have selected stock usage: ", value);
	this.setState({
	    stockUsage: value
	});
    }

    /**
     * Validate the state variables.
     * Return: An object of format
     * {valid: true/false,
     * errMsg: "..."}
     *
     * If all the information required for generating a plot is
     * filled in and is valid, the 'valid' field will be true.
     * If not, 'valid' === false and 'errMsg' holds the
     * corresponding error message.
     */
    validateState() {
	let currentState = {
	    mode: this.state.mode,
	    min: this.state.userMinBorder,
	    max: this.state.userMaxBorder,
	    fromMonth: this.state.userFromMonth,
	    fromYear: this.state.userFromYear,
	    toMonth: this.state.userToMonth,
	    toYear: this.state.userToYear,
	    stockType: this.state.stockType,
	    stockUsage: this.state.stockUsage,
	    stockAvailability: this.state.stockAvailability,
	    orgUnits: this.state.orgUnits,
	    singleOrgUnit: this.state.singleOrgUnit
	};

	return validate(currentState);
    } // end validate

    /**
     * Handles invalid input by printing an error message.
     */
    handleInvalidInput(errMsg) {
	alert(errMsg);
    }

    /**
     * Returns current year, unless it's january, then it returns
     * last year.
     */
    getCurYear() {
	const date = new Date();
	let year = date.getFullYear(),
	month = date.getMonth();

	if(month === 0 ) {
	    year = year - 1;
	}

	return year;
    }

    /**
     * Returns last month in dhis-format
     */
    getLastMonth() {
	let month = new Date().getMonth();

	if(month >= 10) {
	    month = month.toString();
	}else if(month === 0) {
	    month = 12;
	    month = month.toString();
	}else {
	    month = "0" + month.toString();
	}

	return month;
    }

    /**
     * Returns the properties defining the state of this object.
     * The return object consists of the following fields:
     * - If mode === "estimates":
     * mode, availability_id, usage_id, min, max, fromMonth,
     *  fromYear, toMonth, toYear, orgnames[], stockname, statsInd
     * - If mode === "timetrend": mode, availability_id, min,
     * max, fromMonth, fromYear, toMonth, toYear, orgname, statsInd
    */
    getProperties(){
	let mode = this.state.mode,
	    min_estimates = this.state.min_estimates,
	    max_estimates = this.state.max_estimates,
	    min_timetrend = this.state.min_timetrend,
	    max_timetrend = this.state.max_timetrend,

	    userFromMonth = this.state.userFromMonth,
	    userFromYear = this.state.userFromYear,
	    userToMonth = this.state.userToMonth,
	    userToYear = this.state.userToYear,
	    stockType = this.state.stockType,
	    stockUsage = this.state.stockUsage,
	    stockAvailability = this.state.stockAvailability,
	    orgUnits = this.state.orgUnits,
	    singleOrgUnit = this.state.singleOrgUnit,
	    statsInd = this.state.statsInd;

    	if (mode === "estimates") {
    	    return {
    		mode: mode,
    		availability_id: stockAvailability.value,
    		usage_id: stockUsage.value,
    		min: parseFloat(min_estimates, 10),
    		max: parseFloat(max_estimates, 10),
		fromMonth: userFromMonth,
		fromYear: userFromYear,
		toMonth: this.getLastMonth(),
		toYear: this.getCurYear(),
    		orgnames: orgUnits.map((orgUnit) => orgUnit.label),
    		orgIDs: orgUnits.map((orgUnit) => orgUnit.value),
    		stockname: stockType ? stockType.label : "Custom stock",
		statsInd: statsInd
	    };
	} else if (mode === "timetrend") {
    	    return {
    		mode: mode,
    		availability_id: stockAvailability.value,
    		min: parseFloat(min_timetrend, 10),
    		max: parseFloat(max_timetrend, 10),
  		fromMonth: userFromMonth,
		fromYear: userFromYear,
		toMonth: userToMonth,
		toYear: userToYear,
    		orgname: singleOrgUnit.label,
    		orgID: singleOrgUnit.value,
    		stockname: stockType ? stockType.label : "Custom stock",
		statsInd: statsInd
    	    };
    	} else {
	    alert("Mode has an invalid value");
	    return null;
	}
    } // end getProperties

    /**
     * Validate and then plot the input data.
     */
    onClick() {
	     // NB: Assume that the input from admin is already
	      // validated.
	       let validationObject = this.validateState();
	        if (!validationObject.valid) {
	           this.handleInvalidInput(validationObject.errMsg);
	          } else {
	             let properties = this.getProperties();
	              fetchData(properties)
		            .then((data) => createXYSeries(data, properties))
		            .then((series) => this.plot(series, properties))
		            .catch((error) => console.log("Error in Plot stack: " + error + " in line " + error.stack));
	}

    } // end onClick


    /**
     * Creates a plot using values from series and properties
     */
    plot(series, properties){
	if (properties.mode === "timetrend"){
	    this.props.globalCalls
      .createTimeTrendPlot(series.xSeries, series.ySeries,
				    properties.min, properties.max,
				    properties.stockname,
				    properties.orgname,
            properties);
	}

	if (properties.mode === "estimates"){
	    console.log("Plotting estimates")
	    this.props.globalCalls
      .createEstimatesPlot(series.xSeries, series.ySeries,
				    properties.min, properties.max,
				    properties.stockname,
            properties);
	}
    } // end plot

    /**
     * Update the current state with the fields in parameter
     * 'input'.
     * The 'input' object is created in function 'tryItOut' of file
     * 'AdminPanel'.
     */
    autofillInput(input) {
	this.setState({
	    stockAvailability: {
		value: input.availableID,
		label: input.availableName
	    },

	    stockUsage: {
		value: input.usageID,
		label: input.usageName
	    },

	    min_estimates: input.min_estimates,
	    max_estimates: input.max_estimates,
	    min_timetrend: input.min_timetrend,
	    max_timetrend: input.max_timetrend,

	    userFromMonth: input.fromMonth,
	    userToMonth: input.toMonth,
	    userFromYear: input.fromYear,
	    userToYear: input.toYear
	});
    } // end autofillInput

    render() {
	let Orgsearch;
	if (this.state.mode==='estimates') {
	    Orgsearch=<MultipleOrgSearch
	    value={this.state.orgUnits}
	    mode={this.state.mode}
	    updateOrgUnit={this.updateOrgUnit}/>  ;
	}
	else {
            Orgsearch=<SimpleOrgSearch
	    value={this.state.singleOrgUnit}
	    mode={this.state.mode}
	    updateOrgUnit={this.updateOrgUnit}/>;
	}

	return(
	    <div className='UserMenu'>
	      <ModeSelector
		mode={this.state.mode}
		changeMode={this.changeMode}/>
	      <br/>
	      {Orgsearch}
	      <br/>
	      <StockSelector
		globalCalls={this.props.globalCalls}
		value={this.state.stockType}
		updateStockType={this.updateStockType}
		/>
        <br/>
        <div className='PlotButtonBox'>
    <button className='ui positive button'
      onClick={() => this.onClick()}><i aria-hidden="true" className="bar chart icon"></i>
      Generate plot
    </button>
        </div>
	      <br/>
	      <AdvancedOptions
		      mode={this.state.mode}
		       userMinBorder={this.state.mode === "estimates" ?
			        this.state.min_estimates :
		            this.state.min_timetrend}
		            userMaxBorder={this.state.mode === "estimates" ?
				            this.state.max_estimates :
		                this.state.max_timetrend}
		                updateUserBoundary={this.updateUserBoundary}

		            fromMonth={this.state.userFromMonth}
		            toMonth={this.state.userToMonth}
		            fromYear={this.state.userFromYear}
		            toYear={this.state.userToYear}
		            updateUserPeriod={this.updateUserPeriod}

		            stockAvailability={this.state.stockAvailability}
		            setStockAvailability={this.setStockAvailability}
		            stockUsage={this.state.stockUsage}
		            setStockUsage={this.setStockUsage}
		/>

	      <br/>
	    </div>
	);
    }
} // end MenuContainer

export default MenuContainer;
