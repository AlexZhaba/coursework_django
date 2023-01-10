import { Template } from './../../models/template';
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import APIManager from "../../services/APIManager";

interface InitialState {
  templates: null | Template[],
  isTemplatesLoading: boolean;
  page: number;
  pageTemplates: null | Template[];
  pageCount: number;
}

const MAX_CARD_ON_PAGE = 6;

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    templates: null,
    isTemplatesLoading: false,
    page: 1,
    pageTemplates: null,
    pageCount: 1,
  } as InitialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      const newPage = action.payload;
      state.page = newPage;

      state.pageTemplates = state.templates?.slice(MAX_CARD_ON_PAGE * (state.page - 1), MAX_CARD_ON_PAGE * state.page) || [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTemplates.pending, (state, action) => {
      state.isTemplatesLoading = true;
    });

    builder.addCase(fetchTemplates.fulfilled, (state, action: PayloadAction<Template[]>) => {
      state.isTemplatesLoading = false;
      state.templates = action.payload;

      state.pageTemplates = action.payload.slice(MAX_CARD_ON_PAGE * (state.page - 1), MAX_CARD_ON_PAGE * state.page);
      state.pageCount = Math.round(action.payload.length / MAX_CARD_ON_PAGE + 0.49);
    });
  },
});

export const fetchTemplates = createAsyncThunk('forms/fetchTemplates', async (forceFirst?: boolean, thunkAPI?) => {
  if (forceFirst) {
    thunkAPI.dispatch(setPage(1));
  }
  return await APIManager.get(`forms/template`)
});


export const { setPage } = formSlice.actions;