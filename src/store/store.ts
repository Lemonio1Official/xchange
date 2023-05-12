import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import inputReducer from "./reducers/inputSlice";
import userReducer from "./reducers/userSlice";
import exchangeReducer from "./reducers/exchangeSlice";

export type rootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  inputReducer,
  userReducer,
  exchangeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;

export default store;
