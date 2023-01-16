import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import APIManager from "../../services/APIManager";
import LocalStorage from '../../services/LocalStorage';
import { RootState } from "../store/store";

export enum AuthorizeUserStatus {
  UNKNOWN = 1,
  AUTHORIZED = 2,
  UNAUTHORIZED = 3,
}

interface UserData {
  username: string;
  password: string;
}

export const userLogin = createAsyncThunk('user/login', async (data: UserData, thunkAPI) => {
  const { token } = await APIManager.post('api-token-auth/', data);
  APIManager.updateToken(token);
  const user = await APIManager.get('users/me/');

  return { token, user };
});

export const getMe = createAsyncThunk('user/me', async (forceToken: string | null | undefined, thunkAPI) => {
  const store = thunkAPI.getState() as RootState;
  if (!store.user.token) throw Error('Unauthorized');

  APIManager.updateToken(store.user.token);
  return await APIManager.get('users/me/')
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    token: LocalStorage.get<string>('token'),
    authorizeStatus: AuthorizeUserStatus.UNKNOWN,
    activeUser: null as null | UserData,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<{token: string, user: any}>) => {
      console.log('action', action);
      state.isLoading = false;
      LocalStorage.set('token', action.payload.token);
      state.token = action.payload.token;
      state.activeUser = action.payload.user;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.authorizeStatus = AuthorizeUserStatus.UNAUTHORIZED;
    })

    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<any>) => {
      state.authorizeStatus = AuthorizeUserStatus.AUTHORIZED;
      state.activeUser = action.payload;
    })
  }
})