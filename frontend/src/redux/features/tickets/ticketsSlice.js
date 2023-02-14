import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ticketsService } from './ticketsService';

const CONSTANTS = {
  CREATE: 'tickets.create',
  FETCH_ALL: 'tickets.fetchAll',
  LOGOUT: 'tickets.logoutUser',
};

export const ticketsCreate = createAsyncThunk(CONSTANTS.CREATE, ticketsService.create);
export const ticketsFetchAll = createAsyncThunk(CONSTANTS.FETCH_ALL, ticketsService.fetchAll);
// export const logoutUser = createAsyncThunk(CONSTANTS.LOGOUT, ticketsService.logout);

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    resetTicketsState: () => initialState,
  },
  extraReducers: {
    // Create a new ticket
    [ticketsCreate.pending]: (state) => {
      state.isLoading = true;
    },
    [ticketsCreate.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      // state.tickets.push(payload);
    },
    [ticketsCreate.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    // Fetch all tickets
    [ticketsFetchAll.pending]: (state) => {
      state.isLoading = true;
    },
    [ticketsFetchAll.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets = payload;
    },
    [ticketsFetchAll.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
  },
});

export const { resetTicketsState } = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;

export const ticketsSelector = {
  getAll: ({ tickets }) => tickets,
};
