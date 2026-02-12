'use client';

import DefaultLayout from '@/app/components/DefaultLayout';
import styles from './Notifications.module.css';
import { useNoti } from '@/hooks/useNoti';
import NotificationItem from './NotificationItem';
import useUserStore from '@/zustand/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Notifications() {
  // useNoti 훅 사용 { 알람, 전체 읽기, 전체 삭제 }
  const { notifications, markAllRead, markOneRead, isLoaded } = useNoti();

  // zustand에서 유저정보 가져오기
  const { user } = useUserStore();
  // 토큰 가져오기
  const accessToken = user?.token?.accessToken;
  // 페이지 이동 처리
  const router = useRouter();

  // zustand의 복원 여부 확인
  // 로컬스토리지 복원이 끝나기 전에 잘못된 리다이렉트가 발생하는 걸 방지
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  // 토큰이 없는 경우 강제 이동
  useEffect(() => {
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace('/login');
    }
  }, [hasHydrated, accessToken, router]);

  return (
    <DefaultLayout>
      <main className={styles['main']}>
        <div className={styles['notifications-wrap']}>
          <h2>알림</h2>
          <div className={styles['btn']}>
            <button type="button" onClick={markAllRead}>
              전체 읽음
            </button>
          </div>
          <div aria-live="polite">
            {!isLoaded ? (
              <div className={styles['notifications-wrap']}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles['skeleton-item']}>
                    <div className={styles['skeleton-img']} />
                    <div className={styles['skeleton-txt']}>
                      <div className={styles['skeleton-title']} />
                      <div className={styles['skeleton-desc']} />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <div className={styles['notifications-wrap']}>
                {/* 맵을 생성하면서 알림 아이템 컴포넌트 불러오기 */}
                {notifications.map((noti) => (
                  <NotificationItem key={noti._id} notification={noti} isRead={noti.isRead} markOneRead={markOneRead} />
                ))}
              </div>
            ) : (
              <p>알림이 없습니다.</p>
            )}
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
