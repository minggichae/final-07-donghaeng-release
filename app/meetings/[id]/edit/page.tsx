import DefaultLayout from '@/app/components/DefaultLayout';
import EditForm from './Edit';
import { getDetail } from '@/lib/meetings';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모임 수정',
  description: '등록한 모임 정보를 수정하세요.',
  robots: { index: false, follow: false },
};

export default async function EditMeetingPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getDetail(id);

  if (!response.ok) {
    notFound();
  }

  return (
    <DefaultLayout>
      <EditForm initialData={response.item} meetingId={id} />
    </DefaultLayout>
  );
}
