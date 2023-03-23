import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatImage } from "../../models/models";

interface theCatState {
  breedIds: string[];
  images: CatImage[];
  page: number;
}

const initialState: theCatState = {
  breedIds: [],
  images: [],
  page: 0,
};

export const theCatSlice = createSlice({
  name: "theCat",
  initialState,
  reducers: {
    setBreedIds(state, action: PayloadAction<string[]>) {
      state.breedIds = action.payload;
    },
    setImages(state, action: PayloadAction<CatImage[] | undefined>) {
      state.images = action.payload ?? [];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const theCatActions = theCatSlice.actions;
export const theCatReducer = theCatSlice.reducer;
