import DefaultLayout from '@/app/components/DefaultLayout';
import HistoryContent from './HistoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모임 조회',
  description: '내가 신청한 모임 목록을 확인하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryPage() {
  return (
    <DefaultLayout>
      <HistoryContent />
    </DefaultLayout>
  );
}
