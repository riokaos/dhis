import React, { Component } from 'react';


//Component allowing the user to select an organisation form a list.
class OrganisationUnitList extends Component {

  render() {
    return (
      <div>
        <select>
          {this.props.organisationUnits.map((organisationUnit, index) => {
            return <option value="{organisationUnit.id}">{organisationUnit.displayName}</option>
          })}
      </select>
      </div>
    );
  }
}

export default OrganisationUnitList;