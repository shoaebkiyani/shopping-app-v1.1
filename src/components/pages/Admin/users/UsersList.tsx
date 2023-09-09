import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';

import Spinner from '../../../../assets/spinner/spinner.gif';

import {
	deleteUser,
	getUsers,
	loadUserFromStorage,
} from '../../../../features/auth/userSlice';

function UsersList() {
	const { users, isLoading } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(loadUserFromStorage());
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div>
			{isLoading ? (
				<div className='w-full h-screen flex justify-center items-center'>
					<span className='text-center'>
						<img src={Spinner} alt='Loading...' />
					</span>
				</div>
			) : (
				<div className='flex flex-col'>
					<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
						<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
							<div className='overflow-hidden'>
								<table className='min-w-full text-left text-sm font-light'>
									<thead className='border-b font-medium dark:border-neutral-500'>
										<tr>
											<th scope='col' className='px-6 py-4'>
												#
											</th>
											<th scope='col' className='px-6 py-4'>
												Username
											</th>
											<th scope='col' className='px-6 py-4'>
												Role
											</th>
										</tr>
									</thead>
									<tbody>
										{users &&
											users.map(
												(
													user: { id: string; username: string; role: string },
													index
												) => (
													<tr
														className='border-b dark:border-neutral-500'
														key={user.id}
													>
														<td className='whitespace-nowrap px-6 py-4 font-medium'>
															{index + 1}
														</td>
														<td className='whitespace-nowrap px-6 py-4'>
															{user.username}
														</td>
														<td className='whitespace-nowrap px-6 py-4'>
															{user.role}
														</td>
														<td className='whitespace-nowrap px-6 py-4'>
															{user.role === 'USER' && (
																<button
																	onClick={() => dispatch(deleteUser(user.id))}
																	className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'
																>
																	Delete
																</button>
															)}
														</td>
													</tr>
												)
											)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default UsersList;
