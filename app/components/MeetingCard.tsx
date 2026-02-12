'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookmarkButton from '@/app/components/BookmarkButton';
import Image from 'next/image';
import style from '@/app/(view)/bookmarks/Bookmarks.module.css';
import { Meetings } from '@/types/meetings';
import { formatDate, getAgeText, getGenderText } from '@/lib/common';
import { getDetail } from '@/lib/meetings';

interface MeetingCardProps {
  meeting?: Meetings;
  meetingId?: number;
}

//카드 컴포넌트 분리
export function MeetingCard({ meeting: initialMeeting, meetingId }: MeetingCardProps) {
  const [meeting, setMeeting] = useState<Meetings | null>(initialMeeting || null);
  const [loading, setLoading] = useState(!initialMeeting && !!meetingId);

  useEffect(() => {
    if (!initialMeeting && meetingId) {
      const fetchMeeting = async () => {
        try {
          const res = await getDetail(String(meetingId));
          if ('item' in res && res.item) {
            setMeeting(res.item);
          }
        } catch (error) {
          console.error('모임 정보 조회 에러:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMeeting();
    }
  }, [initialMeeting, meetingId]);

  if (loading) {
    return <article className={style.card}>로딩중...</article>;
  }

  if (!meeting) {
    return null;
  }

  return (
    <article className={style.card}>
      <div className={style.bookmarkIcon}>
        <BookmarkButton meetingId={meeting._id} width={23} height={29} />
      </div>
      <div className={style.cardContent}>
        <div className={style.imageWrapper}>
          <div
            className={style.characterImage}
            role="img"
            aria-label={`${meeting.name} 모임 대표 이미지`}
            style={{
              backgroundImage: meeting.mainImages?.[0]?.path ? `url(${meeting.mainImages[0].path})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className={style.infoWrapper}>
          <h2 className={style.cardTitle}>{meeting.name}</h2>
          <ul className={style.infoList}>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/tag.svg" width={18} height={18} alt="장소 아이콘" />
              </span>
              <p>
                {meeting.extra.region}. {meeting.extra.category}
              </p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/info.svg" width={18} height={18} alt="정보 아이콘" />
              </span>
              <p>
                {getAgeText(meeting.extra.age)}, {getGenderText(meeting.extra.gender)}
              </p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/people.svg" width={18} height={18} alt="사람들 아이콘" />
              </span>
              <p>인원 {meeting.quantity}명</p>
            </li>
            <li className={style.infoItem}>
              <span className={style.bullet} aria-hidden="true">
                <Image src="/icon/calendar.svg" width={18} height={18} alt="날짜 아이콘" />
              </span>
              <p>{formatDate(meeting.extra.date)}</p>
            </li>
          </ul>
        </div>
      </div>
      <Link href={`/meetings/${meeting._id}`} className={style.arrowIcon} aria-label={`${meeting.name} 상세보기`}>
        <Image src="/icon/arrow.svg" alt="" width={20} height={20} />
      </Link>
    </article>
  );
}
