// where we get the Organization unit list calling the api fetch
import React, { Component } from 'react';
import {getAllDataElements,getAllOrgUnits} from './api';
import OrganisationUnitList from '../components/orgUnitList';

class GetOrgUnit extends Component {
  constructor(){
    super();

    this.state = {
      text: '',
      moreText: '',
      organisationUnits: [],
    };
  }

  /**
  *Load organization units
  **/
  componentDidMount(){
    getAllOrgUnits().then((organisationUnits) => { //call the fetch to get elements
      this.setState({organisationUnits: organisationUnits});
    }).catch((e) => {
      console.log('Error while loading ', e.message);
    });
  }

  /**
  *Clean up when component unmounts
  **/
  componentWillUnmount() {
    this.organisationUnits.destroy();
  }

  render() {
    return (
      <div className="GetOrgUnit">
        <p>Select Organizational Units</p>
        <OrganisationUnitList organisationUnits={this.state.organisationUnits} />
      </div>
    );
  }
}

export default GetOrgUnit;
