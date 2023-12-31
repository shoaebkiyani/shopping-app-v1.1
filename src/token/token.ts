import jwt_decode from 'jwt-decode';

import { isDecodedUser } from '../type-guards/type-guards';
import { User } from '../features/auth/userSlice';

export function getDecodedTokenFromStorage() {
	const token = localStorage.getItem('token');

	if (token) {
		const tokenTime = JSON.parse(atob(token.split('.')[1]));
		const tokenIsvalid = tokenTime.exp * 1000 < Date.now();

		if (tokenIsvalid) {
			localStorage.removeItem('token');
		}
	}

	if (!token) return null;

	try {
		const decodedUser = jwt_decode(token);

		if (!isDecodedUser(decodedUser)) return null;

		const user: User = {
			username: decodedUser.username,
			id: decodedUser.user_id,
			role: decodedUser.role,
		};

		return user;
	} catch (error) {
		console.log('Error loading user');
	}
}

export function getTokenFromStorage() {
	const token = localStorage.getItem('token');
	if (!token) return null;

	return token.slice(1, -1) as string;
}
