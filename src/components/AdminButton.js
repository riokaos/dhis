import React, {Component} from 'react';

//Button for submitting the values in admin panel
export default class AdminButton extends Component{
    render(){
        return (
            <button className="ui positive button" onClick = {this.props.onClick}>
                <i aria-hidden="true" className="checkmark icon"></i>Save
            </button>
        )
    }

}
