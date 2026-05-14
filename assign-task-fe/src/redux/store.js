import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import snackBarReducer from "@/redux/slices/snackBarSlice";
import { rootApi } from "@/services/rootApi";
import { snackBarSlice } from "@/redux/slices/snackBarSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
    [snackBarSlice.name]: snackBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
