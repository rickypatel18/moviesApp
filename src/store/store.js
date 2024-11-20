import { configureStore } from "@reduxjs/toolkit";
import {movieoReducer} from "./movieoSlice";
// it refers to movieoSlice.reducer by default.

export const store = configureStore({
  reducer: {
    movieoData: movieoReducer,
  },
});
