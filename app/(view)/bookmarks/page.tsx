import style from './Bookmarks.module.css';
import DefaultLayout from '@/app/components/DefaultLayout';
import BookmarkContent from './BookmarkContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '북마크',
  description: '내가 북마크한 모임 목록을 확인하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookmarksPage() {
  return (
    <DefaultLayout>
      <main className={style.container}>
        <div className={style.contentWrapper}>
          <h1 className={style.title}>북마크</h1>
          <BookmarkContent />
        </div>
      </main>
    </DefaultLayout>
  );
}
