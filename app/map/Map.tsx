'use client';

import tag from '@/public/icon/tag.svg';
import calender from '@/public/icon/calendar.svg';
import logo from '@/public/logo/logo.svg';
import styles from './Map.module.css';
import Filter from '@/app/components/Filter';
import DefaultLayout from '@/app/components/DefaultLayout';
import Image from 'next/image';
import KakaoMap from './KakaoMap';
import { useState } from 'react';
import { Meetings } from '@/types/meetings';
import useFilter from '@/hooks/useFilter';

interface MapProps {
  meetings: Meetings[];
}

export default function Map({ meetings }: MapProps) {
  // 모임 리스트에서 모임 클릭 시 id를 저장할 state
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 필터링된 모임 가져오기(useFilter 사용)
  const { filteredMeetings, handleFilterChange } = useFilter(meetings);

  return (
    <DefaultLayout hideFooter>
      <main className={styles['map-body']}>
        <div className={styles['filter-div']}>
          {/* onFilterChanges: 사용자가 정의한 함수명
            onChange는 React에서 콜백 props의 관례이기 때문에 이를 피하기 위함
             */}
          <Filter onFilterChanges={handleFilterChange} />
        </div>
        <div className={styles['map-meeting-div']}>
          <div className={styles['meeting-list']}>
            {filteredMeetings.length === 0 ? (
              <p className={styles['none-data']}>조건에 맞는 모임이 없습니다.</p>
            ) : (
            <ul>
              {filteredMeetings.map((meeting) => (
                // li 클릭 시 해당되는 모임 id 저장
                <li
                  key={meeting._id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${meeting.name} 선택`}
                  onClick={() => {
                    console.log('클릭한 모임 id:', meeting._id);
                    setSelectedId(meeting._id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(meeting._id);
                    }
                  }}
                >
                  <Image src={meeting.mainImages[0]?.path || logo.src} className={styles['meeting-img']} alt={`${meeting.name} 모임 사진`} width={90} height={80} />
                  <dl className={styles['meeting-info-li-div']}>
                    <dt>{meeting.name}</dt>
                    <dd>
                      <Image src={tag.src} alt="" aria-hidden="true" width={20} height={12} />
                      {meeting.extra.region} . {meeting.extra.category}
                    </dd>
                    <dd>
                      <Image src={calender.src} alt="" aria-hidden="true" width={20} height={12} /> {meeting.extra.date}
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
            )}
          </div>

          {/* props로 필요한 정보들 전달 */}
          <KakaoMap width="100%" lat={37.5709} lng={126.978} className={styles.map} meetings={filteredMeetings} selectedId={selectedId} mapPage={true} />
        </div>
      </main>
    </DefaultLayout>
  );
}