import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  submit: "",
  reset: "",
  counter: 0,
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    submit: (s, { payload }) => {
      s.submit = payload;
      s.counter = s.counter + 1;
    },
    reset: (s, { payload }) => {
      s.reset = payload;
      s.submit = "";
      s.counter = 0;
    },
  },
});

export const { submit, reset } = inputSlice.actions;

export default inputSlice.reducer;
