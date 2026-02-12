import BlankLayout from '@/app/components/BlankLayout';
import Signup from './Signup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Moa에 가입하고 다양한 모임을 만들고 참여하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <BlankLayout>
      <Signup />
    </BlankLayout>
  );
}
