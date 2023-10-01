import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

import Spinner from '../../assets/spinner/spinner.gif';

import { getCategory } from '../../features/category/categorySlice';
import ImageSlider from '../layout/ImageSlider';
import Featured from '../layout/Featured';
import ShipmentIcons from '../layout/ShipmentIcons';
import ProductList from './Products/ProductList';

function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(getCategory());
		const onPageLoad = () => {
			setIsLoading(false);
		};
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad);
			// Remove the event listener when component unmounts
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, [dispatch]);

	return (
		<>
			{isLoading ? (
				<div className='w-full h-screen flex justify-center items-center'>
					<span className='text-white text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			) : (
				<>
					<ImageSlider />
					<ProductList />
					<Featured />
					<ShipmentIcons />
				</>
			)}
		</>
	);
}
export default Home;
