import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggin: false },
  reducers: {
    login(state) {
      state.isLoggin = true
      state.userProfile = {
        name: "John Doe",
        email: "johndoe@example.com",
      }
    },
    logout(state) {
      state.isLoggin = false
    }
  },

})

export const authAction = authSlice.actions
export default authSlice