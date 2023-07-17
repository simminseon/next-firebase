'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, fetchUser } from '@/firebase';
import { Button, Loading } from '@/components/common';
import { useAppSelector } from '@/hooks/useReducer';
import { useImageUrl } from '@/hooks/useImageUrl';
import { useRouter } from 'next/navigation';
import { logIn } from '@/redux/features/authSlice';
import { phoneNumberLogIn } from '@/redux/features/phoneNumberAuthSlice';

function Home() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth);
  const phoneUser = useAppSelector((state) => state.phoneNumberAuth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const { imageUrl, imageLoading } = useImageUrl(user.user.id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(false);
      if (user) {
        if (user.phoneNumber) {
          dispatch(phoneNumberLogIn({ id: user.uid, phoneNumber: user.phoneNumber }));
        } else {
          const users = await fetchUser(user.uid);
          console.log('여기', users);
          if (users.length > 0) {
            dispatch(logIn(users[0]));
          }
        }
        setIsLogin(true);
      } else {
        router.push('/login');
        setIsLogin(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 중 오류가 발생하였습니다.', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return isLogin ? (
    <div className="container">
      로그인 정보
      {user.isAuth && (
        <div>
          <div>id: {user.user.id}</div>
          <div>이름: {user.user.name}</div>
          <div>이메일: {user.user.email}</div>
          <div>핸드폰번호: {user.user.phoneNumber}</div>
          <div>활동지역: {user.user.region}</div>
          <div>프로필: {imageLoading ? <Loading /> : imageUrl && <img src={imageUrl} />}</div>
        </div>
      )}
      {phoneUser.isAuth && (
        <div>
          <div>핸드폰번호: {phoneUser.user.phoneNumber}</div>
        </div>
      )}
      <Button type="button" onClick={logout}>
        로그아웃
      </Button>
    </div>
  ) : null;
}
export default Home;
