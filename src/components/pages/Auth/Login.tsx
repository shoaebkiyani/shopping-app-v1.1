import { NavLink } from 'react-router-dom';
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../../../features/auth/userSlice';
import {useState, useEffect} from 'react';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md'
import { AppDispatch, RootState } from '../../../app/store';


function Login() {
    
    const [showPassowrd, setShowPassword] = useState(false)
    const [formData, setFormData] = useState ({
        username: '',
        password: ''
    })
    
    interface formData {
        username: string;
        password: string;
    }

    const {username, password} = formData;

    const { user, isSuccess, isLogged, isError, message } = useSelector(
		(state: RootState) => state.user
	);
    const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

    useEffect(() => {
		if (isError) {
			toast.error('Server not responded');
		}
		
        // Redirect when logged in
		if (isSuccess) {
            toast.success('Loggedin Successfully', {autoClose: 1500})
            if(user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/user')
            }
		}

		dispatch(reset());
	}, [isError, isSuccess, isLogged, user, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value
            }))
    }

    const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const userData = {
			username,
			password,
		};
		dispatch(loginUser(userData));
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
                                className='textInput text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
                                type='text'
                                placeholder='Email Address'
                                id='username'
                                value={username}
                                onChange={onChange}
                            />
                        </div>
                        <div className='passwordInputDiv flex items-center'>
                            <input
                                className='passwordInput text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
                                type={showPassowrd ? 'text' : 'password'}
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={onChange}
                            />
                            <div className='ml-[-24px] mt-4 cursor-pointer'>
                                {showPassowrd ? 
                                <MdVisibility onClick={() => setShowPassword((prevState) => !prevState)} />
                                :
                                <MdVisibilityOff onClick={() => setShowPassword((prevState) => !prevState)} />
                            }
                            </div>
                        </div>
                        <div className='mt-4 flex justify-between font-semibold text-sm'>
                            <label className='flex text-slate-500 hover:text-slate-600 cursor-pointer'>
                                <input className='mr-1' type='checkbox' />
                                <span>Remember Me</span>
                            </label>
                            <NavLink to = '/'
                                className='forgotPasswordLink text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4'
                                >
                                Forgot Password?
                            </NavLink>
                        </div>
                        <div className='text-center md:text-left'>
                            <button
                                className='signInButton mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'
                                type='submit'
                            >
                                Login
                            </button>
                        </div>
                        <div className='flex mt-4 font-semibold text-sm text-slate-500 justify-center md:justify-start'>
                            Don't have an account?
                            <div className='text-red-600 hover:underline hover:underline-offset-4 ml-2'>
                                <NavLink to='/register'>Register</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
	);
}
export default Login;
