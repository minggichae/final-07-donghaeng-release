'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './History.module.css';
import MeetingCard from '@/app/(view)/history/MeetingCard';
import { Apply } from '@/types/apply';

interface HistorySwiperProps {
  filteredMeetings: Apply[];
  isPastMeeting: (date: string) => boolean;
}

export default function HistorySwiper({ filteredMeetings, isPastMeeting }: HistorySwiperProps) {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={40}
      slidesPerView={'auto'}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      className={style.swiper}
      breakpoints={{
        0: {
          enabled: false, // 모바일
          centeredSlides: false,
        },
        1024: {
          enabled: true, // 웹
          centeredSlides: true,
        },
      }}
    >
      {filteredMeetings.map((apply) =>
        apply.products.map((meeting) => (
          <SwiperSlide key={meeting._id}>
            <MeetingCard meeting={meeting} isPast={isPastMeeting(meeting.extra?.date || '')} />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}
