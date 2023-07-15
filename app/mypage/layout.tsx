import { Header, Main } from '@/components/common';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Header className="shrink-0">마이페이지</Header>
      <Main className="flex-1 w-full">{children}</Main>
    </div>
  );
}

export default Layout;
