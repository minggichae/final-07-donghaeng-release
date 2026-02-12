import { getMeetings } from '@/lib/meetings';
import Map from './Map';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모임 지도',
  description: '지도에서 내 주변 모임을 한눈에 찾아보세요.',
};

export default async function MapPage() {
  const res = await getMeetings();
  const meetings = res.ok === 1 ? res.item : [];

  return <Map meetings={meetings} />;
}
