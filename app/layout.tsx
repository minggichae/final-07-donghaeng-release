import './globals.css';
import type { Metadata } from 'next';

const SITE_URL = 'https://final-07-moa-release.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Moa - 취미를 공유하고 함께하는 공간',
    template: '%s - Moa',
  },
  description: '함께하는 즐거움, Moa에서 다양한 모임을 찾고 참여하세요. 운동, 요리, 문화, 게임 등 다양한 카테고리의 모임을 만들고 참여할 수 있습니다.',
  keywords: ['모임', 'Moa', '소셜', '모임 플랫폼', '취미 모임', '소모임', '동호회', '모임 찾기'],
  openGraph: {
    title: 'Moa - 모임 플랫폼',
    description: '함께하는 즐거움, Moa에서 다양한 모임을 찾고 참여하세요.',
    url: SITE_URL,
    siteName: 'Moa',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-img.png',
        width: 1200,
        height: 630,
        alt: 'Moa 모임 플랫폼 대표 이미지',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
