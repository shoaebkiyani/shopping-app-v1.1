import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { useNavigate } from 'react-router-dom';

import {
	loadUserFromStorage,
	logoutUser,
} from '../../../../features/auth/userSlice';
import {
	Category,
	getCategory,
} from '../../../../features/category/categorySlice';
import {
	Product,
	addProduct,
} from '../../../../features/products/ProductSlice';

import { toast } from 'react-toastify';

// firebase
import { app } from '../../../../firebase';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

function AddProduct() {
	const [imageData, setImageData] = useState<File | undefined>(undefined);
	const [imagePercent, setImagePercent] = useState<number>(0);
	const [imageError, setImageError] = useState<boolean>(false);

	const { categories } = useSelector((state: RootState) => state.category);
	const { isLoading, error } = useSelector(
		(state: RootState) => state.products
	);

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const [productData, setProductData] = useState<Product>({
		id: '',
		title: '',
		imageURL: '',
		price: 0,
		quantity: 0,
		inStock: false,
		description: '',
		categoryId: '',
		category: {
			id: '',
			name: '',
		},
	});

	interface productData {
		id: string;
		title: string;
		imageURL: string;
		price: number;
		quantity: number;
		inStock: boolean;
		description: string;
		categoryId: string;
		category: {
			id: string;
			name: string;
		};
	}

	const {
		title,
		imageURL,
		price,
		quantity,
		description,
		categoryId,
		category: { id, name },
	} = productData;

	useEffect(() => {
		dispatch(loadUserFromStorage());
		dispatch(getCategory());
	}, [
		dispatch,
		title,
		imageURL,
		price,
		quantity,
		description,
		categoryId,
		id,
		name,
	]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setProductData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const categoryId = e.target.value;
		const selectedCategory = categories.find(
			(category) => category.id === categoryId
		);

		if (selectedCategory) {
			setProductData({
				...productData,
				categoryId: selectedCategory.id,
				category: {
					...productData.category,
					id: selectedCategory.id,
					name: selectedCategory.name,
				},
			});
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		if (token) {
			const tokenTime = JSON.parse(atob(token.split('.')[1]));
			const tokenIsExpired = tokenTime.exp * 1000 < Date.now();

			if (tokenIsExpired) {
				localStorage.removeItem('token');
			}
		}
		if (token === null) {
			dispatch(logoutUser());
		} else {
			if (title === '' || description === '') {
				toast.warn('Please fill all the fields');
			} else {
				dispatch(addProduct(productData));
			}
			if (!isLoading && !error) {
				navigate('/admin/products');
				toast.success('Product added successfully', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
			if (error) {
				navigate('/admin/products');
				toast.error(error);
			}
			setProductData({
				title: '',
				imageURL: '',
				price: 0,
				quantity: 0,
				inStock: false,
				description: '',
				id: '',
				categoryId: '',
				category: {
					id: '',
					name: '',
				},
			});
		}
	};

	useEffect(() => {
		if (imageData) {
			handleImageUpload(imageData);
		}
	}, [imageData]);

	// Image File Upload to Firebase
	const handleImageUpload = async (imageData: File) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + imageData.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, imageData);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setImagePercent(Math.round(progress));
			},
			(error) => {
				setImageError(true);
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setProductData({ ...productData, imageURL: downloadURL });
				});
			}
		);
	};

	return (
		<div className='fixed bg-black inset-0 bg-opacity-70 backdrop-blur-sm min-w-full min-h-full z-40 left-0 top-0'>
			<div className='xs:my-8 sm:my-8 md:my-10 flex flex-col justify-center items-center mx-auto font-small w-full'>
				<div className='text-sm'>
					<form
						onSubmit={handleSubmit}
						className='bg-gray-800 py-6 px-20 rounded-sm bg-opacity-100 text-opacity-100 flex flex-col'
					>
						<button
							className='bg-rose-900 text-white px-3 py-1 xs:text-[10px] text-lg rounded-md w-10 place-self-end'
							type='button'
							onClick={() => {
								navigate('/admin/products');
							}}
						>
							X
						</button>
						<h2 className='text-white text-center text-xl mb-2'>
							Add a new product
						</h2>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Title:</label>
							<input
								className='border border-black rounded-md px-2 py-2 mt-1'
								type='text'
								placeholder='Title'
								id='title'
								name='title'
								value={title}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Category:</label>
							<select
								className='border border-black rounded-md px-2 py-2 mt-1 dark:text-white cursor-pointer'
								onChange={handleCategoryChange}
								name='categoryId'
								id='categoryId'
							>
								<option>Choose one</option>
								{categories.length > 0 &&
									categories.map((category: Category) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
							</select>
						</div>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Price:</label>
							<input
								className='border border-black rounded-md px-2 py-2 mt-1'
								type='number'
								min={0}
								placeholder='0'
								id='price'
								name='price'
								value={price === 0 ? '' : price}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Quantity:</label>
							<input
								className='border border-black rounded-md px-2 py-2 mt-1'
								type='number'
								min={0}
								placeholder='0'
								id='quantity'
								name='quantity'
								value={quantity === 0 ? '' : quantity}
								onChange={handleChange}
							/>
						</div>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Image URL:</label>
							<input
								className='border border-black rounded-md px-2 py-2 mt-1'
								type='file'
								accept='image/*'
								placeholder='Image URL'
								id='imageURL'
								name='imageURL'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const file = e.target.files?.[0];
									if (file) {
										setImageData(file);
									}
								}}
							/>
						</div>
						<p className='text-sm self-center'>
							{imageError ? (
								<span className='text-red-700'>
									Error uploading image (file size must be less than 2 MB)
								</span>
							) : imagePercent > 0 && imagePercent < 100 ? (
								<span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
							) : imagePercent === 100 ? (
								<span className='text-green-700'>
									Image uploaded successfully
								</span>
							) : (
								''
							)}
						</p>
						<div className='flex flex-col py-2 xs:w-[300px] sm:w-[400px] md:w-[400px]'>
							<label className='text-white'>Description:</label>
							<textarea
								className='border border-black rounded-md px-2 py-2 mt-1'
								placeholder='Description'
								id='description'
								name='description'
								value={description}
								onChange={handleChange}
							/>
						</div>

						<div className='flex text-center mt-4'>
							<button
								className='bg-rose-900 text-white p-3 text-lg rounded-md w-full'
								type='submit'
							>
								Add a product
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default AddProduct;
