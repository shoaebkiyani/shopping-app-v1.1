import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { NavLink, useNavigate } from 'react-router-dom';

import { registerUser, reset } from '../../../features/auth/userSlice';

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { toast } from 'react-toastify';

function Register() {
	const [showPassowrd, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	interface formData {
		username: string;
		password: string;
	}

	const { username, password } = formData;

	const { user, isSuccess, isError, message } = useSelector(
		(state: RootState) => state.user
	);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const refTimer = useRef<number | null>(null);

	useEffect(() => {
		if (isError) {
			toast.error('Connection refused');
		}

		// Redirect when logged in
		if (isSuccess) {
			toast.success('Registered Successfully', { autoClose: 1500 });
			refTimer.current = window.setTimeout(() => {
				navigate('/');
			}, 2000);
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const userData = {
			username,
			password,
		};
		dispatch(registerUser(userData));
	};

	return (
		<>
			<section className='h-[90vh] md:h-[56vh] flex justify-center items-center'>
				<div className='flex flex-col md:flex-row md:justify-center items-center space-y-10 md:space-y-10 md:space-x-16 my-0 mx-5 md:mx-0 md:my-0 p-4'>
					<div className='md:w-1/3 max-w-sm'>
						<img
							src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
							alt='Sample image'
						/>
					</div>
					<form className='md:w-1/3 max-w-sm' onSubmit={onSubmit}>
						<div className='usernameInputDiv'>
							<input
								className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
								type='text'
								placeholder='Username'
								id='username'
								value={username}
								onChange={onChange}
								required
							/>
						</div>
						<div className='passwordInputDiv flex items-center'>
							<input
								className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
								type={showPassowrd ? 'text' : 'password'}
								placeholder='Password'
								id='password'
								value={password}
								onChange={onChange}
								required
							/>
							<div className='ml-[-24px] mt-4 cursor-pointer'>
								{showPassowrd ? (
									<MdVisibility
										onClick={() => setShowPassword((prevState) => !prevState)}
									/>
								) : (
									<MdVisibilityOff
										onClick={() => setShowPassword((prevState) => !prevState)}
									/>
								)}
							</div>
						</div>
						<div className='text-center md:text-left'>
							<button className='mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'>
								Register
							</button>
						</div>
						<div className='flex mt-4 font-semibold text-sm text-slate-500 justify-center md:justify-start'>
							Already have an account?
							<div className='text-rose-600 hover:underline hover:underline-offset-4 ml-2'>
								<NavLink to='/login'>Login</NavLink>
							</div>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
export default Register;
