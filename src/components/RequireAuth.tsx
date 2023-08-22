import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { RootState } from '../app/store';


function RequireAuth() {

    const { user } = useSelector(
		(state: RootState) => state.user
	);
    // const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
  return (
        user.username !== '' || localStorage.getItem('token') ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}
export default RequireAuth