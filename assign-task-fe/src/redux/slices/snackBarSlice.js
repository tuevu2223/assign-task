import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  type: 'success'
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    close: () => {
      return initialState;
    },
  },
});

export const { open, close } = snackBarSlice.actions;
export default snackBarSlice.reducer;
