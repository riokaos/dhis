/**
 * Validate a state from the MenuContainer class.
 * @param s: A "state" containing the fields
 * mode, min, max,
 * fromMonth, fromYear, toMonth, toYear,
 * stockType, stockUsage, stockAvailability,
 * orgUnits, singleOrgUnit
 */
export function validate(s) {
    let retObj;
    retObj = validateNumbers(s.min, s.max);
    if (!retObj.valid) {
	return retObj;
    }

    retObj = validatePeriod(s.fromMonth, s.toMonth,
				 s.fromYear, s.toYear);
    if (!retObj.valid) {
	return retObj;
    }

    retObj = validateStockInfo(s.mode,
				    s.stockType,
				    s.stockAvailability,
				    s.stockUsage);
	if (!retObj.valid) {
		return retObj;
	}
    /* Check that the user has chosen at least one organization
       unit. */
    const msg = "Please choose an organization unit.";
    if (s.mode === "estimates") {
	if (!s.orgUnits || s.orgUnits.length === 0) {
	    return falseObj(msg);
	}

    } else if (s.mode === "timetrend") {
	if (!s.singleOrgUnit) {
	    return falseObj(msg);
	}
    }
    return trueObj();
} // end validate

/**
 * Create a return object representing an invalid state.
 * @param msg: The error message in the object.
 */
function falseObj(msg) {
    return {
	valid: false,
	errMsg: msg
    };
}

/**
 * Create a return object representing a valid state.
 */
function trueObj() {
    return {
	valid: true,
	errMsg: null
    };
}

/**
 * If minStr and maxStr are specified, check that they
 * are numbers, and that 0<=min<=max.
 */
function validateNumbers(minStr, maxStr) {
    const minNr = parseInt(minStr, 10),
	  maxNr = parseInt(maxStr, 10);

    if (minStr && isNaN(minNr)) {
	return falseObj("Min is not a number.");

    } if (maxStr && isNaN(maxNr)) {
	return falseObj("Max is not a number.");

    } if (minStr && maxStr) {
	if (!(0 <= minNr)) {
	    return falseObj("Min must be at least 0.");

	} else if (!(minNr <= maxNr)) {
	    return falseObj("Min must be less or equal " +
				 "to Max.");
	}
    }
    return trueObj();
} // end validateNumbers

/**
 * Validate the period defined by the given parameters.
 */
function validatePeriod(fromMonth, toMonth, fromYear, toYear) {
    /* If user has specified a period (partially or wholly),
       check that from <= to. */
    if (fromYear > toYear) {
	let msg = "The value of FromYear must be less or " +
	    "equal to ToYear.";
	return falseObj(msg);

} else if (fromYear === toYear &&
	       fromMonth > toMonth) {
	let msg = "The date (FromMonth, FromYear) must " +
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
} // end validatePeriod

/**
 * Check that there are sufficiend information about
 * the stock to plot.
 * NB: We assume that 'stockAvailability' and 'stockUsage'
 * are automatically initialized when user selects a
 * predefined stock. I.e., these variables should always
 * be non-zero.
 */
function validateStockInfo(mode, stockType, stockAvailability,
		  stockUsage) {
    if (!stockType) {
		if (mode === "timetrend" &&
			!stockAvailability) {
			let msg = "Please choose a stock from the list. " +
			"Optionally you can specify the variable " +
			"for stock availability from the 'advanced " +
			"options' menu.";
			return falseObj(msg);

		} else if (mode === "estimates" &&
			(!stockAvailability || !stockUsage)) {
				console.log("In estimates in validation")
			let msg = "Please choose a stock from the list. " +
			"Optionally you can specify the variables " +
			"for stock availability and stock usage " +
			"from the 'advanced options' menu.";
			return falseObj(msg);
		}
    }
    return trueObj();
} // end validateStockInfo
