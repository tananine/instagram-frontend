import { createSlice } from '@reduxjs/toolkit'

const initialPost = {
  postCreate: false,
}

const postSlice = createSlice({
  name: 'post',
  initialState: initialPost,
  reducers: {
    create(state, action) {
      state.postCreate = !state.postCreate
    },
  },
})

export const postActions = postSlice.actions

export default postSlice.reducer
