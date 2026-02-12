import type { Metadata } from 'next';
import style from './ManageAllPage.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import ManageContent from './ManageContent';

export const metadata: Metadata = {
  title: '등록 모임 관리 - Moa',
  description: '내가 등록한 모임을 관리하고 신청자를 확인하세요.',
  robots: { index: false, follow: false },
};

export default function ManageAllPage() {
  return (
    <DefaultLayout>
      <main className={style.container}>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>등록 모임</h1>
          <ManageContent />
        </div>
      </main>
    </DefaultLayout>
  );
}
