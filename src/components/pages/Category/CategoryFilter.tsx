import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';

import { Product, getProducts } from '../../../features/products/ProductSlice';
import ProductItem from '../Products/ProductItem';

import Spinner from '../../../assets/spinner/spinner.gif';

function CategoryFilter() {
	const { id } = useParams();

	const { products, isLoading } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const filteredCat = products.filter(
		(product: Product) => product.category.name === id
	);

	return (
		<div>
			{isLoading && (
				<div className='w-full h-screen flex  justify-center items-center'>
					<span className='text-white text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			)}
			<NavLink to='/'>
				<div className='w-32 p-2 mt-4 mx-10 rounded-md text-center font-medium text-white bg-gray-800 cursor-pointer'>
					Back
				</div>
			</NavLink>
			<div className='flex flex-wrap justify-evenly xs:flex-col xs:items-center max-w-screen-2xl m-auto py-2 px-4'>
				{filteredCat.length < 1 && (
					<div>No products found under this category</div>
				)}
				{filteredCat.map((product) => (
					<div key={product.id}>
						<ProductItem {...product} />
					</div>
				))}
			</div>
		</div>
	);
}
export default CategoryFilter;
