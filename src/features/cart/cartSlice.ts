import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../api/axiosConfig'
import { Product } from '../products/ProductSlice';

export interface cartItem {
    cartItemId: string,
    quantity: number,
    totalPrice: number,
    createdAt: Date,
    product: Product
}

export interface Cart {
    cartId: string,
    cartItems: cartItem[],
}

interface cartState {
    cart: Cart,
    isLoading: boolean,
    error: string | null 
}

const initialState: cartState = {
    cart: {
        cartId: '',
        cartItems: [],
    },
    isLoading: false,
    error: null
}

export const getCart = createAsyncThunk(
    'cart/fetchAll',
    async(_, thunkApi) => {
        try {
            const response = await api.get(`/cart`);
            const cartObj = response.data;
            return cartObj[0];        
        } catch (error) {
            console.log(thunkApi.rejectWithValue(error))
        }
    }
)

export const createCart = createAsyncThunk(
    'cart/create',
    async(_, thunkApi) => {
        try {
            const response = await api.post('/cart/create-cart');
            return response.data
        } catch (error) {
            console.log(thunkApi.rejectWithValue(error))
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/add', async(cartInfo: { id: string, quantity: number}, thunkApi) => {
        try {
            const response = await api.post(`/cart/add-to-cart/${cartInfo.id}`, cartInfo)

            return response.data;
            
        } catch (error) {
            console.log(thunkApi.rejectWithValue(error))
        }
    }
)

export const deleteItem = createAsyncThunk(
    'cart/delete', async(itemId: string, thunkApi) => {
        try {
            const response = await api.delete<cartItem[]>(`/cart/delete-item/${itemId}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue("Unable to delete the current item");
        }
    }
)

export const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createCart.pending, (state) => {
			state.isLoading = true;
		});
        builder.addCase(createCart.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string')
				state.error = action.payload || 'Error';
		});
        builder.addCase(createCart.fulfilled, (state) => {
			state.isLoading = false;
		});

        // Fetch cart items
        builder.addCase(getCart.pending, (state) => {
			state.isLoading = true;
		});
        builder.addCase(getCart.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string')
				state.error = action.payload || 'Error';
		});
        builder.addCase(getCart.fulfilled, (state, action) => {
			state.isLoading = false;
            if(action.payload) {
                state.cart = action.payload
            }
		}); 
        
        // Add Item to cart
        builder.addCase(addToCart.pending, (state) => {
			state.isLoading = true;
		});
        builder.addCase(addToCart.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string')
				state.error = action.payload || 'Error';
		});
        builder.addCase(addToCart.fulfilled, (state, action) => {
			state.isLoading = false;
            if(action.payload) {
                state.cart.cartItems.push(action.payload)
            }
		});
        
        // Delete item from cart
        builder.addCase(deleteItem.rejected, (state, action) => {
            state.isLoading = false;
            if(typeof action.payload === 'string') {
                state.error = action.payload
            }
        })
        builder.addCase(deleteItem.fulfilled, (state, action) => {
			state.isLoading = false;
            state.cart.cartItems = action.payload
		});

    }
})

export default cartSlice.reducer