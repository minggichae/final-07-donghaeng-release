import Link from 'next/link';
import Image from 'next/image';
import styles from './NotFound.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <Image src="/logo/logo.svg" alt="Moa 로고" width={80} height={80} priority />
      <p className={styles.code}>404</p>
      <h1 className={styles.message}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.description}>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <Link href="/" className={styles.homeLink}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
