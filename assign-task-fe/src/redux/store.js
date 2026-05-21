import authReducer from "@/redux/slices/authSlice";
import roleReducer from "@/redux/slices/roleSlice";
import snackBarReducer, { snackBarSlice } from "@/redux/slices/snackBarSlice";
import { rootApi } from "@/services/rootApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";
import { roleSlice } from "./slices/roleSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [snackBarSlice.name],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    [rootApi.reducerPath]: rootApi.reducer,
    [snackBarSlice.name]: snackBarReducer,
    [roleSlice.name]: roleReducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApi.middleware),
});

export const persistor = persistStore(store);
