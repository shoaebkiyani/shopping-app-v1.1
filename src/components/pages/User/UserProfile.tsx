import {useSelector, useDispatch} from 'react-redux'
import {getUsers, loadUserFromStorage} from '../../../features/auth/userSlice';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../../app/store';

function UserProfile() {

    const { user } = useSelector(
		(state: RootState) => state.user
	);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadUserFromStorage())
    },[])

  return (
    <div>
        <h2>Welcom {user.username}</h2>
        <button onClick={() => { user.role === 'USER' ? dispatch(getUsers()) : 'Error'}}>Users</button>
    </div>
  )
}
export default UserProfile