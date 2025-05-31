import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  email: string;
  password: string;
  role: "admin" | "buyer"; // Added role
}

interface AuthState {
  isLogging: boolean;
  userProfile?: UserProfile;
}

const initialState: AuthState = {
  isLogging: false,
  userProfile: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserProfile>) {
      state.isLogging = true;
      state.userProfile = action.payload;
    },
    logout(state) {
      state.isLogging = false;
      state.userProfile = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;