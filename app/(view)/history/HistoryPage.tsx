'use client';

import { useState, useEffect } from 'react';
import style from './History.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

//Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useUserStore from '@/zustand/userStore';
import { getMyMeetingsAccess } from '@/lib/meetings';
import { Apply } from '@/types/apply';
import MeetingCard from '@/app/(view)/history/MeetingCard';
import { useRouter } from 'next/navigation'; //next/router면 안됨 사유 우리는 App Router를 쓰니깐@@!
import HistorySwiper from '@/app/(view)/history/HistorySwiper';

export default function HistoryPage() {
  const { user } = useUserStore();
  // zustand에서 유저정보가져오기
  const router = useRouter();
  // 페이지 이동할때 사용
  const [meetings, setMeetings] = useState<Apply[]>([]);
  // 내가 신청한 모임 목록을 저장함
  const accessToken = user?.token?.accessToken;
  // 인증토큰
  const [isEmpty, setIsEmpty] = useState(false);
  // 신청한 모임이 있는지 체크
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  const [isLoading, setIsLoading] = useState(true);
  /*
  zustand의 persist(localStorage) 복원완료의 여부.

  새로고침후 localStorage에서 데이터를 불러오는 시간이 필요하기때문에
  hasHydrated가 false면 복원중이기때문에 기다려야함
  이게 없을경우? 새로고침시 user가 null이 되어서 로그인 페이지로 영원히...간다
  */
  const [filter, setFilter] = useState<'all' | 'before' | 'after'>('before');
  // 참여 전후 필터 상태. 버튼클릭하면 상태가 변경

  const isPastMeeting = (meetingDate: string) => {
    if (!meetingDate) return false;
    // 날짜 데이터가없으면 false로 리턴 일반 카드로 표시 ㅇㅇ
    const today = new Date();
    // 오늘 날짜 객체 생성
    today.setHours(0, 0, 0, 0);
    // 시간을 초기화. 날짜만 비교하려고 같은날이어도 과거/미래로 잘못 판단 할 수 있음
    const meeting = new Date(meetingDate);
    // 모임문자열을 date로 변경
    meeting.setHours(0, 0, 0, 0);
    // 모임날짜도 시간 초기화
    return meeting < today;
    // 날짜비교
  };

  const getFilteredMeetings = () => {
    if (filter === 'all') return meetings;
    // 전체보기면 필터링 안하고 전체 리턴

    return meetings //배열 순회... apply는 각각의 신청객체  Apply는 여러 products(모임들)을 가지고 있음
      .map((apply) => ({
        ...apply, //apply의 모든 속성을 복사.products만 새로 필터링해서 교체할 거임!
        products: apply.products.filter((meeting) => {
          // products의 배열 필터링(모임배열)
          const isPast = isPastMeeting(meeting.extra?.date || '');
          // 이 모임이 과거인지 확인. 날짜가 없으면 빈 문자열로 처리
          return filter === 'after' ? isPast : !isPast;
          /*
            // filter === 'after' (참여 후)
            isPast === true  → true  리턴 → 포함
            isPast === false → false 리턴 → 제외

            ㄴ> 삼항 연산자 앞부분을 실행하니까 과거 모임만 보임!

            // filter === 'before' (참여 전)
            isPast === true  → false 리턴 → 제외
            isPast === false → true  리턴 → 포함

            ㄴ> after가 false니까 삼항 연산자 뒷부분 실행 미래 모임만 보임

            쉽게 설명해서
            if(모임이 과거인가요?) 네!> 보여줌
            if(모임이 과거인가요?) 아니요!> 미래만 보여줌
          */
        }),
      }))
      .filter((apply) => apply.products.length > 0);
    // 빈 apply 객체를 제거. products 필터링 후 모임이 하나도 없는 apply는 버림
  };

  useEffect(() => {
    if (!hasHydrated) return;
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함

    if (!accessToken) {
      router.replace('/login');
    }
    // 로그인 안했으면 로그인 페이지로 강제이동

    const fetchMeetings = async () => {
      const res = await getMyMeetingsAccess(accessToken || ' '); // 내목록 가져와잇
      if (!res || res.ok === 0) return;
      // api 호출 실패하면 함수종료

      if (res.item.length === 0) {
        setMeetings([]);
        setIsEmpty(true);
        // 만약 신청한 모임이 없을경우 빈배열로 설정, '신청한 모임 없음' 메시지 표시
      } else {
        setMeetings(res.item);
        setIsEmpty(false);
        //있으면 res에 데이터 저장,'신모없' 메시지 숨킴
      }
      setIsLoading(false);

      console.log('데이터를 잘 불러와주나요', res, '');
    };

    fetchMeetings();
  }, [hasHydrated, accessToken, router]);
  // [...]: 의존성배열. 이 값들이 바뀌면 useEffect 다시 실행

  if (!accessToken && hasHydrated) {
    return null;
  }
  // 토큰 없으면 아무것도 안보여줌. 위에서 로그인 페이지로 보냈으니까 이코드는 실행이 안되지만 보험용으로 넣어놓음

  const filteredMeetings = getFilteredMeetings();
  // 필터링된 모임 목록 계산. 렌더링할때마다(필터가 바뀔때마다) 다시 계산됨

  return (
    <main className={style.container}>
      {
        <div className={style.contentWrapper}>
          <h1 className={style.title}>모임 조회</h1>
          <div className={style.btnGroup} role="group" aria-label="모임 필터">
            <button className={`${style.allBtn}  ${filter === 'all' ? style.active : ''} `} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              전체
            </button>
            <button className={`${style.beforeBtn}  ${filter === 'before' ? style.active : ''} `} aria-pressed={filter === 'before'} onClick={() => setFilter('before')}>
              참여 전
            </button>
            <button className={`${style.afterBtn} ${filter === 'after' ? style.active : ''} `} aria-pressed={filter === 'after'} onClick={() => setFilter('after')}>
              참여 후
            </button>
          </div>
          {!hasHydrated || isLoading ? (
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
          ) : isEmpty ? (
            <p className={style.empty}>신청한 모임이 없습니다.</p>
          ) : (
            <HistorySwiper filteredMeetings={filteredMeetings} isPastMeeting={isPastMeeting} />
          )}
        </div>
      }
    </main>
  );
}
