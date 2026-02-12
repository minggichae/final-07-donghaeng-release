import DefaultLayout from '@/app/components/DefaultLayout';
import { getDetail } from '@/lib/meetings';
import ApplyForm from './ApplyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모임 신청',
  description: '모임에 신청하고 참여하세요.',
  robots: { index: false, follow: false },
};

export default async function Apply({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getDetail(id);

  if (res.ok === 0) {
    return (
      <DefaultLayout>
        <p>해당 모임이 없습니다.</p>
      </DefaultLayout>
    );
  }

  const meeting = res.item;
  console.log(meeting);

  return (
    <DefaultLayout>
      <ApplyForm meeting={meeting} id={id} />
    </DefaultLayout>
  );
}
