import { ReduxProvider } from '@/redux/provider';
import '@/styles/index.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;