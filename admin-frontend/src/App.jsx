import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Authentication from './components/authentication/Authentication';
import Dashboard from './components/dashboard/Dashboard';
import Recommendations from './components/recommendations/Recommendations';
import Trips from './components/trips/Trips';

const App = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" element={ <Authentication /> } />
					<Route path="/dashboard" element={ <Dashboard /> } />
					<Route path="/recommendations" element={ <Recommendations /> } />
					<Route path="/trips" element={ <Trips /> } />
				</Routes>
			</div>
		</Router>
	);
}

export default App
