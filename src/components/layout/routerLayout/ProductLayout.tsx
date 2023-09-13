import { Outlet } from 'react-router-dom';

import ProductsList from '../../pages/Admin/products/ProductsList';
import AddProduct from '../../pages/Admin/products/AddProduct';

function ProductLayout() {
	return (
		<div>
			<ProductsList />
			<AddProduct />
			<Outlet />
		</div>
	);
}
export default ProductLayout;
