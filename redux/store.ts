import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import phoneNumberAuthReducer from './features/phoneNumberAuthSlice';
import { businessmanStatusApi } from './services/businessmanStatusApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    phoneNumberAuth: phoneNumberAuthReducer,
    [businessmanStatusApi.reducerPath]: businessmanStatusApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([businessmanStatusApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
