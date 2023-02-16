import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notesService } from './notesService';

const CONSTANTS = {
  CREATE: 'notes.create',
  FETCH_ALL: 'notes.fetchAll',
};

export const notesFetchAll = createAsyncThunk(CONSTANTS.FETCH_ALL, notesService.fetchAll);
export const notesCreate = createAsyncThunk(CONSTANTS.CREATE, notesService.create);

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNotesState: () => initialState,
  },
  extraReducers: {
    // Create a new note
    [notesFetchAll.pending]: (state) => {
      state.isLoading = true;
    },
    [notesFetchAll.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.notes = payload;
    },
    [notesFetchAll.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    // Create a new note
    [notesCreate.pending]: (state) => {
      state.isLoading = true;
    },
    [notesCreate.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.notes.push(payload);
    },
    [notesCreate.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
  },
});

export const { resetNotesState } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export const notesSelector = {
  getAll: ({ notes }) => {
    console.log(notes);
    return notes;
  },
};
