import { Template } from '../../models/template';
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import APIManager from "../../services/APIManager";
import LocalStorage from '../../services/LocalStorage';

interface UserData {
  login: string;
  password: string;
}

export const userLogin = createAsyncThunk('user/login', async (data: UserData) => 
  await APIManager.post('users', data),
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    activeUser: LocalStorage.get('activeUser'),
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<{user: string}>) => {
      state.isLoading = false;
      LocalStorage.set('activeUser', action.payload);
      state.activeUser = action.payload;
    });
  }
})