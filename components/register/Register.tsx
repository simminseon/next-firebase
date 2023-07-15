'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { PatternFormat, NumericFormat } from 'react-number-format';

import {
  Button,
  InputField,
  Label,
  Input,
  ErrorMessage,
  InputFile,
} from '@/components/common';
import { IoMdClose } from 'react-icons/io';
import { Loading } from '@/components/common';
import { createUserProfile, addUserInfoToDB } from '@/firebase';
import { useUploadImageFile, useError } from '@/hooks';
import { Errors } from '@/types/error.type';
import { TRegister } from '@/types/register.type';

function Register() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<TRegister>({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { imageFile, setImageFile, uploadImageFile } = useUploadImageFile();
  const { errorMessage, handleError } = useError();

  const onSubmit = async (data: TRegister) => {
    try {
      setIsLoading(true);
      await createUserProfile(data);
      await addUserInfoToDB(data);
      await uploadImageFile();
      router.push('/register/complete');
    } catch (error: unknown) {
      setIsLoading(false);
      handleError(error as Errors);
      window.scrollTo(0, 0);
    }
  };

  const handleUploadImage = (file: File) => {
    const fileSize = 1024 * 1024 * 3;

    if (file) {
      if (file.size > fileSize) {
        alert('파일 크기가 3MB 를 초과하였습니다.');
        return false;
      }
      setImageFile(file);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <Label htmlFor="email">
            이메일<em className="text-red">*</em>
            <strong className="block text-xs text-gray-500">
              (비밀번호 분실 시 필요한 정보이니 정확하게 입력해 주세요.)
            </strong>
          </Label>

          <Input
            type="email"
            id="email"
            placeholder="이메일"
            error={!!errors.email}
            {...register('email', {
              required: '필수 정보입니다.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: '잘못된 이메일 형식입니다.',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputField>

        <InputField>
          <Label htmlFor="password">
            비밀번호<em className="text-red">*</em>
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            error={!!errors.password}
            {...register('password', {
              required: '필수 정보입니다.',
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

        <InputField>
          <Label htmlFor="passwordConfirm">
            비밀번호 확인<em className="text-red">*</em>
          </Label>
          <Input
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호 확인"
            error={!!errors.passwordConfirm}
            {...register('passwordConfirm', {
              required: '필수 정보입니다.',
              validate: {
                matchesPreviousPassword: (value: string) => {
                  const password = getValues('password');
                  return password === value || '비밀번호가 일치하지 않습니다.';
                },
              },
            })}
          />
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
        </InputField>

        <InputField>
          <Label htmlFor="phoneNumber">
            휴대전화번호<em className="text-red">*</em>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: '필수 정보입니다.',
              pattern: {
                value: /^01[0-9]{0,1}-[0-9]{3,4}-[0-9]{4}/,
                message: '형식에 맞지 않는 번호입니다.',
              },
            }}
            render={({ field: { ref, ...field } }) => {
              return (
                <PatternFormat
                  getInputRef={ref}
                  id="phoneNumber"
                  className={classNames('input-comm', {
                    error: errors.phoneNumber,
                  })}
                  format="###-####-####"
                  placeholder="휴대전화번호"
                  {...field}
                />
              );
            }}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </InputField>

        <InputField>
          <Label htmlFor="name">
            이름<em className="text-red">*</em>
          </Label>
          <Input
            id="name"
            placeholder="이름"
            error={!!errors.name}
            {...register('name', { required: '필수 정보입니다.' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </InputField>

        <InputField>
          <Label htmlFor="profile">
            프로필 이미지
            <em className="text-red">*</em>
            <strong className="block text-xs text-gray-500">
              (최대 3MB 이하의 파일만 첨부 가능합니다.)
            </strong>
          </Label>
          <div className="relative">
            <Button>첨부하기</Button>
            <Controller
              name="profile"
              control={control}
              rules={{
                required:
                  imageFile !== null ? false : '명함 이미지를 첨부해주세요.',
              }}
              render={({ field: { onChange, value, ref, ...field } }) => (
                <InputFile
                  id="profile"
                  onChange={(file: File) => handleUploadImage(file)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  ref={ref}
                  error={!!errors.profile}
                  {...field}
                />
              )}
            />
          </div>
          {imageFile === null ? (
            <ErrorMessage>{errors.profile?.message}</ErrorMessage>
          ) : (
            <>
              <div className="flex items-center mt-5">
                <span className="text-sm text-gray-500">{imageFile?.name}</span>
                <button
                  type="button"
                  className="h-20 px-5 text-black"
                  onClick={() => setImageFile(null)}
                >
                  <IoMdClose />
                </button>
              </div>
            </>
          )}
        </InputField>

        <InputField>
          <Label htmlFor="region">지역</Label>
          <Input id="region" placeholder="지역" {...register('region')} />
        </InputField>

        <Button type="submit" className="mt-30" disabled={isLoading}>
          회원가입
        </Button>

        {isLoading && <Loading />}
      </form>
    </div>
  );
}

export default Register;
