import { useState } from 'react';
import {
	Category,
	addCategory,
} from '../../../../features/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { logoutUser } from '../../../../features/auth/userSlice';
import { toast } from 'react-toastify';

function AddCategory() {
	const { isLoading, error } = useSelector(
		(state: RootState) => state.category
	);
	const dispatch = useDispatch<AppDispatch>();

	const [newCategory, setNewCategory] = useState<Category>({
		id: '',
		name: '',
	});

	interface newCategory {
		id: string;
		name: string;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewCategory((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleAdd = (e: React.FormEvent) => {
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
			if (newCategory.name === '') {
				toast.error('Field should not be empty');
			} else {
				dispatch(addCategory(newCategory));
				if (!isLoading || !error) {
					toast.success('Category added successfully');
					setNewCategory({
						id: '',
						name: '',
					});
				}
			}
		}
	};

	return (
		<div className='w-full'>
			<form onSubmit={handleAdd} className='relative'>
				<input
					type='text'
					placeholder='Add category'
					name='name'
					value={newCategory.name}
					onChange={handleChange}
					className='p-2 border border-black rounded-xl w-full'
				/>
				<button
					type='submit'
					className='bg-gray-700 rounded-full absolute right-[4px] text-sm text-white h-7 w-7 top-[6px]'
				>
					+
				</button>
			</form>
		</div>
	);
}
export default AddCategory;
