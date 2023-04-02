import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface theCatState {
  page: number;
}

const initialState: theCatState = {
  page: 0,
};

export const theCatSlice = createSlice({
  name: "theCat",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const theCatActions = theCatSlice.actions;
export const theCatReducer = theCatSlice.reducer;
