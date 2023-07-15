export type TLogin = {
  email: string;
  password: string;
};
export type TUser = {
  id: string;
  email?: string;
  phoneNumber: string;
  name: string;
  region?: string;
};

export type TLoginPhoneNumber = {
  phoneNumber: string;
  optCode: number;
};

export type TPhoneNumberUser = {
  id: string;
  phoneNumber: string;
};
