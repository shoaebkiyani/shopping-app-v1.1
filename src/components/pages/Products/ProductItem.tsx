import { Link } from 'react-router-dom';
import { Product } from '../../../features/products/ProductSlice';

function ProductItem(product: Product) {
	return (
		<>
			<div>
				<div className='flex flex-col justify-start items-center w-96 h-96 m-3 xs:w-72 xs:h-72'>
					<Link
						to={`product/${product.id}`}
						className='relative mt-3 h-full rounded-xl'
					>
						<img
							className='object-cover bg-transparent h-64 w-full xs:h-44'
							src={product.imageURL}
							alt='product'
						/>
						<span className='absolute top-0 left-0 m-2 rounded-full bg-gray-800 px-2 text-sm font-medium text-white'>
							39% OFF
						</span>
					</Link>
					<div className='flex flex-col justify-evenly items-center mt-4 px-5'>
						<Link to={`product/${product.id}`}>
							<h5 className='text-xl xs:text-[14px] tracking-tight whitespace-nowrap'>
								{product.title}
							</h5>
						</Link>
						<div>
							<div className='flex items-center justify-center mb-2'>
								<svg
									aria-hidden='true'
									className='h-4 w-4 text-yellow-300'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
								</svg>
								<svg
									aria-hidden='true'
									className='h-4 w-4 text-yellow-300'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
								</svg>
								<svg
									aria-hidden='true'
									className='h-4 w-4 text-yellow-300'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
								</svg>
								<svg
									aria-hidden='true'
									className='h-4 w-4 text-yellow-300'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
								</svg>
								<svg
									aria-hidden='true'
									className='h-4 w-4 text-yellow-300'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
								</svg>
								<span className='mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold'>
									5.0
								</span>
							</div>
						</div>
						<div className=''>
							<span className='text-3xl xs:text-lg font-bold'>{`${product.price}€`}</span>
							<span className='text-sm line-through'>$699</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default ProductItem;
