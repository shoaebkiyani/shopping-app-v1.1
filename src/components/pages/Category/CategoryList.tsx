import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

import CategoryItem from './CategoryItem';
import { Category } from '../../../features/category/categorySlice';

function CategoryList() {
	const { categories } = useSelector((state: RootState) => state.category);

	return (
		<div className='flex justify-center items-center'>
			{categories.map((category: Category) => (
				<CategoryItem key={category.id} {...category} />
			))}
		</div>
	);
}
export default CategoryList;
