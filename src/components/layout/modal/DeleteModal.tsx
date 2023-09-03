import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/store';
import {
	deleteProduct,
	getProducts,
} from '../../../features/products/ProductSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
	loadUserFromStorage,
	logoutUser,
} from '../../../features/auth/userSlice';

function DeleteModal() {
	const { id } = useParams();

	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { products, isLoading, error } = useSelector(
		(state: RootState) => state.products
	);

	useEffect(() => {
		dispatch(loadUserFromStorage());
		if (products.length === 0) {
			dispatch(getProducts());
		}
	}, [dispatch, products.length]);

	const handleDelete = (id: string) => {
		const token = localStorage.getItem('token');
		if (token) {
			const tokenTime = JSON.parse(atob(token.split('.')[1]));
			const tokenIsExpired = tokenTime.exp * 1000 < Date.now();

			if (tokenIsExpired) {
				localStorage.removeItem('token');
			}
		}
		if (token === null) {
            toast('Session expired, Please login again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
			dispatch(logoutUser());
		} else {
			if (id) {
				dispatch(deleteProduct(id));
			}
			if (!isLoading && !error) {
				navigate('/admin/products');
				toast.success('Item deleted successfully');
			}
			if (error) {
				navigate('/admin/products');
				toast.warn('Unable to delete the item');
			}
		}
	};

	return (
		<div
			className='fixed bg-black inset-0 bg-opacity-70 backdrop-blur-sm min-w-full min-h-full z-40 left-0 top-0'
			id='wrapper'
		>
			<div className='relative px-4 min-h-screen md:flex md:items-center md:justify-center'>
				<div className='bg-black opacity-25 w-full h-full absolute z-10 inset-0'></div>
				<div className='bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative'>
					<div className='md:flex items-center'>
						<div className='rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto'>
							<i className='bx bx-error text-3xl'></i>
						</div>
						<div className='mt-4 md:mt-0 md:ml-6 text-center md:text-left'>
							<p className='font-bold'>Delete item</p>
							<p className='text-sm text-gray-700 mt-1'>
								You will lose all of the item data by deleting. This action
								cannot be undone.
							</p>
						</div>
					</div>
					<div className='text-center md:text-right mt-4 md:flex md:justify-end'>
						<button
							className='block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2'
							onClick={() => handleDelete(id!)}
						>
							Delete
						</button>
						<button
							className='block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1'
							onClick={() => {
								navigate('/admin/products');
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default DeleteModal;
