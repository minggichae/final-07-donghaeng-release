'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import style from './MeetingList.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

const categoryMap: Record<string, string> = {
  '전체': 'all',
  '운동': 'health',
  '요리 / 제조': 'cook',
  '문화 / 공연 / 축제': 'festival',
  '게임 / 오락': 'arcade',
  '인문학 / 책 / 글': 'book',
  '아웃도어 / 여행': 'outdoor',
  '사교': 'social',
  '음악 / 악기': 'music',
  '업종 / 직무': 'job',
  '외국 / 언어': 'language',
  '공예 / 만들기': 'make',
  '댄스 / 무용': 'dance',
  '봉사활동': 'volunteer',
  '사진 / 영상': 'picture',
  '자기계발': 'self',
  '스포츠 관람': 'sports',
  '반려동물': 'pet',
  '자동차 / 바이크': 'bike',
};

export default function Category() {
  const categories = Object.keys(categoryMap);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategory = (category: string) => {
    const slug = categoryMap[category];
    if (slug) {
      router.push(`/meetings?category=${slug}`);
    }
  };

  return (
    <>
      <aside className={style.sidebar}>
        <div className={style.categoryListDesktop}>
          <ul className={style.categoryList}>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleCategory(category)}
                  className={`${style.categoryItem} ${currentCategory === categoryMap[category] ? style.active : ''}`}
                  aria-current={currentCategory === categoryMap[category] ? 'true' : undefined}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* 모바일: 가로 Swiper 슬라이드 */}
      <div className={style.categoryListMobile}>
        <Swiper
          className={style.categorySwiper}
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
          }}
          spaceBetween={10}
          slidesPerView="auto"
          grabCursor
        >
          {categories.map((category) => (
            <SwiperSlide key={category} className={style.categorySlide}>
              <button
                type="button"
                className={`${style.categoryChip} ${currentCategory === categoryMap[category] ? style.categoryChipActive : ''}`}
                onClick={() => handleCategory(category)}
                aria-current={currentCategory === categoryMap[category] ? 'true' : undefined}
              >
                {category}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}