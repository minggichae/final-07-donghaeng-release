'use client';

import profile from '@/public/icon/profile.svg';
import pencil from '@/public/icon/pencil.svg';
import styles from './MyPage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import DefaultLayout from '@/app/components/DefaultLayout';
import useUserStore from '@/zustand/userStore';
import useBookmarkStore from '@/zustand/bookmarkStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyMeetings } from '@/lib/meetings';

export default function MyPage() {
  // zustand에서 유저정보 가져오기
  const { user } = useUserStore();

  // zustand에서 북마크 가져오기
  const { bookmarks } = useBookmarkStore();

  // 토큰 가져오기
  const accessToken = user?.token?.accessToken;
  // 페이지 이동 처리
  const router = useRouter();

  // zustand의 복원 여부 확인
  // 로컬스토리지 복원이 끝나기 전에 잘못된 리다이렉트가 발생하는 걸 방지
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  // 참여 완료 모임 수 상태
  const [completedCount, setCompletedCount] = useState(0);

  // 모임 날짜가 과거인지 확인하는 함수
  const isPastMeeting = (meetingDate: string) => {
    // 날짜가 없으면 false 반환
    if (!meetingDate) return false;
    // 오늘 날짜 받기
    const today = new Date();
    // 시간을 00:00:00.000으로 설정
    today.setHours(0, 0, 0, 0);
    // 모임 날짜 받기
    const meeting = new Date(meetingDate);
    // 시간을 00:00:00.000으로 설정
    meeting.setHours(0, 0, 0, 0);
    // 시간을 00으로 설정하는 이유는 같은날 시간이 다르더라도 날짜비교를 위해 시간을 제외
    // 오늘 날짜보다 모임 날짜가 작으면 true 반환
    return meeting < today;
  };

  // 참여 완료 모임 수 가져오기
  useEffect(() => {
    // 로컬 스토리지 복원 안끝났으면 아무것도 하지 않고 반환
    if (!hasHydrated || !accessToken) return;

    // 참여 완료 모임 수 가져오기
    const fetchCompletedCount = async () => {
      const res = await getMyMeetings(accessToken);
      if (!res || res.ok === 0) return;

      // 참여 완료(과거) 모임 수 계산
      // 참여 모임 수 초기화
      let count = 0;
      // 참여 모임 수 계산
      res.item.forEach((apply) => {
        apply.products.forEach((meeting) => {
          // 모임이 과거인 경우 카운트 증가
          if (isPastMeeting(meeting.extra?.date || '')) {
            count++;
          }
        });
      });
      // 참여 완료 모임 수 상태 업데이트
      setCompletedCount(count);
    };

    fetchCompletedCount();
  }, [hasHydrated, accessToken]);

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
      <main className={styles['mypage-body']}>
        <h1>마이 페이지</h1>
        <div className={styles['profile-information-div']}>
          <div className={styles['profile-information']}>
            <div className={styles['profile-img-wrapper']}>
              <Image src={user?.image || profile.src} alt={`${user?.name || '사용자'} 프로필 이미지`} width={135} height={135} className={styles['profile-img']} />
              <Link href={`/mypage/modify/${user?._id}`} className={styles['pencil-btn']} aria-label="프로필 수정">
                <Image src={pencil} alt="" width={24} height={24} />
              </Link>
            </div>
            <div className={styles['user-info-mobile']}>
              <p className={styles.nickname}>{user?.name}</p>
              <p className={styles.email}>{user?.email}</p>
              <p className={styles.etc}>
                {user?.gender} <span aria-hidden="true">|</span> {user?.age}대 <span aria-hidden="true">|</span> {user?.region}
              </p>

              <figure>
                <svg width="57" height="51" viewBox="0 0 57 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M28.3333 51C27.4833 51 26.6688 50.8465 25.8896 50.5396C25.1104 50.2326 24.4139 49.7722 23.8 49.1583L4.81667 30.1042C3.16389 28.4514 1.94792 26.5625 1.16875 24.4375C0.389583 22.3125 0 20.0931 0 17.7792C0 12.9153 1.58194 8.73611 4.74583 5.24167C7.90972 1.74722 11.8528 0 16.575 0C18.8417 0 20.9785 0.448611 22.9854 1.34583C24.9924 2.24306 26.775 3.49444 28.3333 5.1C29.8444 3.49444 31.6035 2.24306 33.6104 1.34583C35.6174 0.448611 37.7542 0 40.0208 0C44.7431 0 48.6979 1.74722 51.8854 5.24167C55.0729 8.73611 56.6667 12.8917 56.6667 17.7083C56.6667 20.0222 56.2653 22.2417 55.4625 24.3667C54.6597 26.4917 53.4556 28.3806 51.85 30.0333L32.7958 49.1583C32.1819 49.7722 31.4972 50.2326 30.7417 50.5396C29.9861 50.8465 29.1833 51 28.3333 51ZM31.1872 14.875C31.5513 14.875 31.875 14.9694 32.1583 15.1583C32.4417 15.3472 32.7014 15.5833 32.9375 15.8667L37.9667 23.375H51.2925C51.6675 22.4575 51.9485 21.5265 52.1355 20.582C52.3229 19.6376 52.4167 18.6797 52.4167 17.7083C52.4167 14.0722 51.2373 10.9201 48.8785 8.25208C46.5203 5.58403 43.5722 4.25 40.0343 4.25C38.3725 4.25 36.7743 4.59236 35.2396 5.27708C33.7049 5.96181 32.3708 6.91806 31.2375 8.14583L29.325 10.2C29.1833 10.3417 29.0417 10.4597 28.9 10.5542C28.7583 10.6486 28.5694 10.6958 28.3333 10.6958C28.0972 10.6958 27.8932 10.6514 27.7213 10.5627C27.5499 10.4734 27.3997 10.3525 27.2708 10.2L25.3583 8.14583C24.2122 6.92656 22.8749 5.97243 21.3463 5.28346C19.8182 4.59449 18.2278 4.25 16.575 4.25C13.0536 4.25 10.119 5.58261 7.77113 8.24783C5.42371 10.9131 4.25 14.0666 4.25 17.7083C4.25 18.6868 4.34444 19.6515 4.53333 20.6026C4.72222 21.5536 4.99729 22.4778 5.35854 23.375H19.8333C20.1913 23.375 20.531 23.4602 20.8526 23.6307C21.1747 23.8012 21.4252 24.0229 21.6042 24.2958L24.8625 29.2542L29.1125 16.3625C29.2579 15.9375 29.5219 15.5833 29.9044 15.3C30.2864 15.0167 30.714 14.875 31.1872 14.875ZM31.8042 21.7458L27.4833 34.6375C27.3431 35.0625 27.0798 35.4167 26.6935 35.7C26.3073 35.9833 25.8858 36.125 25.4292 36.125C25.0514 36.125 24.7208 36.0306 24.4375 35.8417C24.1542 35.6528 23.9181 35.4167 23.7292 35.1333L18.7 27.625H8.35833L26.8458 46.1125C27.0819 46.3486 27.3133 46.5139 27.54 46.6083C27.7667 46.7028 28.0311 46.75 28.3333 46.75C28.6356 46.75 28.9 46.7028 29.1267 46.6083C29.3533 46.5139 29.5847 46.3486 29.8208 46.1125L48.2375 27.625H36.8333C36.4556 27.625 36.125 27.5306 35.8417 27.3417C35.5583 27.1528 35.2986 26.9167 35.0625 26.6333L31.8042 21.7458Z"
                    fill="#C5BAFF"
                  />
                </svg>
                <figcaption>
                  70 <br />
                  bpm
                </figcaption>
              </figure>
            </div>
            <div className={styles['user-info-desktop']}>
              <div className={styles['user-info-top']}>
                <div>
                  <p className={styles.nickname}>{user?.name}</p>
                  <p className={styles.email}>{user?.email}</p>
                  <p className={styles.etc}>
                    {user?.gender} | {user?.age}대 | {user?.region}
                  </p>
                </div>

                <figure>
                  <svg width="57" height="51" viewBox="0 0 57 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M28.3333 51C27.4833 51 26.6688 50.8465 25.8896 50.5396C25.1104 50.2326 24.4139 49.7722 23.8 49.1583L4.81667 30.1042C3.16389 28.4514 1.94792 26.5625 1.16875 24.4375C0.389583 22.3125 0 20.0931 0 17.7792C0 12.9153 1.58194 8.73611 4.74583 5.24167C7.90972 1.74722 11.8528 0 16.575 0C18.8417 0 20.9785 0.448611 22.9854 1.34583C24.9924 2.24306 26.775 3.49444 28.3333 5.1C29.8444 3.49444 31.6035 2.24306 33.6104 1.34583C35.6174 0.448611 37.7542 0 40.0208 0C44.7431 0 48.6979 1.74722 51.8854 5.24167C55.0729 8.73611 56.6667 12.8917 56.6667 17.7083C56.6667 20.0222 56.2653 22.2417 55.4625 24.3667C54.6597 26.4917 53.4556 28.3806 51.85 30.0333L32.7958 49.1583C32.1819 49.7722 31.4972 50.2326 30.7417 50.5396C29.9861 50.8465 29.1833 51 28.3333 51ZM31.1872 14.875C31.5513 14.875 31.875 14.9694 32.1583 15.1583C32.4417 15.3472 32.7014 15.5833 32.9375 15.8667L37.9667 23.375H51.2925C51.6675 22.4575 51.9485 21.5265 52.1355 20.582C52.3229 19.6376 52.4167 18.6797 52.4167 17.7083C52.4167 14.0722 51.2373 10.9201 48.8785 8.25208C46.5203 5.58403 43.5722 4.25 40.0343 4.25C38.3725 4.25 36.7743 4.59236 35.2396 5.27708C33.7049 5.96181 32.3708 6.91806 31.2375 8.14583L29.325 10.2C29.1833 10.3417 29.0417 10.4597 28.9 10.5542C28.7583 10.6486 28.5694 10.6958 28.3333 10.6958C28.0972 10.6958 27.8932 10.6514 27.7213 10.5627C27.5499 10.4734 27.3997 10.3525 27.2708 10.2L25.3583 8.14583C24.2122 6.92656 22.8749 5.97243 21.3463 5.28346C19.8182 4.59449 18.2278 4.25 16.575 4.25C13.0536 4.25 10.119 5.58261 7.77113 8.24783C5.42371 10.9131 4.25 14.0666 4.25 17.7083C4.25 18.6868 4.34444 19.6515 4.53333 20.6026C4.72222 21.5536 4.99729 22.4778 5.35854 23.375H19.8333C20.1913 23.375 20.531 23.4602 20.8526 23.6307C21.1747 23.8012 21.4252 24.0229 21.6042 24.2958L24.8625 29.2542L29.1125 16.3625C29.2579 15.9375 29.5219 15.5833 29.9044 15.3C30.2864 15.0167 30.714 14.875 31.1872 14.875ZM31.8042 21.7458L27.4833 34.6375C27.3431 35.0625 27.0798 35.4167 26.6935 35.7C26.3073 35.9833 25.8858 36.125 25.4292 36.125C25.0514 36.125 24.7208 36.0306 24.4375 35.8417C24.1542 35.6528 23.9181 35.4167 23.7292 35.1333L18.7 27.625H8.35833L26.8458 46.1125C27.0819 46.3486 27.3133 46.5139 27.54 46.6083C27.7667 46.7028 28.0311 46.75 28.3333 46.75C28.6356 46.75 28.9 46.7028 29.1267 46.6083C29.3533 46.5139 29.5847 46.3486 29.8208 46.1125L48.2375 27.625H36.8333C36.4556 27.625 36.125 27.5306 35.8417 27.3417C35.5583 27.1528 35.2986 26.9167 35.0625 26.6333L31.8042 21.7458Z"
                      fill="#C5BAFF"
                    />
                  </svg>
                  <figcaption>
                    {user?.bpm || 70} <br />
                    bpm
                  </figcaption>
                </figure>
              </div>
              <div className={styles['my-introduce-desktop']}>
                <p>{user?.comment || '소개를 적는 공간'}</p>
              </div>
            </div>
          </div>

          <div className={styles['my-introduce-mobile']}>
            <dl>
              <dt>소개</dt>
              <dd>{user?.comment || '소개를 적는 공간'}</dd>
            </dl>
          </div>
          <div className={styles['history-meetings']}>
            <p>
              <span className={styles['meetings-text']}>관심 모임 </span>
              <span className={styles['meetings-number']}>{bookmarks.length}</span>
            </p>

            <span aria-hidden="true">|</span>
            <p>
              <span className={styles['meetings-text']}>참여 완료</span>
              <span className={styles['meetings-number']}>{completedCount}</span>
            </p>
          </div>
          <div className={styles['history-button']}>
            <Link href="/bookmarks" className={styles['btn-bookmark']}>
              북마크
            </Link>
            <Link href="/manage" className={styles['btn-manage']}>
              관리하기
            </Link>
            <Link href="/history" className={styles['btn-attend-meetings']}>
              참여 모임
            </Link>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}