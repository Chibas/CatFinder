import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const LS_USER_ID: string = "LS_USER_ID";

export type User = {
  id: string;
  name: string;
};

interface AuthState {
  authenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  authenticated: localStorage.getItem(LS_USER_ID) ? true : false,
  user: JSON.parse(localStorage.getItem(LS_USER_ID) ?? "null"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerDemoUser(state) {
      const id = uuidv4();
      const name: string = "demo";
      const user: User = { id, name };

      localStorage.setItem(LS_USER_ID, JSON.stringify(user));
      state.user = user;
      state.authenticated = true;
    },
    loginUser(state, action: PayloadAction<User>) {
      const user = action.payload;
      localStorage.setItem(LS_USER_ID, JSON.stringify(user));
      state.user = user;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
