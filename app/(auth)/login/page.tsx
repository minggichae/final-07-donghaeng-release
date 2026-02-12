import BlankLayout from '@/app/components/BlankLayout';
import Login from './Login';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: 'Moa에 로그인하여 다양한 모임에 참여하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <BlankLayout>
      <Login />
    </BlankLayout>
  );
}
