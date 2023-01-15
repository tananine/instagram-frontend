import { createSlice } from '@reduxjs/toolkit'

const initialUser = {
  userId: null,
  userName: null,
  description: null,
  profileImage: null,
  private: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    user(state, action) {
      state.userId = action.payload.id
      state.userName = action.payload.name
      state.description = action.payload.description
      state.profileImage = action.payload.profileImage
      state.private = action.payload.private
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
