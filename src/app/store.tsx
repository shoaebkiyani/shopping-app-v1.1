import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/auth/userSlice'
import productReducer from '../features/products/ProductSlice'
import categoryReducer from '../features/category/categorySlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer,
    cart: cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch