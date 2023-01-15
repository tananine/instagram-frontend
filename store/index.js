import postReducer from './post'
import userReducer from './user'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: { userInfo: userReducer, post: postReducer },
})

export default store
