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

	return (
		<div className='w-full flex xs:flex-col sm:flex-col'>
			<div className='w-[250px] xs:h-[120px] sm:h-[180px] xs:w-full sm:w-full h-screen bg-gradient-to-b from-slate-900 to-red-900 text-white xs:text-xs flex flex-col justify-start items-center xs:p-4 p-10'>
				<h4 className='text-center underline underline-offset-2 mb-2'>
					<NavLink to=''>Admin Dashboard</NavLink>	
				</h4>
				<div className='flex md:flex-col justify-evenly h-[45px] md:h-[200px] w-full'>
					<NavLink
						to='users'
						className='inline-block rounded bg-primary bg-rose-900 xs:w-[100px] xs:mx-auto sm:w-[150px] mt-2 text-center pb-2 pt-2.5 text-xs xs:text-[10px] font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
					>
						Users
					</NavLink>
					<NavLink
						to='products'
						type='button'
						className='inline-block rounded bg-primary bg-rose-900 xs:w-[100px] xs:mx-auto xs:text-[10px] w-[150px] mt-2 text-center pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
					>
						Products
					</NavLink>
				</div>
			</div>
			<div className='p-10 w-full h-screen overflow-scroll pt-2'>
				{user.id !== '' && (
					<h1 className='text-right mx-auto'>{`Welcome ${user.username}`}</h1>
				)}
				<Outlet />
			</div>
		</div>
	);
}
export default Admin;
