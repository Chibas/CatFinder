import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { thecatApi } from "./thecat/thecat.api";
import { theCatReducer } from "./thecat/thecat.slice";

export const store = configureStore({
  reducer: {
    [thecatApi.reducerPath]: thecatApi.reducer,
    theCat: theCatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thecatApi.middleware)
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;