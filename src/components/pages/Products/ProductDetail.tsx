import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/store';
import { Product, getProducts } from '../../../features/products/ProductSlice';
import { useEffect, useState } from 'react';
import { addToCart } from '../../../features/cart/cartSlice';
import { toast } from 'react-toastify';

function ProductDetail() {
	const { id } = useParams();
	const { products } = useSelector((state: RootState) => state.products);
	const { isLoading, error, cart } = useSelector((state: RootState) => state.cart);

	const dispatch = useDispatch<AppDispatch>();

	const productDetails = products.find((product: Product) => product.id === id);

	const values = [1, 2, 3, 4, 5];
	const [quantity, setQuantity] = useState<number>(1);

	const handleQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setQuantity(parseInt(e.target.value));
	};

	const handleAddToCart = () => {
		if (id) {
			if(cart.cartItems.find((item) => item.cartItemId === id)) {
				toast.warn("Item already in the cart")
			} else {
				dispatch(addToCart({ id, quantity }));
			}
		}
		if (!isLoading && error === null) {
			toast.success('Item successfully added to cart');
		}
	};

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<>
			<div>
				<div className='py-6'>
					<NavLink to='/'>
						<div className='w-32 p-2 my-4 mx-10 rounded-md text-center font-medium text-white bg-gray-800 cursor-pointer'>
							<span>Back</span>
						</div>
					</NavLink>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6'>
						<div className='flex flex-col md:flex-row -mx-4'>
							<div className='md:flex-1 px-4'>
								<div>
									<div className='flex items-center justify-center h-[100%] rounded-lg mb-4'>
										<img
											src={productDetails?.imageURL}
											className='h-96 rounded-lg bg-[#1d232a] mb-4'
										/>
									</div>

									<div className='flex -mx-2 mb-4'></div>
								</div>
							</div>
							<div className='md:flex-1 px-4 my-'>
								<h2 className='mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl'>
									{productDetails?.title}
								</h2>
								<p className='text-sm'>
									<span className='mr-2'>By</span>
									<span className='text-indigo-600 hover:underline'>
										{productDetails?.title.split(" ")[0]}
									</span>
									
								</p>

								<div className='flex items-center space-x-4 my-4'>
									<div>
										<div className='rounded-lg bg-gray-100 flex py-2 px-3'>
											<span className='text-indigo-400 mr-1 mt-1'>€</span>
											<span className='font-bold text-indigo-600 text-3xl'>
												{productDetails?.price}
											</span>
										</div>
									</div>
									<div className='flex-1'>
										<p className='text-green-500 text-xl font-semibold'>
											Save 12%
										</p>
										<p className='text-gray-400 text-sm'>
											Inclusive of all Taxes.
										</p>
									</div>
								</div>

								<div className='ml-5'>
									<ul className='list-disc'>
										{productDetails?.description.split(',').map((desc, index) => (
											<li key={index}>{desc}</li>
										))}
									</ul>
								</div>

								<div className='flex py-4 space-x-4'>
									<div className='relative'>
										<div className='text-center left-0 pt-2 right-0 absolute block text-xs uppercase tracking-wide font-semibold'>
											Qty
										</div>
										<select
											className='cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1'
											name='quantity'
											id='quantity'
											onChange={handleQuantity}
										>
											{values.map((value) => (
												<option key={value} defaultValue={value}>
													{value}
												</option>
											))}
										</select>
									</div>
									{productDetails?.inStock ? <button
										onClick={handleAddToCart}
										type='button'
										className='h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-800 hover:bg-indigo-500 text-white'
									>
										Add to Cart
									</button> : <button
										type='button'
										className='h-14 px-6 py-2 font-semibold rounded-xl bg-gray-500 text-white bg-[disabled] disabled:accent-gray-800'
									>
										Out of stock
									</button>}
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default ProductDetail;
