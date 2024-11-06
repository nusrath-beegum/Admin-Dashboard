import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isAuthenticated: boolean;
  username: string;
}

const initialState: LoginState = {
  isAuthenticated: false,
  username: "",
};

interface LoginPayload {
  username: string;
  password: string;
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { username, password } = action.payload;
      if (username === "nusrath" && password === "beegum") {
        state.isAuthenticated = true;
        state.username = username;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
