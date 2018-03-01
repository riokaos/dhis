import React from 'react';

//Component represents a button which when cliked deletes the requested stock from our database
class DeleteButton extends React.Component {
    render() {
		return(
			<button className="ui negative button" onClick={this.props.onClick}>
				<i aria-hidden="true" className="delete icon"></i>Delete
			</button>
		);
    }
}

export default DeleteButton;
