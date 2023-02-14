import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice.js';

/* =============================
📦 Store
============================= */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});
