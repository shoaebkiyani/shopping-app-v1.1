import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/axiosConfig'
import { getTokenFromStorage } from '../../token/token'

interface Category {
    id: string,
    name: string
}

export type Product = {
    id: string,
    title: string,
    description: string,
    imageURL: string,
    price: number,
    inStock: boolean,
    quantity: number,
    categoryId: string
    category: Category
}

interface productState {
    products: Product[],
    isLoading: boolean,
    error: string | null
}

const initialState: productState = {
    products: [],
    isLoading: false,
    error: null
}

export const getProducts = createAsyncThunk(
    'products/fetchAll', async(_, thunkAPI) => {
        try {
            const response = await api.get('/products')
            return {response: response.data, error: null}
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch the products')
        }
    }
)

export const addProduct = createAsyncThunk('products/addProduct', async(product: Product, thunkAPI) => {
    try {
        const token = getTokenFromStorage();
        if(token){
            const response = await api.post<Product>('/add-product', product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if(response.status === 200) {
                return response.data
            }
        }
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to add product')
    }
})

export const editProduct = createAsyncThunk(
    'products/editProduct', async(product: Product, thunkAPI) => {
        try {
            const token = getTokenFromStorage();
            const response = await api.put<Product>(`/edit-product/${product.id}`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to update the item')            
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct', async(productId: string, thunkAPI) => {
        try {
            const token = getTokenFromStorage();
            const response = await api.delete(`/delete-product/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            thunkAPI.rejectWithValue('Error deleting item')
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortByPriceHighToLow: (state: productState) => {
            state.products.sort((a,b) => b.price - a.price)
        },
        sortByPriceLowToHigh: (state: productState) => {
            state.products.sort((a,b) => a.price - b.price)
        },
        isInStock: (state: productState) => {
            state.products.filter((product) => product.inStock)
        }
    },
    extraReducers(builder) {
        // Fetch Products
        builder.addCase(getProducts.pending, (state) => {
           state.isLoading = true
        }),
        builder.addCase(getProducts.rejected, (state, action) => {
           state.isLoading = false
           if(typeof action.payload === 'string'){
               state.error = action.payload
          }
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload?.response
        })

        //  Add Product
        builder.addCase(addProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addProduct.rejected, (state, action) => {
            state.isLoading = false
            if(typeof action.payload === 'string')
            state.error = action.payload || 'Error'
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.isLoading = false
            if(action.payload){
                state.products = [...state.products, action.payload]
            }
         })

         // Update Product
        builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(editProduct.rejected, (state) => {
            state.isLoading = false
            state.error = 'Error updating product'
        })
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.isLoading = false
            const updatedProduct = action.payload
            state.products = state.products.map((product) =>
              product.id === updatedProduct?.id ? updatedProduct : product
            )
        })

        // Delete Product
        builder.addCase(deleteProduct.pending,(state) => {
            state.isLoading = true
        })
        builder.addCase(deleteProduct.rejected,(state, action) => {
            state.isLoading = false
            if(typeof action.payload === 'string')
            state.error = action.payload
        })
        builder.addCase(deleteProduct.fulfilled,(state, action) => {
            state.isLoading = false
            state.products = action.payload
        })
    },
})

export const {sortByPriceHighToLow, sortByPriceLowToHigh} = productSlice.actions;
export default productSlice.reducer