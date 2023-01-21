import { FormWithAnswers } from './../../models/templateWithAnswers';
import { Template } from './../../models/template';
import { createSlice, createAsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import APIManager from "../../services/APIManager";
import { FormData } from '../../pages/FormTemplatePage';
import { User } from '../../models/user';

interface InitialState {
  templates: null | Template[],
  isTemplatesLoading: boolean;
  page: number;
  pageTemplates: null | Template[];
  pageCount: number;
  sortType: 'ALP' | 'POP' | 'RATE';
  search: string;
  myForms: FormWithAnswers[];
  activeTemplate: Template | null;
  isLoadingForm: boolean;
  activeForm: FormWithAnswers | null;
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
    sortType: 'POP',
    search: '',
    myForms: [],
    activeTemplate: null,
    isLoadingForm: false,
    activeForm: null,
  } as InitialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      const newPage = action.payload;
      state.page = newPage;

      state.pageTemplates = state.templates?.slice(MAX_CARD_ON_PAGE * (state.page - 1), MAX_CARD_ON_PAGE * state.page) || [];
    },
    setSortType(state, action: PayloadAction<InitialState['sortType']>) {
      state.sortType = action.payload;
    },
    setSearch(state, action: PayloadAction<InitialState['search']>) {
      state.search = action.payload;
      state.page = 1;

      const newPageTemplates = state.templates?.filter(template => template.name.toLowerCase().includes(action.payload.toLowerCase())) || [];

      state.pageTemplates = newPageTemplates.slice(0, MAX_CARD_ON_PAGE);
      state.pageCount = Math.round(newPageTemplates.length / MAX_CARD_ON_PAGE + 0.49);
    },
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

    builder.addCase(fetchForms.fulfilled, (state, action: PayloadAction<FormWithAnswers[]>) => {
      state.myForms = action.payload;
    });

    builder.addCase(fetchTemplateWithId.fulfilled, (state, action: PayloadAction<Template>) => {
      state.activeTemplate = action.payload;
    });

    builder.addCase(saveForm.pending, (state) => {
      state.isLoadingForm = true;
    });

    builder.addCase(saveForm.fulfilled, (state, action) => {
      state.isLoadingForm = false;
      state.activeForm = action.payload;
    });

    builder.addCase(fetchForm.fulfilled, (state, action) => {
      console.log('action', action);
      state.activeForm = action.payload;
    })
  },
});

export const fetchTemplates = createAsyncThunk('forms/fetchTemplates', async (forceFirst?: boolean, thunkAPI?) => {
  if (forceFirst) {
    thunkAPI.dispatch(setPage(1));
  }
  return await APIManager.get(`templates?limit=1`, true)
});

export const fetchForms = createAsyncThunk('forms', async (_, thunkAPI?) => 
  await APIManager.get(`forms?limit=1`, true)
);

export const fetchTemplateWithId = createAsyncThunk('form/template', async (id: number) => 
  await APIManager.get(`templates/${id}`)
)

export const saveForm = createAsyncThunk('form/save', async (form: FormData) => 
  await APIManager.post('forms/full_create/', form)
)

export const fetchForm = createAsyncThunk('form', async (id: number) => 
  await APIManager.get(`forms/${id}`)
)

export const { setPage, setSortType, setSearch } = formSlice.actions;