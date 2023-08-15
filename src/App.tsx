import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
