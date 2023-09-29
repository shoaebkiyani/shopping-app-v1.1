import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';

import Spinner from '../../../assets/spinner/spinner.gif';

import { Product, getProducts } from '../../../features/products/ProductSlice';
import ProductItem from './ProductItem';
import { createCart } from '../../../features/cart/cartSlice';

function ProductList() {
	const { products, isLoading } = useSelector(
		(state: RootState) => state.products
	);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getProducts());
		dispatch(createCart());
	}, [dispatch]);

	return (
		<div>
			{isLoading && (
				<div className='w-full h-screen flex  justify-center items-center'>
					<span className='text-white text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			)}
			<div className='flex flex-wrap justify-evenly items-center xs:flex-col xs:items-center w-full'>
				{products.map((product: Product) => (
					<div key={product.id}>
						<ProductItem {...product} />
					</div>
				))}
			</div>
		</div>
	);
}
export default ProductList;
