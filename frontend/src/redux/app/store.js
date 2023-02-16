import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice.js';
import { ticketsReducer } from '../features/tickets/ticketsSlice.js';
import { notesReducer } from '../features/notes/notesSlice.js';

/* =============================
📦 Store
============================= */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});
