'use client';
import { Button } from '@/components/common';
import { useRouter } from 'next/navigation';

function Complete() {
  const router = useRouter();

  const onClickLogin = () => {
    router.push('/login');
  };

  return (
    <div className="container flex flex-col items-center justify-center h-full">
      <strong className="text-lg pb-30">화원가입이 완료되었습니다.</strong>
      <Button onClick={onClickLogin}>로그인</Button>
    </div>
  );
}

export default Complete;
