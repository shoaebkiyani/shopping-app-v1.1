import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';
// import { getTokenFromStorage } from '../../token/token'
import Category from '../../components/pages/Category/CategoryItem';
import { getTokenFromStorage } from '../../token/token';

export type Category = {
	id: string;
	name: string;
};

export interface categoryState {
	categories: Category[];
	error: null | string;
	isLoading: boolean;
}

const initialState: categoryState = {
	categories: [],
	error: null,
	isLoading: false,
};

export const getCategory = createAsyncThunk(
	'category/fetchCategory',
	async (_, thunkAPI) => {
		try {
			const response = await api.get('/category');
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Error fetching categories');
		}
	}
);

export const addCategory = createAsyncThunk(
	'category/addCategory',
	async (category: Category, thunkAPI) => {
		try {
			const token = getTokenFromStorage();
			if (token) {
				const response = await api.post<Category>('/add-category', category, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.status === 200) {
					return response.data;
				}
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to add category');
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'category/deleteCategory',
	async (categoryId: string, thunkAPI) => {
		try {
			const token = getTokenFromStorage();
			const response = await api.delete(`/delete-category/${categoryId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			thunkAPI.rejectWithValue('Error deleting item');
		}
	}
);

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// Fetch categories
		builder.addCase(getCategory.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCategory.rejected, (state, action) => {
			state.isLoading = false;
			if (action.payload === 'string') state.error = action.payload;
		});
		builder.addCase(getCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categories = action.payload;
		});

		// Add category
		builder.addCase(addCategory.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(addCategory.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string')
				state.error = action.payload || 'Error';
		});
		builder.addCase(addCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			if (action.payload) {
				state.categories = [...state.categories, action.payload];
			}
		});

		// Delete category
		builder.addCase(deleteCategory.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteCategory.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string') state.error = action.payload;
		});
		builder.addCase(deleteCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categories = action.payload;
		});
	},
});

export default categorySlice.reducer;
