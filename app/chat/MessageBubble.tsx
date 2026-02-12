import { ChatMessage } from '@/types/chat';
import { User } from '@/types/user';
import Image from 'next/image';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: ChatMessage; // 표시할 메시지 객체
  isMe: boolean; // 본인이 보낸 메시지인지 여부
  sender?: User; // 메시지 발신인 정보 (상대방 메시지인 경우에만 주로 사용)
}

export default function MessageBubble({ message, isMe, sender }: MessageBubbleProps) {
  // 프로필 이미지 경로 (없으면 기본 이미지)
  const displayImage = sender?.image || '/images/default-img.png';

  // 시간 포맷팅 함수 (MM-DD HH:mm 형식)
  const formatTime = (createdAt: string) => {
    return createdAt ? createdAt.substring(5) : '';
  };

  return (
    <div className={`${styles.row} ${isMe ? styles.rowMe : styles.rowOther}`}>
      <div className={`${styles.content} ${isMe ? styles.contentMe : styles.contentOther}`}>
        {/* 상대방 메시지일 경우에만 프로필 이미지 표시 */}
        {!isMe && <Image src={displayImage} alt={`${sender?.name || '상대방'} 프로필`} width={32} height={32} className={styles.senderAvatar} />}
        {/* 메시지 말풍선 */}
        <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleOther}`}>
          <p className={styles.text}>{message.content}</p>

          {/* 메시지 부가 정보 (시간, 읽음 상태) */}
          <div className={`${styles.meta} ${isMe ? styles.metaMe : styles.metaOther}`}>
            {/* 내가 보낸 메시지인데 상대방이 아직 안 읽었을 때만 '1' 표시 */}
            {isMe && message.readUserIds && message.readUserIds.length < 2 && <span className={styles.unreadIndicator} aria-label="읽지 않음">1</span>}
            <span className={styles.time}>{formatTime(message.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}