import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from './components/layout/routerLayout/RootLayout';
import AuthLayout from './components/layout/routerLayout/AuthLayout';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import UserProfile from './components/pages/User/UserProfile';
import Admin from './components/pages/Admin/Admin';
import UsersList from './components/pages/Admin/UsersList';
import ProductsList from './components/pages/Admin/ProductsList';
import UpdateProduct from './components/pages/Admin/UpdateProduct';
import AddProduct from './components/pages/Admin/AddProduct';
import DeleteModal from './components/layout/modal/DeleteModal';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />

				{/* Protected Route */}
				<Route element={<AuthLayout />}>
					<Route path='admin' element={<Admin />}>
						<Route path='users' element={<UsersList />} />
						<Route path='products' element={<ProductsList />}>
							<Route path='add-product' element={<AddProduct />} />
							<Route
								path='edit-product/:id'
								element={
									<UpdateProduct />
								}
							/>
							<Route path='delete-product/:id' element={<DeleteModal />} />
						</Route>
					</Route>
					<Route path='user' element={<UserProfile />} />
				</Route>
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />
		</>
	);
}

export default App;
