import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/auth/userSlice'
import productReducer from '../features/products/ProductSlice'
import categoryReducer from '../features/category/categorySlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    category: categoryReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch