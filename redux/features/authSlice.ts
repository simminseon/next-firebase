import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@/types/auth.type';

type AuthState = {
  isAuth: boolean;
  user: TUser;
};

const initialState = {
  isAuth: false,
  user: {
    id: '',
    email: '',
    phoneNumber: '',
    name: '',
    region: '',
  },
} as AuthState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<TUser>) => {
      return {
        isAuth: true,
        user: action.payload,
      };
    },
    logInPhoneNumber: (state, action: PayloadAction<TUser>) => {
      return {
        isAuth: true,
        user: action.payload,
      };
    },
  },
});

export const { logIn, logOut, logInPhoneNumber } = auth.actions;
export default auth.reducer;
