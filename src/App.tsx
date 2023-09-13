import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

import RootLayout from './components/layout/routerLayout/RootLayout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import CategoryFilter from './components/pages/Category/CategoryFilter';

import AuthLayout from './components/layout/routerLayout/AuthLayout';
import Admin from './components/pages/Admin/Admin';
import UsersList from './components/pages/Admin/users/UsersList';
import ProductsList from './components/pages/Admin/products/ProductsList';
import AddProduct from './components/pages/Admin/products/AddProduct';
import UpdateProduct from './components/pages/Admin/products/UpdateProduct';
import DeleteModal from './components/layout/modal/DeleteModal';
import UserProfile from './components/pages/User/UserProfile';

import CategoryList from './components/pages/Admin/categories/CategoryList';
import AddCategory from './components/pages/Admin/categories/AddCategory';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='category/:id' element={<CategoryFilter />} />

				{/* Protected Route */}
				<Route element={<AuthLayout />}>
					<Route path='admin' element={<Admin />}>
						<Route path='users' element={<UsersList />} />
						<Route path='products' element={<ProductsList />}>
							<Route path='add-product' element={<AddProduct />} />
							<Route path='edit-product/:id' element={<UpdateProduct />} />
							<Route path='delete-product/:id' element={<DeleteModal />} />
						</Route>
						<Route path='categories' element={<CategoryList />}>
							<Route path='add-category' element={<AddCategory />} />
							<Route path='delete-category/:id' element={<DeleteModal />} />
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
