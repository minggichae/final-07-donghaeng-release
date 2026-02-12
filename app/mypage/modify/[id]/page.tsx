import Modify from './Modify';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프로필 수정',
  description: '프로필 정보를 수정하세요.',
  robots: { index: false, follow: false },
};

export default function ModifyPage() {
  return <Modify />;
}
