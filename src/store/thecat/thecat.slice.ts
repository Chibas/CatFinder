import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface theCatState {
  breedIds: string[];
  page: number;
}

const initialState: theCatState = {
  breedIds: [],
  page: 0,
};

export const theCatSlice = createSlice({
  name: "theCat",
  initialState,
  reducers: {
    setBreedIds(state, action: PayloadAction<string[]>) {
      state.breedIds = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const theCatActions = theCatSlice.actions;
export const theCatReducer = theCatSlice.reducer;
