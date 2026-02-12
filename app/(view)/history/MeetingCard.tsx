import Link from 'next/link';
import styles from './History.module.css';
import { Meetings } from '@/types/meetings';
import Image from 'next/image';

//카드 컴포넌트 분리
export default function MeetingCard({ meeting, isPast = false }: { meeting: Meetings; isPast?: boolean }) {
  // products[0]에서 실제 모임 데이터 추출

  console.log('=== MeetingCard 디버깅 ===');
  console.log('product:', meeting);

  // 안전하게 이미지 URL 처리
  const imageUrl = meeting.image?.path || '/images/default-img.png';

  return (
    <article className={`${styles.card} ${isPast ? styles['past-meeting'] : ''}`}>
      <div className={styles.cardContent}>
        <div className={styles.imageWrapper}>
          <Image className={styles.characterImage} src={imageUrl} width={130} height={130} alt={`${meeting.name} 모임 대표 이미지`} unoptimized />
        </div>
        <div className={styles.infoWrapper}>
          <h2 className={styles.cardTitle}>{meeting.name}</h2>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <span className={styles.bullet} aria-hidden="true">
                <Image src="/icon/tag.svg" width={18} height={18} alt="장소 아이콘" />
              </span>
              <p>{meeting.extra?.region || '지역 미정'}</p>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.bullet} aria-hidden="true">
                <Image src="/icon/info.svg" width={18} height={18} alt="정보 아이콘" />
              </span>
              <p>
                {meeting.extra?.age || '연령 미정'}대, {meeting.extra?.gender || '성별 무관'}
              </p>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.bullet} aria-hidden="true">
                <Image src="/icon/people.svg" width={18} height={18} alt="사람들 아이콘" />
              </span>
              <p>인원 {meeting.quantity || 0}명</p>
            </li>
            <li className={styles.infoItem}>
              <span className={styles.bullet} aria-hidden="true">
                <Image src="/icon/calendar.svg" width={18} height={18} alt="날짜 아이콘" />
              </span>
              <p>{meeting.extra?.date || '날짜 미정'}</p>
            </li>
          </ul>
        </div>
      </div>
      <Link href={`/meetings/${meeting._id}`} className={styles.arrowIcon} aria-label={`${meeting.name} 상세보기`}>
        <Image src="/icon/arrow.svg" alt="" width={19} height={12} />
      </Link>
    </article>
  );
}
