'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Error.module.css';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div className={styles.container}>
      <Image src="/icon/error.svg" alt="오류 아이콘" width={80} height={80} priority />
      <h1 className={styles.title}>문제가 발생했습니다</h1>
      <p className={styles.description}>
        일시적인 오류가 발생했습니다.
        <br /> 다시 시도하거나 홈으로 돌아가주세요.
      </p>
      <div className={styles.btnGroup}>
        <button type="button" className={styles.retryBtn} onClick={reset}>
          다시 시도
        </button>
        <Link href="/" className={styles.homeLink}>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
