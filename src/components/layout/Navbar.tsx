import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill, BsPeople } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiSmartphone, FiLogIn, FiHome, FiLogOut } from 'react-icons/fi';
import { SiGnuprivacyguard } from 'react-icons/si';
import ShopName from './ShopName';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../../features/auth/userSlice';
import { AppDispatch, RootState } from '../../app/store';

function Navbar() {
	const [navState, setNavState] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.user);

	const onLogout = () => {
		dispatch(logoutUser());
		dispatch(reset());
		navigate('/');
	};

	return (
		<nav className='fixed z-10 right-0 left-0 w-full mx-auto flex justify-center align-middle p-4 h-14 bg-gradient-to-b from-red-900 to-slate-900 xs:text-sm'>
			{/* Left side */}
			<div className='flex justify-between items-center xs:space-x-3 sm:space-x-5 md:space-x-8 lg:space-x-16'>
				<div className='flex items-center text-white'>
					<NavLink to='/'>
						<img
							src={logo}
							alt='logo'
							className='cursor-pointer h-8 w-8 mx-2'
						/>
					</NavLink>
					<NavLink to='/'>
						<div className='cursor-pointer xs:hidden'>
							<ShopName first={'Tech'} last={'Zone'} />
						</div>
					</NavLink>
				</div>

				{/* Search Input */}
				<div className='px-3 xs:w-[130px] sm:w-[280px] lg:w-[400px] flex rounded-full items-center  bg-gray-300'>
					<AiOutlineSearch size={20} />
					<input
						className='w-full focus:outline-none p-2 bg-transparent'
						type='text'
						placeholder='Search'
					/>
				</div>

				{/* Cart */}
				<button className='text-white md:flex items-center rounded-full flex'>
					<BsFillCartFill size={20} className='mr-2' />
				</button>

				{user.username || localStorage.getItem('token') ? (
					<NavLink to='/' onClick={onLogout}>
						<div className='flex items-center text-white'>
							<FiLogOut size={15} className='mr-2 cursor-pointer' />
							<span className='mt-[-3px]'>Logout</span>
						</div>
					</NavLink>
				) : (
					<div className='xs:hidden sm:hidden md:visible flex items-center justify-between'>
						<NavLink to='login'>
							<li className='text-sm flex items-center text-white cursor-pointer'>
								<FiLogIn size={15} className='mr-2 cursor-pointer' />
								<span className='mt-[-3px]'>Login</span>
							</li>
						</NavLink>
					</div>
				)}

				{/* Menu Bars */}
				<div
					onClick={() => setNavState(!navState)}
					className='cursor-pointer text-white'
				>
					<AiOutlineMenu size={30} />
				</div>
			</div>

			{/* Mobile Menu */}
			{/* Overlay */}
			{navState ? (
				<div
					onClick={() => setNavState(!navState)}
					className='bg-black/80 fixed w-full h-screen z-10 top-0 right-0'
				></div>
			) : (
				''
			)}

			{/* Side Drawer Menu */}
			<div
				className={
					navState
						? 'fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300'
						: 'fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
				}
			>
				<AiOutlineClose
					size={30}
					onClick={() => setNavState(!navState)}
					className='absolute left-4 top-4 cursor-pointer'
				/>
				<nav>
					<ul className='flex flex-col mt-14 mx-8 p-4 text-gray-800'>
						<NavLink to='/'>
							<li
								className='text-xl py-4 flex cursor-pointer'
								onClick={() => setNavState(!navState)}
							>
								<FiHome size={25} className='mr-4 cursor-pointer' /> Home{' '}
							</li>
						</NavLink>
						<NavLink to='about' onClick={() => setNavState(!navState)}>
							<li className='text-xl py-4 flex cursor-pointer'>
								<BsPeople size={25} className='mr-4 cursor-pointer' /> About{' '}
							</li>
						</NavLink>
						<NavLink to='mobile-phones'>
							<li className='text-xl py-4 flex cursor-pointer'>
								<FiSmartphone size={25} className='mr-4 cursor-pointer' />{' '}
								Mobile Phones
							</li>
						</NavLink>
						<NavLink to='orders' onClick={() => setNavState(!navState)}>
							<li className='text-xl py-4 flex cursor-pointer'>
								<TbTruckDelivery size={25} className='mr-4 cursor-pointer' />{' '}
								Orders
							</li>
						</NavLink>
						<NavLink to='login' onClick={() => setNavState(!navState)}>
							<li className='md:hidden text-xl py-4 flex cursor-pointer'>
								<FiLogIn size={25} className='mr-4 cursor-pointer' />
								Login
							</li>
						</NavLink>
						<NavLink to='register' onClick={() => setNavState(!navState)}>
							<li className='text-xl py-4 flex cursor-pointer'>
								<SiGnuprivacyguard size={25} className='mr-4 cursor-pointer' />
								Register
							</li>
						</NavLink>
					</ul>
				</nav>
			</div>
		</nav>
	);
}
export default Navbar;
