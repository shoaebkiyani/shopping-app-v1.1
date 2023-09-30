import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';

import logo from '../../assets/logo.svg';
import ShopName from './ShopName';
import { logoutUser, reset } from '../../features/auth/userSlice';

import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { BiCart, BiUserCircle } from 'react-icons/bi';
import { FiLogIn, FiHome, FiLogOut } from 'react-icons/fi';
import { SiGnuprivacyguard } from 'react-icons/si';
import { getCart } from '../../features/cart/cartSlice';

function Navbar() {
	const [navState, setNavState] = useState(false);
	const [showProfile, setShowProfile] = useState(false);

	const navigate = useNavigate();

	const { user } = useSelector((state: RootState) => state.user);
	const {cartItems} = useSelector((state: RootState) => state.cart.cart)

	const dispatch = useDispatch<AppDispatch>();

	const token = localStorage.getItem('token');

	const onLogout = () => {
		dispatch(logoutUser());
		dispatch(reset());
		navigate('/');
	};

	const handleUser = () => {
		setShowProfile(!showProfile);
	};

	useEffect(()=>{
		dispatch(getCart());
	},[dispatch])

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
				{/* Nav menu */}
				<ul className='flex justify-end items-center'>
					<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
						<NavLink to='about'>About</NavLink>
					</li>
					<li>
						{user.username || token ? (
							<div className='flex justify-center items-center xs:px-2 px-4 xs:visible sm:visible'>
								<div className='flex items-center justify-center'>
									<button
										onClick={handleUser}
										className='flex relative justify-center'
									>
										<BiUserCircle size={25} className='mr-6' />
										{showProfile ? (
											<ul className='absolute mt-[41px] flex flex-col justify-center w-[200px] bg-gray-900 '>
												<li>
													{user.role === 'ADMIN' ? (
														<ul>
															<li className='py-2 hover:bg-yellow-700'>
																<NavLink to='/admin'>Admin Dashboard</NavLink>
															</li>
														</ul>
													) : (
														<ul>
															<li className='px-0 py-2 hover:bg-yellow-700'>
																<NavLink to='/user'>Profile</NavLink>
															</li>
														</ul>
													)}
												</li>
												<li className='border border-dotted border-white'></li>
												<li className='py-2 hover:bg-yellow-700'>
													<ul className='flex justify-center items-center text-white'>
														<li>
															<FiLogOut
																size={15}
																className='mr-1 cursor-pointer'
															/>
														</li>
														<li>
															<NavLink to='/' onClick={onLogout}>
																<p>Logout</p>
															</NavLink>
														</li>
													</ul>
												</li>
												<li className='border border-white'></li>
											</ul>
										) : (
											<div></div>
										)}
									</button>
								</div>
							</div>
						) : (
							<ul className='flex'>
								<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
									<NavLink to='login'>Login</NavLink>
								</li>
								<li className='px-4 py-2 hover:bg-yellow-700 xs:hidden sm:hidden'>
									<NavLink to='register'>Register</NavLink>
								</li>
							</ul>
						)}
					</li>
					{/* Cart */}
					<Link to = '/cart' className='text-white '>
						<div className='bg-amber-800 rounded-full'>
							<p className='absolute mt-[-12px] ml-2 bg-gray-100 rounded-full text-xs text-black h-4 w-4 text-center'>{cartItems && cartItems.length}</p>
						</div>
						<BiCart size={22} className='mr-2' />
					</Link>
				</ul>

				{/* Menu Bars */}
				<div
					onClick={() => setNavState(!navState)}
					className='cursor-pointer text-white md:hidden'
				>
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
							<li className='text-xl py-4 flex cursor-pointer'
								onClick={() => setNavState(!navState)}
							>
							<NavLink to ='/' className='flex'>
								<FiHome size={25} className='mr-4 cursor-pointer' /> Home
							</NavLink>
							</li>
							<li className='text-xl py-4 flex cursor-pointer'
							onClick={() => setNavState(!navState)}
							>
								<NavLink
									to='about'
									className='flex'
								>
								<BsPeople size={25} className='mr-4 cursor-pointer' /> About

								</NavLink>
							</li>
							{!user.username || !token ? (
								<ul>
									<li className='text-xl py-4 flex cursor-pointer'>
										<FiLogIn size={25} className='mr-4 cursor-pointer' />
										<NavLink to='login' onClick={() => setNavState(!navState)}>
											Login
										</NavLink>
									</li>
									<li className='text-xl py-4 flex cursor-pointer'>
										<SiGnuprivacyguard
											size={25}
											className='mr-4 cursor-pointer'
										/>
										<NavLink
											to='register'
											onClick={() => setNavState(!navState)}
										>
											Register
										</NavLink>
									</li>
								</ul>
							) : (
								<ul>
									<li></li>
								</ul>
							)}
						</ul>
					</nav>
				</div>
			</nav>
		</div>
	);
}
export default Navbar;
