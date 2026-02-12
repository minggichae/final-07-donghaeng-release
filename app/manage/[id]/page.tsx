import type { Metadata } from 'next';
import styles from './Manage.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import ManageContent from './ManageContent';

export const metadata: Metadata = {
  title: '신청자 목록',
  description: '모임 신청자 목록을 확인하고 승인 또는 거절하세요.',
  robots: { index: false, follow: false },
};

interface ManagePageProps {
  params: Promise<{ id: string }>;
}

export default async function ManagePage({ params }: ManagePageProps) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <DefaultLayout>
      <main className={styles['manage-body']}>
        <h1 className={styles['manage-title']}>신청자 목록</h1>
        <ManageContent productId={productId} />
      </main>
    </DefaultLayout>
  );
}
