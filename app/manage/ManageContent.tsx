'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import style from './ManageAllPage.module.css';
import useUserStore from '@/zustand/userStore';
import { getMyAddMeetings } from '@/lib/meetings';
import { Meetings } from '@/types/meetings';

const ManageSwiper = dynamic(() => import('./ManageSwiper'), { ssr: false });

export default function ManageContent() {
  const router = useRouter();
  const { user } = useUserStore();
  const [meetings, setMeetings] = useState<Meetings[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    const fetchMyAddMeetings = async () => {
      const response = await getMyAddMeetings(accessToken);

      if (response.ok === 1) {
        setMeetings(response.item);
        setIsEmpty(response.item.length === 0);
      }
      setIsLoading(false);
    };

    fetchMyAddMeetings();
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || isLoading) {
    return (
      <div className={style['skeleton-list']}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={style['skeleton-card']}>
            <div className={style['skeleton-img']} />
            <div className={style['skeleton-info']}>
              <div className={style['skeleton-title']} />
              <div className={style['skeleton-line']} />
              <div className={style['skeleton-line']} />
              <div className={style['skeleton-line-short']} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!accessToken) return null;

  if (isEmpty) {
    return <p className={style.empty}>등록한 모임이 없습니다.</p>;
  }

  return <ManageSwiper meetings={meetings} />;
}
