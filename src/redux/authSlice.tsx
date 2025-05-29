import { createSlice } from "@reduxjs/toolkit";

interface UserProfile {
  name: string;
  email: string;
}

interface AuthState {
  isLogging: boolean;
  userProfile?: UserProfile;
}

const initialState: AuthState = {
  isLogging: true,
  userProfile: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogging = true;
      state.userProfile = {
        name: "John Doe",
        email: "johndoe@example.com",
      };
    },
    logout(state) {
      state.isLogging = false;
      state.userProfile = undefined;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
