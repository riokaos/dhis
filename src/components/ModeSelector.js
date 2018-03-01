import React, { Component } from 'react';
import '../App.css';

/*
A drop down menu for choosing between the two modes of the
app: "Estimates" and "Time trend".
*/
//Componetnt for selecting whether plot is a timetrend plot or estimates plot.
class ModeSelector extends Component {
    render() {
	return (
		<div className='ModeSelector'>
			<form>
				<label>
					Choose mode
					<select className="ui dropdown" value={this.props.mode}
	    				onChange={this.props.changeMode}>
						<option value="estimates">Estimates </option>
						<option value="timetrend">Time trend</option>
					</select>
				</label>
			</form>
		</div>
		);
    }
}

export default ModeSelector;
