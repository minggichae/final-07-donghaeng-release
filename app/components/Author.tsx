'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { Meetings } from '@/types/meetings';
import styles from './Author.module.css';

interface AuthorProps {
  meeting: Meetings;
  children?: ReactNode;
  className?: string;
}

export default function Author({ meeting, children, className }: AuthorProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const authorRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authorRef.current && !authorRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.authorContainer} ${className ?? ''}`} ref={authorRef}>
      <button type="button" className={children ? styles.authorTriggerCustom : styles.authorTrigger} onClick={() => setShowTooltip(!showTooltip)} aria-expanded={showTooltip} aria-label={`${meeting.name} 작성자 메뉴`}>
        {children ?? meeting.name}
      </button>
      {showTooltip && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipContent}>
            <div className={styles.tooltipArrow}></div>

            <div className={styles.tooltipInner}>
              <Link href={`/chat?user_id=${meeting.seller?._id ?? meeting.seller_id}`} onClick={() => setShowTooltip(false)} className={styles.tooltipLink}>
                쪽지
              </Link>
              <Link href={`/chat?meeting_id=${meeting._id}`} onClick={() => setShowTooltip(false)} className={styles.tooltipLink}>
                게시글 문의
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
