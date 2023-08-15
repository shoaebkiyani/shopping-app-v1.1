import { NavLink } from "react-router-dom";

function Register() {
	return <section className='h-[90vh] md:h-[56vh] flex justify-center items-center'>
    <div className='flex flex-col md:flex-row md:justify-center items-center space-y-10 md:space-y-10 md:space-x-16 my-0 mx-5 md:mx-0 md:my-0 p-4'>
        <div className='md:w-1/3 max-w-sm'>
            <img
                src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                alt='Sample image'
            />
        </div>
        <div className='md:w-1/3 max-w-sm'>
            <input
                className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
                type='text'
                placeholder='Username'
            />
            <input
                className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
                type='password'
                placeholder='Password'
            />
            <div className='text-center md:text-left'>
                <button
                    className='mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'
                    type='submit'
                >
                    Register
                </button>
            </div>
            <div className='flex mt-4 font-semibold text-sm text-slate-500 justify-center md:justify-start'>
                Already have an account?
                <div className='text-rose-600 hover:underline hover:underline-offset-4 ml-2'>
                    <NavLink to='/login'>Login</NavLink>
                </div>
            </div>
        </div>
    </div>
</section>
}
export default Register;
