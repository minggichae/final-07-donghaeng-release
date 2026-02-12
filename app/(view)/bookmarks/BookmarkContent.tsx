'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import style from './Bookmarks.module.css';
import useUserStore from '@/zustand/userStore';
import { getUserBookmarksList } from '@/lib/bookmarks';
import { Bookmarks } from '@/types/bookmarks';

const BookmarkSwiper = dynamic(() => import('./BookmarkSwiper'), { ssr: false });

export default function BookmarkContent() {
  const { user } = useUserStore();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
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

    const fetchBookmarks = async () => {
      const res = await getUserBookmarksList(accessToken);
      if (!res || res.ok === 0 || !('item' in res)) {
        setIsLoading(false);
        return;
      }

      if (res.item.length === 0) {
        setBookmarks([]);
        setIsEmpty(true);
      } else {
        setBookmarks(res.item);
        setIsEmpty(false);
      }
      setIsLoading(false);
    };

    fetchBookmarks();
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
    return <p className={style.empty}>북마크한 모임이 없습니다.</p>;
  }

  return <BookmarkSwiper bookmarks={bookmarks} />;
}
