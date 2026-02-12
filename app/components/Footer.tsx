import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles[`footer-wrapper`]}>
      <div className={styles[`inner-wrapper`]}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src="/logo/logo.svg" alt="Moa 로고" width={60} height={53} />
            <p className={styles.description}>취미와 관심사를 함께할 사람을 찾아보세요!</p>
          </div>
          <div className={styles.contact}>
            <strong>고객센터</strong>
            <p>
              운영시간 09:00 ~ 18:00 (주말·공휴일 제외) | 문의 <strong>support@moa.co.kr</strong>
            </p>
          </div>
        </div>

        <nav aria-label="하단 메뉴" className={styles.nav}>
          <Link href="/terms">이용약관</Link>
          <span className={styles.divider} aria-hidden="true">|</span>
          <Link href="/privacy">개인정보처리방침</Link>
          <span className={styles.divider} aria-hidden="true">|</span>
          <Link href="/faq">FAQ</Link>
        </nav>

        <div className={styles.info}>
          <span>상호명: Moa</span>
          <span>대표자: Moa_채민기, 김지안, 김현주, 유현욱</span>
          <span>사업자등록번호: 15-48-26951</span>
          <span>주소: 서울특별시 강남구 테헤란로 587</span>
        </div>

        <small className={styles.copyright}>
          © 2026 <strong>Moa</strong>. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}