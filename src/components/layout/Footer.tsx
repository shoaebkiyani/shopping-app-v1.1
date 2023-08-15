import { NavLink } from 'react-router-dom';
import ShopName from './ShopName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
	return (
		<div className='max-w-[1100px] h-[200px] mx-auto shadow-2xl bg-gray-900 text-white container'>
			<div className='py-0'>
				<div className='flex justify-evenly items-center py-8 text-[20px]'>
					<NavLink to={'https://www.facebook.com/'} target={'_blank'}>
						<FontAwesomeIcon
							icon={faFacebook}
							className='transition ease-in-out text-amber-600 delay-150 hover:-translate-y-1 hover:scale-110 hover:text-rose-600 duration-300'
						/>
					</NavLink>
					<NavLink to={'https://www.instagram.com/'} target={'_blank'}>
						<FontAwesomeIcon
							icon={faInstagram}
							className='transition ease-in-out text-amber-600 delay-150 hover:-translate-y-1 hover:scale-110 hover:text-rose-600 duration-300'
						/>
					</NavLink>
					<NavLink to={'https://www.twitter.com/'} target={'_blank'}>
						<FontAwesomeIcon
							icon={faTwitter}
							className='transition ease-in-out text-amber-600 delay-150 hover:-translate-y-1 hover:scale-110 hover:text-rose-600 duration-300'
						/>
					</NavLink>
				</div>
				<div className='flex justify-center items-center'>
					<NavLink to='/'>
						<img src='../../src/assets/logo.svg' alt='' className='w-10 mr-2' />
					</NavLink>
					<NavLink to='/'>
						<ShopName first={'Tech'} last={'Zone'} />
					</NavLink>
					<p>Copyright &copy; 2023</p>
				</div>
			</div>
			<div className='flex justify-evenly items-end h-12'>
				<NavLink to='about' className={'hover:underline'}>
					About
				</NavLink>
				<NavLink to='privacy-policy' className={'hover:underline'}>
					Privacy Policy
				</NavLink>
				<NavLink to='Licensing' className={'hover:underline'}>
					Licensing
				</NavLink>
				<NavLink to='contact' className={'hover:underline'}>
					Contact
				</NavLink>
			</div>
		</div>
	);
}
export default Footer;
