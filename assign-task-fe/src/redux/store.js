import authReducer from "@/redux/slices/authSlice";
import roleReducer from "@/redux/slices/roleSlice";
import snackBarReducer, { snackBarSlice } from "@/redux/slices/snackBarSlice";
import { rootApi } from "@/services/rootApi";
import { configureStore } from "@reduxjs/toolkit";
import { roleSlice } from "./slices/roleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
    [snackBarSlice.name]: snackBarReducer,
    [roleSlice.name]: roleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});
