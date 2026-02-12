import { Suspense } from 'react';
import styles from './Main.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import SearchAiSection from './SearchAiSection';
import MeetingsContent from './MeetingsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '홈',
  description: 'Moa에서 운동, 요리, 문화, 게임 등 다양한 카테고리의 모임을 찾아보세요. AI 추천으로 나에게 맞는 모임을 발견할 수 있습니다.',
};

export default function Main() {
  return (
    <DefaultLayout>
      <main className={styles[`main-wrapper`]}>
        <picture>
          <source srcSet="/images/desktop-banner.webp" media="(min-width: 1024px)" />
          <img className={styles[`banner`]} src="/images/mobile-banner.webp" alt="Moa 배너" width={1280} height={600} fetchPriority="high" decoding="async" />
        </picture>
        {/* 검색바 및 ai추천 버튼 — 즉시 표시 */}
        <SearchAiSection />
        {/* 지도 + 카테고리 목록 — API 응답 후 표시 */}
        <Suspense fallback={<div className={styles[`loading-skeleton`]} />}>
          <MeetingsContent />
        </Suspense>
      </main>
    </DefaultLayout>
  );
}
