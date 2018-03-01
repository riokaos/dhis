import React from 'react';

//Name selector field in admin panel. Allows for selection of name for stock.
class AdminInputName extends React.Component {
    constructor() {
	super();

	this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
		    this.props.updatePresetName(event.target.value);
    }

    render() {
		return(
			<div className="ui input">
				<input className='NameInput' type="text"
					value={this.props.value}
					onChange={this.handleChange}
					placeholder="Preset name"
				/>
			</div>
		);
    }
}

export default AdminInputName;
