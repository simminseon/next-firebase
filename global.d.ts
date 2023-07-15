declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: ConfirmationResult;
  }
}

export {};
