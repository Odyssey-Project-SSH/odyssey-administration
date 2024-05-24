import { React } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Authentication from './components/authentication/Authentication';
import Dashboard from './components/dashboard/Dashboard';
import News from './components/news/News';

const App = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/" element={ <Authentication /> } />
					<Route path="/dashboard" element={ <Dashboard /> } />
					<Route path="/news" element={ <News />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App
