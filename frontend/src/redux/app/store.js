import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice.js';
import { ticketsReducer } from '../features/tickets/ticketsSlice.js';

/* =============================
📦 Store
============================= */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});
