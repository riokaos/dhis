// multiple Orgunit selector using react-select library MIT license
import React, { Component } from 'react';
import {getAllOrgUnits} from '../logic/api';
import Select from 'react-select';

class MultipleOrgSearch extends Component {
  constructor(){
	   super();
	   this.state = {
       organisationUnits: []
     };
  }

  /**
  *call the json api in dhis via promise
  **/
  componentDidMount(){
	  // Load organization units
    getAllOrgUnits().then((organisationUnits) => { //call the fetch to get elements
      this.setState({organisationUnits: organisationUnits});
    }).catch((e) => {
      console.log('Error while loading ', e.message);
    });
  }

  render() {
	   let organisationUnits = [];
	    // Loop the orgunits into an aray that contains the id and the displayName
	     if(this.state.organisationUnits.length > 0){
	        this.state.organisationUnits.forEach((organisationUnit) => {
		          organisationUnits.push({value: organisationUnit.id,
					                            label: organisationUnit.displayName});
	        });
	     }

	    return (
	       <div className="section">
            <Select className='OrgSelector'
                multi joinValues
                value={this.props.value}
		            placeholder="Select your Organizational Units(s)"
		            options={organisationUnits}
		            onChange={this.props.updateOrgUnit}/>
		      </div>
	     );
    }
}

export default MultipleOrgSearch;
