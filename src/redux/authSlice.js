import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggin: false },
  reducers: {
    login(state) {
      state.isLoggin = true
    },
    logout(state) {
      state.isLoggin = false
    }
  },

})

export const authAction = authSlice.actions
export default authSlice