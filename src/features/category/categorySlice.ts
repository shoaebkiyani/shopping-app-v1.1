import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/axiosConfig'
// import { getTokenFromStorage } from '../../token/token'
import Category from '../../components/pages/Category/CategoryItem'

export type Category = {
    id: string,
    name: string
}

export interface categoryState {
    categories: Category[],
    isError: null | string,
    isLoading: boolean
}

const initialState: categoryState = {
    categories: [],
    isError: null,
    isLoading: false
}

export const getCategory = createAsyncThunk(
    'category/fetchCategory', async() => {
        try {
            const response = await api.get('/category')
            return response.data
        } catch (error) {
            console.log(error)
        }
    })

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getCategory.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategory.rejected, (state, action) => {
            state.isLoading = false
            if(action.payload === 'string')
            state.isError = action.payload
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
    }

})

export default categorySlice.reducer