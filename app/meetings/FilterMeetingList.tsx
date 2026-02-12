'use client';

import { getMeetings } from '@/lib/meetings';
import style from './MeetingList.module.css';
import MeetingItem from '@/app/meetings/MeetingItem';
import Filter from '@/app/components/Filter';
import useFilter from '@/hooks/useFilter';
import { useEffect, useState } from 'react';
import { Meetings } from '@/types/meetings';
export default function FilterMeetingList({ keyword, category }: { keyword?: string; category?: string }) {
  // api 데이터를 저장하는 배열
  const [meetings, setMeetings] = useState<Meetings[]>([]);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // api 호출해서 모임 정보를 가져오는 useEffect (카테고리가 변경될 때마다 다시 호출)
  useEffect(() => {
    const fetchMeetings = async () => {
      setIsLoading(true);
      const res = await getMeetings(keyword, category);
      if (res.ok === 1) {
        setMeetings(res.item);
      }
      setIsLoading(false);
    };
    fetchMeetings();
  }, [category]);

  // 필터링된 모임 가져오기(useFilter 사용) - 날짜, 성별, 나이대, 지역, 인원 필터링
  const { filteredMeetings, handleFilterChange } = useFilter(meetings);

  return (
    <div className={style.meetingBorder}>
      <div className={style.filterBar}>
        <Filter onFilterChanges={handleFilterChange} showCategory={false} />
      </div>
      {isLoading ? (
        <ul className={style.meetingGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className={style.card}>
              <div className={style.skeletonCard}>
                <div className={style.skeletonImage} />
                <div className={style.skeletonContent}>
                  <div className={style.skeletonTitle} />
                  <div className={style.skeletonMeta} />
                  <div className={style.skeletonMetaShort} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : meetings.length > 0 ? (
        filteredMeetings.length > 0 ? (
          <ul className={style.meetingGrid}>
            {filteredMeetings.map((meeting) => (
              <MeetingItem key={meeting._id} meeting={meeting} />
            ))}
          </ul>
        ) : (
          <p className={style['none-data']}>조건에 맞는 모임이 없습니다.</p>
        )
      ) : (
        <p className={style['none-data']}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
