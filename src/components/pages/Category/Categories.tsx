import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';

import { getProducts } from '../../../features/products/ProductSlice';
import { getCategory } from '../../../features/category/categorySlice';

function Categories() {
	const { categories } = useSelector((state: RootState) => state.category);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getProducts());
		dispatch(getCategory());
	}, [dispatch]);

	return (
		<div className='flex xs:flex-col justify-evenly xs:text-center p-3 bg-[#1d232a]'>
			{categories &&
				categories.map((category) => (
					<ul key={category.id}>
						<NavLink to={`category/${category.name}`}>
							<li className='mr-3 xs:mb-3 p-2 border border-rose-600 bg-rose-950 text-white text-center cursor-pointer'>
								{category.name.toUpperCase()}
							</li>
						</NavLink>
					</ul>
				))}
		</div>
	);
}
export default Categories;
