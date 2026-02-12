import Notifications from './Notifications';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '알림 - Moa',
  description: '모임 관련 알림을 확인하세요.',
  robots: { index: false, follow: false },
};

export default function NotificationsPage() {
  return <Notifications />;
}
