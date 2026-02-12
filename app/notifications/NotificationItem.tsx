'use client';

import logo from '@/public/logo/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Notification } from '@/types/notification';
import styles from './NotificationItem.module.css';

export default function NotificationItem({ notification, isRead = false, markOneRead }: { notification: Notification; isRead?: boolean; markOneRead: (notiId: string) => void }) {
  // 개별 읽음 처리 함수
  const handleClick = async () => {
    if (!isRead && markOneRead) await markOneRead(notification._id);
    console.log(notification._id);
  };
  return (
    <Link href={`/meetings/${notification.extra?.meetingId}`} className={isRead ? `${styles['alert']} ${styles['alert-read']}` : styles['alert']} onClick={handleClick}>
      <Image className={styles['img']} src={notification.extra?.mainImages || logo} width="240" height="130" alt={notification.extra?.meetingTitle ? `${notification.extra.meetingTitle} 모임 이미지` : '알림 이미지'} />
      <div className={styles['txt']}>
        <span>{notification.extra?.meetingTitle}</span>
        <p>{notification.content}</p>
      </div>
      <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16.7233 5.70592C17.0922 5.31548 17.0922 4.6814 16.7233 4.29096L12.9454 0.292831C12.5764 -0.0976105 11.9773 -0.0976105 11.6083 0.292831C11.2394 0.683273 11.2394 1.31735 11.6083 1.70779L13.7747 4.00047H0.944485C0.422067 4.00047 0 4.44713 0 5C0 5.55287 0.422067 5.99953 0.944485 5.99953H13.7747L11.6083 8.29221C11.2394 8.68265 11.2394 9.31673 11.6083 9.70717C11.9773 10.0976 12.5764 10.0976 12.9454 9.70717L16.7233 5.70904V5.70592Z"
          fill="black"
        />
      </svg>
    </Link>
  );
}