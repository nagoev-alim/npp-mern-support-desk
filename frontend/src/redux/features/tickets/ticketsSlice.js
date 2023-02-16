import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ticketsService } from './ticketsService';

const CONSTANTS = {
  CREATE: 'tickets.create',
  FETCH_ALL: 'tickets.fetchAll',
  FETCH_SINGLE: 'tickets.fetchSingle',
  CLOSE: 'tickets.close',
  LOGOUT: 'tickets.logoutUser',
};

export const ticketsCreate = createAsyncThunk(CONSTANTS.CREATE, ticketsService.create);
export const ticketsFetchAll = createAsyncThunk(CONSTANTS.FETCH_ALL, ticketsService.fetchAll);
export const ticketsFetchSingle = createAsyncThunk(CONSTANTS.LOGOUT, ticketsService.fetchSingle);
export const ticketsClose = createAsyncThunk(CONSTANTS.CLOSE, ticketsService.close);

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
    // Fetch single ticket
    [ticketsFetchSingle.pending]: (state) => {
      state.isLoading = true;
    },
    [ticketsFetchSingle.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ticket = payload;
    },
    [ticketsFetchSingle.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    // Close ticket
    [ticketsClose.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const id = payload?._id;
      if (id) {
        const ticket = state.tickets.find(ticket => ticket._id === id);
        ticket.status = 'closed';
      }
    },
  },
});

export const { resetTicketsState } = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;

export const ticketsSelector = {
  getAll: ({ tickets }) => tickets,
};
