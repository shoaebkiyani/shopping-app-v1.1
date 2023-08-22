import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { NavLink, Outlet } from 'react-router-dom';
import { loadUserFromStorage } from '../../../features/auth/userSlice';
import { useEffect } from 'react';

function Admin() {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(loadUserFromStorage());
	}, [dispatch]);

	// const handleUsers = () => {
	// 	dispatch(getUsers());
	// };

	return (
		<div className='w-full border border-black flex '>
			<div className='w-[250px] h-screen bg-gray-900 text-white flex flex-col justify-start items-center p-10'>
				<h4 className='text-center underline underline-offset-2'>
					Admin Dashboard
				</h4>
				<div className='flex flex-col justify-evenly h-[200px]'>
					<NavLink
						to='users'
						className='inline-block rounded bg-primary bg-rose-900 w-[150px] mt-2 text-center pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
					>
						Users
					</NavLink>
					<NavLink
						to='products'
						type='button'
						className='inline-block rounded bg-primary bg-rose-900 w-[150px] mt-2 text-center pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
					>
						Products
					</NavLink>
				</div>
			</div>
			<div className='p-10 w-full'>
				{user.id !== '' && (
					<h1 className='text-center mx-auto'>{`Welcome ${user.username}`}</h1>
				)}
        {/* <div>{users && users.map((user: {id: string, username: string}) => (
                    <div key={user.id}>{user.username}</div>
                ))}</div> */}
				<Outlet />
			</div>
		</div>
	);
}
export default Admin;
