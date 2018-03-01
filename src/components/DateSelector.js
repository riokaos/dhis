import React from "react";

//Component for selecting month from a list
class MonthSelector extends React.Component {
    onChange(input) {
		this.props.updateMonth(input.target.value);
    }

    render() {
		return (
			<select className="ui dropdown" value={this.props.monthVal} onChange={this.onChange.bind(this)}>
				<option value = "01">January</option>
				<option value = "02">February</option>
				<option value = "03">March</option>
				<option value = "04">April</option>
				<option value = "05">May</option>
				<option value = "06">June</option>
				<option value = "07">July</option>
				<option value = "08">August</option>
				<option value = "09">September</option>
				<option value = "10">October</option>
				<option value = "11">November</option>
				<option value = "12">December</option>
			</select>
		);
    }
}

//Component for selecting a year from a list
class YearSelector extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
	    	curYear : new Date().getFullYear(),
		};
    }

    onChange(input) {
		this.props.updateYear(input.target.value);
	}

    render () {
		return (
			<select className="ui dropdown" value={this.props.yearVal} onChange={this.onChange.bind(this)}>
				<option value = {this.state.curYear}>{this.state.curYear}</option>
				<option value = {this.state.curYear-1}>{this.state.curYear-1}</option>
				<option value = {this.state.curYear-2}>{this.state.curYear-2}</option>
				<option value = {this.state.curYear-3}>{this.state.curYear-3}</option>
				<option value = {this.state.curYear-4}>{this.state.curYear-4}</option>
				<option value = {this.state.curYear-5}>{this.state.curYear-5}</option>
				<option value = {this.state.curYear-6}>{this.state.curYear-6}</option>
				<option value = {this.state.curYear-7}>{this.state.curYear-7}</option>
				<option value = {this.state.curYear-8}>{this.state.curYear-8}</option>
				<option value = {this.state.curYear-9}>{this.state.curYear-9}</option>
				<option value = {this.state.curYear-10}>{this.state.curYear-10}</option>
				<option value = {this.state.curYear-11}>{this.state.curYear-11}</option>
				<option value = {this.state.curYear-12}>{this.state.curYear-12}</option>
				<option value = {this.state.curYear-13}>{this.state.curYear-13}</option>
				<option value = {this.state.curYear-14}>{this.state.curYear-14}</option>
				<option value = {this.state.curYear-15}>{this.state.curYear-15}</option>
			</select>
		);
    }
}

//Component allowing user to select a month and a year
class DateSelector extends React.Component {
    constructor(props) {
		super(props);
		this.updateMonth = this.updateMonth.bind(this);
		this.updateYear = this.updateYear.bind(this);
    }

    updateMonth(value) {
		this.props.updateDate(value, true);
    }

    updateYear(value) {
		this.props.updateDate(value, false);
    }

    render() {
		return(
			<div>
				<label>{this.props.label}</label>
				<MonthSelector
					updateMonth={this.updateMonth}
					monthVal={this.props.monthVal}
				/>

				<YearSelector
					updateYear={this.updateYear}
					yearVal={this.props.yearVal}
				/>
			</div>
		);
    }
}

export default DateSelector;
