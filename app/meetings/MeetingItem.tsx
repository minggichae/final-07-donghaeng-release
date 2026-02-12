'use client';

import BookmarkButton from '@/app/components/BookmarkButton';
import style from './MeetingList.module.css';
import Link from 'next/link';
import { Meetings } from '@/types/meetings';
import { formatDate } from '@/lib/common';

export default function MeetingItem({ meeting }: { meeting: Meetings }) {
  console.log('meeting', meeting);
  return (
    <li className={style.card}>
      <Link href={`/meetings/${meeting._id}`} aria-label={`${meeting.name} 상세보기`}>
        <figure className={style.meetingCard}>
          <div
            className={style.cardImage}
            role="img"
            aria-label={`${meeting.name} 모임 이미지`}
            style={{
              backgroundImage: meeting.mainImages?.[0]?.path ? `url(${meeting.mainImages[0].path})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <figcaption className={style.cardContent}>
            <div className={style.cardHeader}>
              <h3 className={style.cardTitle}>{meeting.name}</h3>
              <div className={style.bookmarkIcon}>
                <BookmarkButton desktopWidth={27} desktopHeight={35} meetingId={meeting._id} />
              </div>
            </div>
            <ul className={style.cardMetadata}>
              <li className={style.rowWrap}>
                <span className={style.metadataLine}>{formatDate(meeting.extra.date)}</span>
                <span className={style.divider} aria-hidden="true"></span>
                <span className={style.metadataLine}>{meeting.extra.gender}</span>
                <span className={style.divider} aria-hidden="true"></span>
                <span className={style.metadataLine}>{meeting.extra.age}대</span>
              </li>
              <li className={style.rowWrap}>
                <span className={style.metadataLine2}>{meeting.extra.region}</span>
              </li>
            </ul>
          </figcaption>
        </figure>
      </Link>
    </li>
  );
}