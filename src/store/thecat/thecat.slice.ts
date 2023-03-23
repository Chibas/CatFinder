import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatImage } from "../../models/models";

interface theCatState {
  breedIds: string[];
  images: CatImage[];
}

const initialState: theCatState = {
  breedIds: [],
  images: []
};

export const theCatSlice = createSlice({
  name: 'theCat',
  initialState,
  reducers: {
    setBreedIds(state, action: PayloadAction<string[]>) {
      state.breedIds = action.payload;
    },
    setImages(state, action: PayloadAction<CatImage[] | undefined>) {
      state.images = action.payload ?? [];
    },
  }
});

export const theCatActions = theCatSlice.actions;
export const theCatReducer = theCatSlice.reducer;

