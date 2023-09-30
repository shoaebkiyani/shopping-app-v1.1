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
    priceCal: number,
    isLoading: boolean,
    error: string | null 
}

const initialState: cartState = {
    cart: {
        cartId: '',
        cartItems: [],
    },
    priceCal: 0,
    isLoading: false,
    error: null
}

export const getCart = createAsyncThunk(
    'cart/fetchAll',
    async(_, thunkApi) => {
        try {
            const response = await api.get<cartItem[]>(`/cart`);
            return response.data
            // const cartObj = response.data;
            // return cartObj[0];        
        } catch (error) {
            return thunkApi.rejectWithValue("Couldn't fetch items")
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
            return thunkApi.rejectWithValue("Something went wrong")
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/add', async(cartInfo: { id: string, quantity: number}, thunkApi) => {
        try {
            const response = await api.post<cartItem>(`/cart/add-to-cart/${cartInfo.id}`, cartInfo)

            return response.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue("Item not found")
        }
    }
)

export const updateItemQuantity = createAsyncThunk(
    'cart/update', async(cartInfo: { id: string, quantity: number}, thunkApi) => {
        try {
            const response = await api.put<cartItem>(`/cart/${cartInfo.id}`, cartInfo)
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue("Item not found");
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
                state.cart.cartItems = action.payload
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
        
        // Update Item quantity
        builder.addCase(updateItemQuantity.pending, (state) => {
			state.isLoading = true;
		});
        builder.addCase(updateItemQuantity.rejected, (state, action) => {
			state.isLoading = false;
			if (typeof action.payload === 'string')
				state.error = action.payload || 'Error';
		});
        builder.addCase(updateItemQuantity.fulfilled, (state, action) => {
			state.isLoading = false;
            if(action.payload) {
                const updatedItem = action.payload;
                const updatedCartItems = state.cart.cartItems.map((item) => item.cartItemId === updatedItem.cartItemId ? updatedItem : item);
                
                state.cart.cartItems = updatedCartItems
            }
		});
        
        // Delete item from cart
        builder.addCase(deleteItem.pending, (state) => {
			state.isLoading = true;
		});
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

// export const {sumPrice} = cartSlice.actions;

export default cartSlice.reducer