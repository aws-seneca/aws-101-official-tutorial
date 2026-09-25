import { Geist } from 'next/font/google';
import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'AWS 101 Study Guide', template: '%s · AWS 101 Study Guide' },
  description:
    'The AWS Student Builder Group at Seneca study notes: hands-on AWS lessons, AWS concepts, and solution architecture.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={geist.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
