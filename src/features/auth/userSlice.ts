import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import api, { authHeader } from '../../api/axiosConfig'
import jwt_decode from 'jwt-decode'
import { getDecodedTokenFromStorage } from '../../token/token'

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface UserState {
    user: User,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

export type DecodedUser = {
    user_id: string
    username: string
    role: Role
}

export type User = {
    id: string
    username: string
    role: Role
}

const initialState: UserState = {
    user: {id: '', username: '', role: Role.USER},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const registerUser = createAsyncThunk(
    'user/signup', async(user:{username: string, password: string}, thunkAPI) => {
        try {
            const response = await api.post('/register', user)
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data            
        } catch (error: unknown) {
            if(isAxiosError<UserState>(error)){
                return thunkAPI.rejectWithValue(error.response?.data.message)
            } else {
                 return thunkAPI.rejectWithValue(error)
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/signin', async(user:{username: string, password: string}, thunkAPI) => {
        try {
            const response = await api.post('/login', user)
            if(response.data) {
                // localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('token', JSON.stringify(response.data.token))
            }
            return {
                token: response.data.token
            }            
        } catch (error: unknown) {
            if(isAxiosError<UserState>(error)){
                return thunkAPI.rejectWithValue(error.response?.data.message)
            } else {
                 return thunkAPI.rejectWithValue(error)
            }
        }
    }
)

export const getUsers = createAsyncThunk(
    'user/getUsers', async(token) => {
        try {
            const response = await api.get('/users', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                }
            })
            console.log('res: ', response, 'header: ', authHeader)
        } catch (error) {
            console.log(error)
            
        }
    })

export const logoutUser = createAsyncThunk(
     'user/logout', () => {
        return localStorage.removeItem('token')
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        loadUserFromStorage: (state) => {
            const user = getDecodedTokenFromStorage()
            if(user) {
                state.user = user
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if(typeof action.payload === 'string'){
                state.message = action.payload
            }
            state.user.id = ''
            state.user.username = '' 
          })
          builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          
          builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if(typeof action.payload === 'string'){
                state.message = action.payload
            }
            state.user.id = ''
            state.user.username = '' 
          })
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            const token = action.payload.token
            const decodedUser = jwt_decode(token) as DecodedUser
                const user: User = {
                    username: decodedUser.username,
                    id: decodedUser.user_id,
                    role: decodedUser.role
                }
                state.user = user
          
          })

          builder.addCase(getUsers.fulfilled, (state) => {
            state.isLoading = false,
            state.isSuccess = true
          
          })

          builder.addCase(logoutUser.fulfilled, (state) => {
            const user: User = {
                username: '',
                id: '',
                role: Role.USER
            }
            state.user = user
          })
    }
})

export const {reset, loadUserFromStorage} = userSlice.actions;
export default userSlice.reducer
