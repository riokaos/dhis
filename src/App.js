import React, { Component } from 'react';
import './App.css';
import 'react-select/dist/react-select.css';

import globalCalls from './logic/GlobalCalls';
import PlotContainer from './containers/PlotContainer'
import AdminPanel from './containers/AdminPanel';
import MenuContainer from './containers/MenuContainer';

class App extends Component {
    render() {
		return (
			<div className='Display'>
				<div className='MenuDisplay'>
					<MenuContainer globalCalls={globalCalls}/>
          <div>&nbsp;</div>
					<AdminPanel globalCalls={globalCalls}/>
				</div>
				<div className='PlotDisplay'>
					<PlotContainer globalCalls={globalCalls} />
				</div>
			</div>
		);
	}
}

export default App;
