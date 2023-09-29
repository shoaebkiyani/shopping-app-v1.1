import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import {
	cartItem,
	deleteItem,
	getCart,
	updateItemQuantity,
} from '../../../features/cart/cartSlice';
import { useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

function CartItem() {
	const { cartItems } = useSelector((state: RootState) => state.cart.cart);

	const dispatch = useDispatch<AppDispatch>();

	const handleDelete = (id: string) => {
		if (id) {
			dispatch(deleteItem(id));
		}
	};

	const handleDecrement = (id: string, quantity: number) => {
		if (quantity > 1) {
			dispatch(updateItemQuantity({ id: id, quantity: quantity - 1 }));
		}
	};

	const handleIncrement = (id: string, quantity: number) => {
		dispatch(updateItemQuantity({ id: id, quantity: quantity + 1 }));
	};

	// Calculate total price of all items
	const calc = cartItems.map((item) => item.totalPrice)
	const totalPriceOfItems = calc.reduce((a,b) => a + b, 0)

	// Calculate total number of items
	const calcQ = cartItems.map((item) => item.quantity)
	const totalItems = calcQ.reduce((a,b) => a + b, 0)

	useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

	return (
		<div className='w-full h-screen px-0 py-20 flex'>
			<div className='min-w-[60%] text-sm px-2'>
				<h2 className='text-center text-xl font-bold mb-5'>Cart</h2>
				<div className='w-full h-full rounded-lg shadow-xl p-3 border border-gray-700 '>
					{cartItems.length < 1 && <h2 className='text-center font-semibold'>No item in the cart</h2>}
					{cartItems &&
						cartItems.map((item: cartItem, index: number) => (
							<ul
								key={index}
								className='flex items-start w-full my-3 border border-gray-700 rounded-lg shadow-lg'
							>
								<li className='mr-2'>
									<img
										src={item.product.imageURL}
										alt='product'
										className='w-[150px] h-[120px]'
									/>
								</li>
								<li className='flex flex-col justify-around border border-white h-[120px]'>
									<li className='w-full border border-white'>{item.product.title}</li>
									<li className='w-[180px]'>
										<span className='text-sm'>{item.product.price}</span>
										<span className='mr-1 mt-1 text-[10px]'>€</span>
										<span className='text-xs mr-1'>x</span>
										<span className='mr-1'>{item.quantity}</span>
										<span className='text-xs mr-1'>=</span>
										<span className='font-bold'>{item.totalPrice}</span>
										<span className='mt-1 text-[10px]'>€</span>
									</li>
									<li className='w-[120px]'>
										<button
											className='mr-2 bg-gray-800 text-white rounded-full w-4 text-xs '
											onClick={() =>
												handleDecrement(item.cartItemId, item.quantity)
											}
										>
											-
										</button>
										<input
											type='number'
											value={item.quantity}
											min={1}
											className='w-2 text-center bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
											readOnly
										/>
										<button
											className='ml-2 bg-gray-800 text-white rounded-full w-4 text-xs'
											onClick={() =>
												handleIncrement(item.cartItemId, item.quantity)
											}
										>
											+
										</button>
									</li>

								</li>
								<button className='cursor-pointer place-self-start'>
									<RiDeleteBin6Line
										size={25}
										className='text-rose-600'
										onClick={() => handleDelete(item.cartItemId)}
									/>
								</button>
							</ul>
						))}
				</div>
			</div>
			<div className='min-w-[40%] px-2'>
				<h2 className='text-center text-xl font-bold mb-5'>Order's Summary</h2>
				<div className='border border-gray-700 h-[50%] w-full rounded-lg shadow-xl text-md'>
					<div className='flex flex-col justify-evenly items-center h-full'>
						<div className='flex'>
							<h3 className='mr-2'>Total number of items: </h3>
							<span> {totalItems}</span>
						</div>
						<div className='flex-col'>
						<div className='border border-dotted w-full mb-2'></div>
							<h3 className='mr-2 whitespace-wrap'>Estimated total ({totalItems}) items: {` ${totalPriceOfItems}€`}</h3>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CartItem;
