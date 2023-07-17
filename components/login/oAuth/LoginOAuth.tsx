'use client';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { Button, Loading } from '@/components/common';

function LoginOAuth() {
  const provider = new GoogleAuthProvider();
  const [isLogin, setisLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickLogin = () => {
    signInWithRedirect(auth, provider);
  };

  const onClickLogout = () => {
    signOut(auth);
    console.log('logout');
  };

  useEffect(() => {
    setIsLoading(true);
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          setisLogin(true);
          setIsLoading(false);
          console.log({ credential, token, user });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setIsLoading(false);
        console.log({ errorCode, errorMessage, email, credential });
      });
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : isLogin ? (
        <>
          <div>사용자 정보</div>
          <div>{auth.currentUser?.displayName}</div>
          <div>{auth.currentUser?.email}</div>
          <Button onClick={onClickLogout}> Logout </Button>
        </>
      ) : (
        <Button onClick={onClickLogin}> Login </Button>
      )}
    </div>
  );
}

export default LoginOAuth;
