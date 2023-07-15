'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  InputField,
  Label,
  Input,
  ErrorMessage,
  Loading,
} from '@/components/common';
import { TLogin } from '@/types/auth.type';
import { Errors } from '@/types/error.type';
import { useError } from '@/hooks/useError';
import { loginWithEmailAndPassword } from '@/firebase';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessage, handleError } = useError();

  const onSubmit = async (data: TLogin) => {
    try {
      setIsLoading(true);
      await loginWithEmailAndPassword(data);
      router.push('/');
    } catch (error: unknown) {
      setIsLoading(false);
      handleError(error as Errors);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              placeholder="이메일"
              error={!!errors.email}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                  message: '잘못된 이메일 형식입니다.',
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </InputField>

          <InputField>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호"
              error={!!errors.password}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호를 6자 이상 입력하세요.',
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputField>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit" className="mt-30">
            로그인
          </Button>
        </form>
      </div>
      <div className="mt-10">
        <Link href="/register" className="px-10 py-5 text-gray-500">
          회원가입
        </Link>
        <span className="text-gray-500">|</span>
        <Link href="/login/phoneNumber" className="px-10 py-5 text-gray-500">
          휴대폰 인증
        </Link>
        <span className="text-gray-500">|</span>
        <Link href="/login/oAuth" className="px-10 py-5 text-gray-500">
          구글 인증
        </Link>
      </div>
      {isLoading && <Loading />}
    </main>
  );
}

export default Login;
