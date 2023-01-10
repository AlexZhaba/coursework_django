import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { formSlice } from "../slices/formSlice";

import { userSlice } from "../slices/userSlice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [formSlice.name]: formSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
