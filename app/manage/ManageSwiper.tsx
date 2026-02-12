'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './ManageAllPage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Meetings } from '@/types/meetings';
import { getAgeText, getGenderText } from '@/lib/common';

// 날짜 포맷 변환 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hour12 = hours % 12 || 12;
  return `${year}.${month}.${day}(${dayName}) ${period} ${hour12}:00`;
};

function MeetingCard({ meeting }: { meeting: Meetings }) {
  return (
    <article className={style.card}>
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
      <Link href={`/manage/${meeting._id}`} className={style.arrowIcon} aria-label={`${meeting.name} 신청자 관리`}>
        <Image src="/icon/arrow.svg" alt="" width={20} height={20} />
      </Link>
    </article>
  );
}

interface ManageSwiperProps {
  meetings: Meetings[];
}

export default function ManageSwiper({ meetings }: ManageSwiperProps) {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={40}
      slidesPerView={'auto'}
      centeredSlides={true}
      pagination={{ clickable: true }}
      className={style.swiper}
      breakpoints={{
        0: { enabled: false, centeredSlides: false },
        1024: { enabled: true, centeredSlides: true },
      }}
    >
      {meetings.map((meeting) => (
        <SwiperSlide className={style.swiperSlide} key={meeting._id}>
          <MeetingCard meeting={meeting} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}