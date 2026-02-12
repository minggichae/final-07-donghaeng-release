'use client';

import styles from './Login.module.css';
import { useActionState, useEffect } from 'react';
import { login } from '@/actions/user';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [userState, formActions, isPending] = useActionState(login, null);
  //  폼을 제출하면 로그인 함수 실행. 로그인 결과를 userStage에 저장한다.
  // userState: 로그인 결과(성공/실패), formAction: 폼이 제출될때 실행할 함수, isPending: 로그인 중인지 확인

  const setUser = useUserStore((state) => state.setUser);
  // Zustand에서 유저 정보 저장하는 함수 가져오기

  const fetchBookmarks = useBookmarkStore((state) => state.fetchBookmarks);
  // 로그인 성공하면 북마크 목록을 불러온다

  const { user } = useUserStore();
  const router = useRouter();
  const accessToken = user?.token?.accessToken;
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함

    if (accessToken) {
      router.replace('/');
    }
    // 로그인 했으면 메인 페이지로 강제이동

    const handleLoginSuccess = async () => {
      if (userState?.ok === 1) {
        const accessToken = userState.item.token?.accessToken || '';

        setUser({
          _id: userState.item._id,
          email: userState.item.email,
          name: userState.item.name,
          region: userState.item.region,
          age: userState.item.age,
          gender: userState.item.gender,
          image: userState.item.image,
          comment: userState.item.comment,
          bpm: userState.item.bpm,
          token: {
            accessToken,
            refreshToken: userState.item.token?.refreshToken || '',
          },
        });

        // 로그인 성공 시 북마크 목록 fetch
        if (accessToken) {
          await fetchBookmarks(accessToken);
        }

        router.push('/');
      }
    };

    handleLoginSuccess();
  }, [userState, router, setUser, fetchBookmarks, hasHydrated, accessToken]);

  return (
    <main className={styles['main']}>
      <div className={styles['login-wrap']}>
        <button type="button" className={styles['back-btn']} aria-label="메인으로 이동" onClick={() => router.push('/')}>
          <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.439367 8.09227C-0.146456 8.59433 -0.146456 9.40968 0.439367 9.91175L9.43761 17.6235C10.0234 18.1255 10.9748 18.1255 11.5606 17.6235C12.1465 17.1214 12.1465 16.306 11.5606 15.804L3.62156 9L11.5559 2.19603C12.1418 1.69396 12.1418 0.878612 11.5559 0.376548C10.9701 -0.125516 10.0187 -0.125516 9.43292 0.376548L0.43468 8.08825L0.439367 8.09227Z"
              fill="black"
            />
          </svg>
        </button>
        <div className={styles['logo-img']}>
          <Image src="/logo/logo.svg" alt="Moa 로고" width={220} height={192} priority />
        </div>
        <h1 className="sr-only">로그인</h1>
        <form className={styles['form']} action={formActions} aria-label="로그인 폼">
          <div className={styles['fieldset']}>
            <label htmlFor="email" className={styles['label']}>
              이메일
            </label>
            <input defaultValue="guest@moa.com" className={styles['input']} name="email" type="email" id="email" placeholder="이메일을 입력해 주세요" required />
          </div>

          <div className={styles['fieldset']}>
            <label htmlFor="password" className={styles['label']}>
              비밀번호
            </label>
            <input defaultValue="11111111" className={styles['input']} name="password" type="password" id="password" placeholder="비밀번호를 입력해 주세요" required aria-describedby={userState?.ok === 0 ? 'login-password-error' : undefined} />

            {/* 에러메시지 */}
            {userState?.ok === 0 && (
              <span id="login-password-error" role="alert" className={styles['field-message']}>
                비밀번호를 다시 입력해 주세요
              </span>
            )}
          </div>

          <button type="submit" className={styles['btn']} disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인'}
          </button>
          <Link href="/signup" className={styles['a']}>
            회원가입
          </Link>
          <Link href="/signup" className={styles['login-help']}>
            비밀번호를 잊으셨나요?
          </Link>
        </form>
      </div>
    </main>
  );
}
