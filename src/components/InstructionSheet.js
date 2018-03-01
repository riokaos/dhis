import React, {Component} from 'react';

//Displayed in the plotting window when there is no plot.
//Gives instructions to the user on how to use our program
export default class InstructionSheet extends Component{

    render(){
        return (
        <div className="ui text container">
            <h1 className="ui header">
                Welcome to PlotStocker!
            </h1>

            <h2 className="ui header">
                Instructions:
            </h2>
            <h3 className="ui header">
                The basics:
            </h3>
            <p>
                PlotStocker is a plotting tool for visualising stock information for organisations in the dhis system.
                Stock data can be chosen from a predefined list or be costumized on the fly.
                The app supports plotting in two modes:
            </p>
            <h4>
                Timetrend
            </h4>
            <p>
                Generates a graph plot of the stock inventory for an organisation over time.
            </p>
            <h4 className="ui header">
                Estimates:
            </h4>
            <p>
                Generates a bar graph of current inventory for a set of organisations given in estimated months of supply left.
            </p>

            <h3 className="ui header">Advanced use:</h3>
            <h4 className="ui header">Advanced settings:</h4>
            <ul>
                <li>Stock availability: Element used for representing inventory in months</li>
                <li>Stock Usage: Element used for representing stock usage in a month</li>
                <li>Min/max: Represents recommended minimum and maximum limits for the stock. Displayed as a line in the graph.</li>
                <li>Period: The period to display data from (and to).</li>
            </ul>
            <h4 className="ui header">Admin panel:</h4>
            <p>
                Allows users with sufficient privilege to set presets for stocks. Select a name, fill inn the values and submit it to the database. Click the preview button to move your values to the user panel and test them.
            </p>

	    <p>
	      How to delete a preset stock: Enter the name of the stock in the "preset name" field. Click the "delete" button.
	    </p>
        </div>
        )
    }
}
