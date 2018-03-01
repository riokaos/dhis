import React, {Component} from 'react';

/*
A component that reads an input from user and passes it to
the parent component via the method props.handleChange.
*/
class InputNumber extends Component {

	//Stops pressing enter from reloading page or pressing random buttons
	stopPageRefreshing(event){
		if (event.key === 'Enter') {
			event.preventDefault()
			event.stopPropagation()
			return false
		}
	}

    render() {
		return (
			<form className='InputForm'>
				<input className='InputField' type="text"
					value={this.props.value}
					onChange={this.props.handleChange}
					placeholder={this.props.name}
					onSubmit={this.stopPageRefreshing}
					onKeyDown={this.stopPageRefreshing}
				/>
			</form>
		);
    }
}

export default InputNumber;
