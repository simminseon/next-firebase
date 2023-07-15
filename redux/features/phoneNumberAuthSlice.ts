import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPhoneNumberUser } from '@/types/auth.type';

type PhoneNumberAuthState = {
  isAuth: boolean;
  user: TPhoneNumberUser;
};

const initialState = {
  isAuth: false,
  user: {
    id: '',
    phoneNumber: '',
  },
} as PhoneNumberAuthState;

export const phoneNumberAuth = createSlice({
  name: 'phoneNumberAuth',
  initialState,
  reducers: {
    phoneNumberLogOut: () => {
      return initialState;
    },
    phoneNumberLogIn: (state, action: PayloadAction<TPhoneNumberUser>) => {
      return {
        isAuth: true,
        user: action.payload,
      };
    },
  },
});

export const { phoneNumberLogIn, phoneNumberLogOut } = phoneNumberAuth.actions;
export default phoneNumberAuth.reducer;
