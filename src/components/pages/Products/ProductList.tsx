import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';

import Spinner from '../../../assets/spinner/spinner.gif';

import { Product, getProducts } from '../../../features/products/ProductSlice';
import ProductItem from './ProductItem';
import { createCart } from '../../../features/cart/cartSlice';
import Categories from '../Category/Categories';

function ProductList() {
	const { products, isLoading } = useSelector(
		(state: RootState) => state.products
	);

	const dispatch = useDispatch<AppDispatch>();

	const [filter, setFilter] = useState<string>('');

	const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()));

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
			<div className='mt-3'>
				<Categories />
			</div>
			<div className='relative flex flex-col items-end justify-end xs:justify-center mt-3 mr-5 xs:mx-2'>
				<input type="text" placeholder="Search products" value={filter} onChange={(e) => setFilter(e.target.value)} className="input input-bordered w-full max-w-xs" />
				{filter.length > 0 && <button className='absolute top-2 right-3 font-semibold text-lg' onClick={() => setFilter('')}>x</button>}
				{filter.length > 0 && <p className='mt-2'>{`Items found: ${filteredProducts.length}`}</p>}
			</div>
			<div className='flex flex-wrap justify-evenly items-center xs:flex-col xs:items-center w-full'>
				{filteredProducts.map((product: Product) => (
					<div key={product.id}>
						<ProductItem {...product} />
					</div>
				))}
			</div>
		</div>
	);
}
export default ProductList;
