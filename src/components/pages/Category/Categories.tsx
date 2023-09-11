import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

function Categories() {
	const handleCategory = (id: string) => {
		console.log(id);
	};

	const { categories } = useSelector((state: RootState) => state.category);
	return (
		<div className='flex xs:flex-col justify-evenly xs:text-center p-3 bg-gray-800'>
			{categories &&
				categories.map((category) => (
					<ul key={category.id}>
						<button onClick={() => handleCategory(category.id)}>
							<li className='mr-3 xs:mb-3 p-2 border border-rose-600 bg-rose-950 text-white text-center cursor-pointer'>
								{category.name.toUpperCase()}
							</li>
						</button>
					</ul>
				))}
		</div>
	);
}
export default Categories;
