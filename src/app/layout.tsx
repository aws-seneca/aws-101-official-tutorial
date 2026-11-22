import { Geist } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

const geist = Geist({ subsets: ['latin'] });

const description =
  'The AWS Student Builder Group at Seneca study notes: hands-on AWS lessons, AWS concepts, and solution architecture.';

export const metadata: Metadata = {
  metadataBase: new URL('https://aws-seneca.github.io/aws-101-official-tutorial/'),
  title: { default: 'AWS 101 Study Guide', template: '%s · AWS 101 Study Guide' },
  description,
  openGraph: {
    type: 'website',
    siteName: 'AWS 101 Study Guide',
    title: 'AWS 101 Study Guide',
    description,
  },
  twitter: { card: 'summary_large_image' },
};

// Browser chrome colour: the brand ink in dark mode, the page background in light mode.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#161D26' },
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
  ],
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
