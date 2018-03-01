import React, {Component} from 'react';

/*Button used to save current plot to users dataStore,
so that it can be used in the dashboard*/
export default class SaveToDashboardButton extends Component{
  render() {
    return(
      <div className="DashboardButtonContainer">
      <button className='ui blue button'
        onClick={() => this.props.onClick()}>
        <i aria-hidden="true" className="cloud upload icon"></i>
        Save to dashboard
      </button>
      </div>
    );
  }
}
