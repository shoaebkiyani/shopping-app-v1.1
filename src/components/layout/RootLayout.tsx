import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

function RootLayout() {
	return (
		<div className='root'>
			<Navbar />
			<main className='h-wrapper pt-14 min-h-[calc(100vh-200px)]'>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
export default RootLayout;
