import { useEffect, useState } from 'react';

import Featured from '../layout/Featured';
import ImageSlider from '../layout/ImageSlider';

import ShipmentIcons from '../layout/ShipmentIcons';

import Spinner from '../../../public/spinner/spinner.gif';

function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='w-full h-screen flex  justify-center items-center'>
					<span className='text-white text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			) : (
				<>
					<ImageSlider />
					<Featured />
					<ShipmentIcons />
				</>
			)}
		</>
	);
}
export default Home;
