'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import MobileSidebar from '../components/MobileSidebar';
import { useState } from 'react';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';
import ChatNotification from '@/app/chat/ChatBadge';

export default function Header() {
  const isLogin = useUserStore((state) => state.isLogin);
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetBookmark = useBookmarkStore((state) => state.resetBookmark);

  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = () => {
    resetUser();
    resetBookmark();
  };

  // 햄버거 버튼 클릭 핸들러
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={styles[`header-wrapper`]}>
        <div className={styles[`header-container`]}>
          <div className={styles[`logo-wrapper`]}>
            <Link href="/">
              <Image src="/logo/logo.svg" width={40} height={35} alt="Moa 홈" />
            </Link>
          </div>

          {/* 데스크탑 메뉴 */}
          <nav aria-label="메인 메뉴" className={styles[`meetings-wrapper`]}>
            <ul>
              <li>
                <Link href="/meetings" aria-current={pathname.startsWith('/meetings') ? 'page' : undefined}>모임</Link>
              </li>
              <li>
                <Link href="/map" aria-current={pathname.startsWith('/map') ? 'page' : undefined}>지도</Link>
              </li>
              {/* <li>
              <Link href="/bookmarks">북마크</Link>
            </li>
            <li>
              <Link href="/history">모임 조회</Link>
            </li> */}
            </ul>
          </nav>

          {/* 데스크탑 유저 정보 */}
          {isLogin ? (
            <div className={styles[`user-info-wrapper`]}>
              <ul>
                <li>
                  <button className={styles[`logout-btn`]} onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
                <li>
                  <ChatNotification />
                </li>
                <li>
                  <Link href="/notifications">
                    <Image src="/icon/notification.svg" width={43} height={50} alt="알림" />
                  </Link>
                </li>
                <li>
                  <Link href="/mypage">
                    <div className={styles[`image-background`]}>
                      <Image src={user?.image || '/icon/profile.svg'} width={41} height={41} alt="사용자 프로필 이미지" />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles[`sign-wrapper`]}>
              <ul>
                <li>
                  <Link href="/login">로그인</Link>
                </li>
                <li>
                  <Link href="/signup">회원가입</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 모바일 메뉴 */}
          <div className={styles[`mobile-menu`]}>
            <ChatNotification />
            <Link href="/notifications">
              <Image src="/icon/notification.svg" width={25} height={30} alt="알림" />
            </Link>
            <button className={styles[`hamburger-btn`]} onClick={toggleSidebar} aria-expanded={isSidebarOpen} aria-label="메뉴 열기">
              <Image src="/icon/hamburger.svg" width={30} height={28} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
