import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Ordenes from './components/ordenes/Ordenes.jsx';
import Ventas from './components/ventas/Ventas.jsx';

function App() {
	return (
		<div className='container-fluid'>
			<Router>
				<Switch>
					<Route exact path='/' component={Login}></Route>
					<Route exact path='/ordenes' component={Ordenes}></Route>
					<Route exact path='/ventas' component={Ventas}></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
