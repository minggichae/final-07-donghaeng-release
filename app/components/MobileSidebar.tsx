'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileSidebar.module.css';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const isLogin = useUserStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetBookmark = useBookmarkStore((state) => state.resetBookmark);
  const pathname = usePathname();
  const userName = user?.name ?? '사용자';

  const handleLogout = () => {
    resetUser();
    resetBookmark();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* 사이드바 열렸을 때 뒷배경을 검고 반투명 하게 할 장치 */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} role="button" tabIndex={isOpen ? 0 : -1} aria-label="사이드바 닫기" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }} />
      <nav aria-label="모바일 메뉴" className={`${styles['section-wrapper']} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
        {isLogin ? (
          <div className={styles[`sidebar-wrapper`]}>
            <div className={styles[`menu-username-wrapper`]}>
              <div className={styles[`name-wrapper`]}>
                <div>
                  <span className={styles[`username`]}>{userName}</span>
                  <span> 님</span>
                </div>
                <h3>반가워요!</h3>
              </div>
              <ul>
                <li>
                  <Link href="/mypage" aria-current={pathname.startsWith('/mypage') ? 'page' : undefined}>마이페이지</Link>
                </li>
                <li>
                  <Link href="/meetings" aria-current={pathname.startsWith('/meetings') ? 'page' : undefined}>모임</Link>
                </li>
                <li>
                  <Link href="/bookmarks" aria-current={pathname.startsWith('/bookmarks') ? 'page' : undefined}>북마크</Link>
                </li>
                <li>
                  <Link href="/history" aria-current={pathname.startsWith('/history') ? 'page' : undefined}>모임 조회</Link>
                </li>
                <li>
                  <Link href="/map" aria-current={pathname.startsWith('/map') ? 'page' : undefined}>모임 지도</Link>
                </li>
              </ul>
            </div>
            <button className={styles[`logout-btn`]} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <ul className={styles[`menu-wrapper`]}>
            <li>
              <Link href="/login" aria-current={pathname === '/login' ? 'page' : undefined}>로그인</Link>
            </li>
            <li>
              <Link href="/signup" aria-current={pathname === '/signup' ? 'page' : undefined}>회원가입</Link>
            </li>
            <li>
              <Link href="/meetings" aria-current={pathname.startsWith('/meetings') ? 'page' : undefined}>모임</Link>
            </li>
            <li>
              <Link href="/map" aria-current={pathname.startsWith('/map') ? 'page' : undefined}>모임 지도</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
