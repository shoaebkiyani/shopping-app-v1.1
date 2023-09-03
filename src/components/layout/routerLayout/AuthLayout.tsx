import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

function RequireAuth() {
	const { user } = useSelector((state: RootState) => state.user);

	const token = localStorage.getItem('token');
	if(token) {
		const tokenTime = JSON.parse(atob(token.split('.')[1]))
		const tokenIsExpired = tokenTime.exp * 1000 < Date.now();
	
		if(tokenIsExpired) {
			localStorage.removeItem('token')
		}
	}
	
	const location = useLocation();
			
	return user.username !== '' || token ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);

}
export default RequireAuth;
