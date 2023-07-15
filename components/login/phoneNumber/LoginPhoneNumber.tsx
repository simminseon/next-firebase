'use client';
import { useEffect, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase';
import {
  InputField,
  Input,
  Label,
  Button,
  ErrorMessage,
} from '@/components/common/';
import { TLoginPhoneNumber } from '@/types/auth.type';

function LoginPhoneNumber() {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginPhoneNumber>({ mode: 'onChange' });

  const [isPhoneAuthentication, setIsPhoneAuthentication] = useState(false);
  const [isNextStep, setIsNextStep] = useState(false);
  const [test, setTest] = useState('');
  const router = useRouter();

  const optCode = useRef<number>();
  optCode.current = watch('optCode');
  const optCodeNumber = optCode.current;

  const phoneNumberRef = useRef<string>();
  phoneNumberRef.current = watch('phoneNumber');
  const phoneNumberInp = phoneNumberRef.current;

  const generateRecaptch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );
  };
  useEffect(() => {
    generateRecaptch();
  }, []);

  // 인증번호 입력
  const verifyOPT = () => {
    if (optCodeNumber && optCodeNumber.toString().length === 6) {
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(optCodeNumber)
        .then((result) => {
          const user = result.user;

          setIsNextStep(true);
        })
        .catch((error) => {
          // 에러 코드 적기
          console.log('에러', error);
        });
    }
  };

  // 핸드폰 인증번호 메시지 보내기
  const verifyPhoneNumber = () => {
    setTest(
      '인증번호를 발송했습니다.\n인증 문자가 오지 않으면 입력 정보가 정확한지 확인해 보세요.'
    );
    if (phoneNumberInp) {
      const countryCode = '+82';
      const phoneNumberFormat = phoneNumberInp
        .toString()
        .replace(/[^0-9]/g, '');
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, countryCode + phoneNumberFormat, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setIsPhoneAuthentication(true); // 인증 완료
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-phone-number':
              console.log('입력하신 전화번호가 유효하지 않습니다.');
              break;
            case 'auth/missing-phone-number':
              console.log('전화번호를 입력해주세요.');
              break;

            default:
              console.log('오류가 발생했습니다:', error);
          }
        });
    }
  };

  const onSubmit = async (data: TLoginPhoneNumber) => {
    router.push('/');
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <Label htmlFor="phoneNumber">
            휴대전화번호<em className="text-red">*</em>
          </Label>
          <InputField.Split>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: '휴대폰번호를 입력해 주세요.',
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

            <InputField.SplitShrink>
              <Button
                size="sm"
                onClick={verifyPhoneNumber}
                disabled={!!errors.phoneNumber || !Boolean(phoneNumberInp)}
              >
                인증번호 전송
              </Button>
            </InputField.SplitShrink>
          </InputField.Split>
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
          {test}
        </InputField>

        {isPhoneAuthentication && (
          <InputField>
            <Label htmlFor="optCode">
              인증번호<em className="text-red">*</em>
            </Label>
            <InputField.Split>
              <Input {...register('optCode', { required: true })} />
              <InputField.SplitShrink>
                <Button size="sm" onClick={verifyOPT}>
                  인증번호 확인
                </Button>
              </InputField.SplitShrink>
            </InputField.Split>
          </InputField>
        )}
        <Button type="submit" disabled={!isNextStep}>
          로그인
        </Button>
        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}

export default LoginPhoneNumber;
