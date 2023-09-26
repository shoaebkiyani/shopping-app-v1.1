import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { cartItem, deleteItem, getCart } from '../../../features/cart/cartSlice';
import { useEffect } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

function CartItem() {
	const {cartItems} = useSelector((state: RootState) => state.cart.cart);
	const dispatch = useDispatch<AppDispatch>();

	const handleDelete = (id: string) => {
		if(id){
			dispatch(deleteItem(id));
		}
	}

	useEffect(() => {
			dispatch(getCart());
	}, [dispatch]);
		
	return (
		<div className='w-full mx-auto py-20'>
			<h2 className='text-center text-xl mb-5'>Cart</h2>
			<div className='flex w-[500px] mx-auto border border-black'>
				<div className='w-full border border-black'>
					{
						cartItems && cartItems.map((item: cartItem) => (
							<ul key={item.cartItemId} className='mt-2 flex w-full p-3 justify-around items-center'>
							<li className='w-[150px]'>{item.product.title}</li>
							<li className='w-[100px]'>{`${item.product.price}€`}</li>
							<li className='w-[75px]'>{item.quantity}
							</li>
							<button className='cursor-pointer' >
								<RiDeleteBin6Line size={25} className='text-red-700' onClick={() => handleDelete(item.cartItemId)} />
							</button>
						</ul>
					))}
				</div>
			</div>
		</div>
	);
}
export default CartItem;
