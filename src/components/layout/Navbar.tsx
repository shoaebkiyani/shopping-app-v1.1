import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiSmartphone, FiLogIn, FiHome, FiLogOut } from 'react-icons/fi';
import { SiGnuprivacyguard } from 'react-icons/si';
import ShopName from './ShopName';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../../features/auth/userSlice';
import { AppDispatch, RootState } from '../../app/store';
import { BiCart, BiUserCircle } from 'react-icons/bi';

function Navbar() {
	const [navState, setNavState] = useState(false);
	const [showProfile, setShowProfile] = useState(false)

	const navigate = useNavigate();
	
	const { user } = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch<AppDispatch>();

	const token = localStorage.getItem('token');

	const onLogout = () => {
		dispatch(logoutUser());
		dispatch(reset());
		navigate('/');
	};

	const handleUser = () => {
		setShowProfile(!showProfile)
	}

	return (
		<div className='fixed z-10 w-full h-14 bg-gradient-to-b from-red-900 to-slate-900 xs:text-sm text-white'>
			<nav className='flex justify-between items-center h-14 px-8 xs:px-4 xs:space-x-3 max-w-[1300px] mx-auto'>
				{/* Left side */}
				<div className='flex justify-center items-center text-white'>
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
				<div className='flex flex-shrink justify-center items-center px-2 rounded-sm bg-zinc-300 text-black'>
					<input
						className='w-full focus:outline-none p-1 bg-transparent'
						type='text'
						placeholder='Search product'
					/>
					<button className='cursor-pointer'>
						<AiOutlineSearch size={20} />
					</button>
				</div>
				{/* Nav menu */}
				<ul className='flex justify-end items-center'>
					<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
						<NavLink to='/'>
							Home
						</NavLink>
					</li>
					<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
						<NavLink to='about'>
							About
						</NavLink>
					</li>
					{
						user.username || token ? (
							<div className='flex justify-center items-center px-4 xs:visible sm:visible'>
								<div className='flex items-center justify-center'>
									<button onClick={handleUser} className='flex relative justify-center'>
										<BiUserCircle size={25} className='mr-6' />
										{showProfile ? <div className='bg-gray-900 mt-[41px] flex flex-col justify-center w-[200px] absolute border border-yellow-300'>
											{user.role === 'ADMIN' ? 
												<li className='py-2 hover:bg-yellow-700'>
													<NavLink to='/admin'>
														Admin Dashboard
													</NavLink>
												</li>
											:
											<li className='px-0 py-2 hover:bg-yellow-700'>
													<NavLink to='/user'>
														Profile
													</NavLink>
												</li>
										}
											<li className='border border-dotted border-white'></li>
											<li className='py-2 hover:bg-yellow-700'>
												<NavLink to='/' onClick={onLogout}>
													<li className='flex justify-center items-center text-white '>
														<FiLogOut size={15} className='mr-1 cursor-pointer' />
														<span className=''>Logout</span>
													</li>
												</NavLink>
											</li>
											<li className='border border-white'></li>
										</div> : <div></div>}
									</button>
								</div>
							</div>		
						) : (
							<div className='flex'>
								<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
								<NavLink to='login'>
									Login
								</NavLink>
								</li>
								<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
								<NavLink to='register'>
									Register
								</NavLink>
								</li>
							</div>		
						) 
					}
			{/* Cart */}
				<button className='text-white '>
					<BiCart size={22} className='mr-2' />
				</button>
				</ul>
			{/* Menu Bars */}
				<div onClick={() => setNavState(!navState)} className='cursor-pointer text-white md:hidden'>
					<AiOutlineMenu size={30} />
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
					className='absolute left-4 top-4 cursor-pointer text-black'
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
						{
							!user.username || !token ?
							<div>
							<NavLink to='login' onClick={() => setNavState(!navState)}>
								<li className='text-xl py-4 flex cursor-pointer'>
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
							</div>
							: ''
						}
					</ul>
				</nav>
			</div>
			</nav>
		</div>
	);
}
export default Navbar;
