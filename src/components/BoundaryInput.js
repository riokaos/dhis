import React, {Component} from 'react';
import InputNumber from './InputNumber';
import '../App.css';

//Component for allowing user to input minimum and maximum values
class BoundaryInput extends Component {
    constructor() {
		super();
		this.setMin = this.setMin.bind(this);
		this.setMax = this.setMax.bind(this);
    }

    setMin(event) {
			this.props.updateBoundary(event.target.value, "min", this.props.mode);
    }

    setMax(event) {
		this.props.updateBoundary(event.target.value, "max", this.props.mode);
    }

    render() {
		return (
			<div className='BoundaryInput'>
				<label>{this.props.label}</label>
				<div className="ui input">
					<InputNumber
						name="Min"
						handleChange={this.setMin}
						value={this.props.minValue}
					/>
					<InputNumber
						name="Max"
						handleChange={this.setMax}
						value={this.props.maxValue}
					/>
				</div>
			</div>
		);
    }
}

export default BoundaryInput;
