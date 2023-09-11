import { useEffect, useState } from 'react';

import Spinner from '../../../../assets/spinner/spinner.gif';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';

import {
	getProducts,
	sortByPriceHighToLow,
	sortByPriceLowToHigh,
} from '../../../../features/products/ProductSlice';
import { Product } from '../../../../features/products/ProductSlice';

import { Link, NavLink, Outlet } from 'react-router-dom';

import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { logoutUser } from '../../../../features/auth/userSlice';

import Checkbox from '../../../CheckBox';

function ProductsList() {
	const { products, isLoading } = useSelector(
		(state: RootState) => state.products
	);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (products.length === 0 || localStorage.getItem('token')) {
			dispatch(getProducts());
		} else {
			dispatch(logoutUser());
		}
	}, [dispatch, products.length]);

	const options = {
		relevance: 'Relevance',
		lowToHigh: 'Price low to high',
		highToLow: 'Price high to low',
	};

	const [sortOption, setSortOption] = useState<string>('Relevance');

	const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (products.length > 0) {
			const selectedOption = e.target.value;
			setSortOption(selectedOption);
			if (selectedOption === options.relevance) {
				dispatch(getProducts());
			}

			if (selectedOption === options.lowToHigh) {
				dispatch(sortByPriceLowToHigh());
			}
			if (selectedOption === options.highToLow) {
				dispatch(sortByPriceHighToLow());
			}
		}
	};

	const [isInStock, setIsInStock] = useState(false);
	const [isOutOfStock, setIsOutOfStock] = useState(false);

	const [productsInStock, setProductsInStock] = useState<Product[]>([]);
	const [productsOutOfStock, setProductsOutOfStock] = useState<Product[]>([]);

	const handleChangeInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isOutOfStock === true) setIsOutOfStock(!e.target.checked);
		setIsInStock(e.target.checked);

		if (!isInStock) {
			const inStockProducts = products.filter((products) => products.inStock);
			setProductsInStock(inStockProducts);
		} else {
			setProductsInStock([]);
		}
	};

	const handleChangeOutOfStock = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isInStock === true) setIsInStock(!e.target.checked);
		setIsOutOfStock(e.target.checked);

		if (!isOutOfStock) {
			const outOfStockProducts = products.filter(
				(products) => !products.inStock
			);
			setProductsOutOfStock(outOfStockProducts);
		} else {
			setProductsOutOfStock([]);
		}
	};

	return (
		<div className='mt-10'>
			<Outlet />
			<p className='font-medium uppercase opacity-80'>Product List</p>
			<div className='mt-5'>
				<NavLink to='add-product'>
					<button className='bg-rose-700 p-2 xs:text-xs text-white rounded-sm mb-2'>
						Add a new Product
					</button>
				</NavLink>
			</div>
			{isLoading && (
				<div className='w-full h-screen flex justify-center items-center'>
					<span className='text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			)}
			<div className='flex xs:flex-col justify-end items-center'>
				<div className='xs:w-full'>
					<Checkbox
						handleChange={handleChangeInStock}
						isChecked={isInStock}
						label='In stock'
					/>
				</div>
				<div className='xs:w-full'>
					<Checkbox
						handleChange={handleChangeOutOfStock}
						isChecked={isOutOfStock}
						label='Out of stock'
					/>
				</div>
				<select
					className='border border-black rounded-xl p-2 cursor-pointer xs:w-full xs:text-sm text-center'
					onChange={handleSort}
					value={sortOption}
				>
					<option className='cursor-pointer' value={sortOption}>
						Sort by: {sortOption}
					</option>
					<option className='cursor-pointer' value={options.relevance}>
						Relevance
					</option>
					<option className='cursor-pointer' value={options.lowToHigh}>
						Price low to high
					</option>
					<option value={options.highToLow}>Price high to low</option>
				</select>
			</div>
			{products && (
				<div className='relative flex flex-col xs:max-w-[300px] min-w-full overflow-hidden'>
					<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
							<div className='overflow-hidden'>
								<table className='min-w-full text-left xs:text-[10px] text-sm font-light border border-black'>
									<thead className='border-b font-medium dark:border-neutral-500 bg-gray-950 text-white'>
										<tr>
											<th scope='col' className='xs:px-2 px-4 py-4 xs:hidden'>
												#
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Image
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Title
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Price
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Quantity
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Description
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												In Stock
											</th>
											<th scope='col' className='xs:px-2 px-4 py-4'>
												Edit / Delete
											</th>
										</tr>
									</thead>
									<tbody>
										{isInStock
											? productsInStock.map(
                            (product: Product, index: number) => (
                              <tr
                                className='border-b dark:border-neutral-500'
                                key={product.id}
                              >
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4 font-medium xs:hidden'>
                                  {index + 1}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                  <img
                                    src={product.imageURL}
                                    alt='productImage'
                                    className='h-10 w-10 xs:h-8 rounded-full'
                                  />
                                  </td>
                                  <td
                                  className='whitespace-nowrap xs:px-2 px-4 py-4'
                                  key={product.id}
                                  >
                                  {product.title}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                  {`${product.price}€`}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                  {product.quantity}
                                  </td>
                                  <td className='whitespace-wrap xs:px-2 px-4 py-4 max-w-[50px]'>
                                  {product.description}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                  {product.inStock ? (
                                    <p>Available</p>
                                  ) : (
                                    <p>Out of Stock</p>
                                  )}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    <div className='flex justify-evenly items-center'>
                                      <Link
                                        to={`edit-product/${product.id}`}
                                        className='text-green-700'
                                      >
                                        <BiEdit size={20} />
                                      </Link>
                                      <Link
                                        to={`delete-product/${product.id}`}
                                        className='text-red-700'
                                      >
                                        <RiDeleteBin6Line size={20} />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )
                          : isOutOfStock
                          ? productsOutOfStock.map(
                              (product: Product, index: number) => (
                                <tr
                                  className='border-b dark:border-neutral-500'
                                 key={product.id}
                                >
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4 font-medium xs:hidden'>
                                  {index + 1}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    <img
                                      src={product.imageURL}
                                      alt='productImage'
                                      className='h-10 w-10 xs:h-8 rounded-full'
                                    />
                                  </td>
                                  <td
                                    className='whitespace-nowrap xs:px-2 px-4 py-4'
                                    key={product.id}
                                  >
                                    {product.title}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    {`${product.price}€`}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    {product.quantity}
                                  </td>
                                  <td className='whitespace-wrap xs:px-2  px-4 py-4 max-w-[50px]'>
                                    {product.description}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    {product.inStock ? (
                                      <p>Available</p>
                                    ) : (
                                      <p>Out of Stock</p>
                                    )}
                                  </td>
                                  <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                    <div className='flex justify-evenly items-center'>
                                      <Link
                                        to={`edit-product/${product.id}`}
                                        className='text-green-700'
                                      >
                                        <BiEdit size={20} />
                                      </Link>
                                      <Link
                                        to={`delete-product/${product.id}`}
                                        className='text-red-700'
                                      >
                                        <RiDeleteBin6Line size={20} />
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )
											: products.map((product: Product, index: number) => (
                            <tr
                              className='border-b dark:border-neutral-500'
                              key={product.id}
                            >
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4 font-medium xs:hidden'>
                                {index + 1}
                              </td>
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                <img
                                  src={product.imageURL}
                                  alt='productImage'
                                  className='h-10 w-10 xs:h-8 rounded-full'
                                />
                              </td>
                              <td
                                className='whitespace-nowrap xs:px-2 px-4 py-4'
                                key={product.id}
                              >
                                {product.title}
                              </td>
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                {`${product.price}€`}
                              </td>
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                {product.quantity}
                              </td>
                              <td className='whitespace-wrap xs:px-2 px-4 py-4 max-w-[50px]'>
                                {product.description}
                              </td>
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                {product.inStock ? (
                                  <p>Available</p>
                                ) : (
                                  <p>Out of Stock</p>
                                )}
                              </td>
                              <td className='whitespace-nowrap xs:px-2 px-4 py-4'>
                                <div className='flex justify-evenly items-center'>
                                  <Link
                                    to={`edit-product/${product.id}`}
                                    className='text-green-700'
                                  >
                                    <BiEdit size={20} />
                                  </Link>
                                  <Link
                                    to={`delete-product/${product.id}`}
                                    className='text-red-700'
                                  >
                                    <RiDeleteBin6Line size={20} />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
									</tbody>
								</table>
								{products.length < 1 && (
									<p className='text-sm font-medium mx-auto border border-black border-t-0 mt-0 p-4 text-center'>
										Currently no product item is in the list.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default ProductsList;
