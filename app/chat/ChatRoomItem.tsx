import { ChatRoomState } from '@/types/chat';
import useUserStore from '@/zustand/userStore';
import Image from 'next/image';
import styles from './ChatRoomItem.module.css';

interface ChatRoomItemProps {
  room: ChatRoomState; // 채팅방 상태 정보 (방 정보, 마지막 메시지, 읽지 않은 수 등)
  isActive: boolean; // 현재 활성화(선택)된 방인지 여부
  onSelect: (id: string) => void; // 방 선택 시 실행될 핸들러
  onLeave: (id: string) => void; // 방 나가기 버튼 클릭 시 실행될 핸들러
}

export default function ChatRoomItem({ room, isActive, onSelect, onLeave }: ChatRoomItemProps) {
  const { user: currentUser } = useUserStore();

  // 현재 로그인한 사용자를 제외한 상대방 정보 추출
  const partner = room.members.find((m) => String(m._id) !== String(currentUser?._id));
  const displayName = partner?.name || '알 수 없는 사용자';
  const displayImage = partner?.image || '/images/default-profile.png';

  // 마지막 메시지 정보
  const lastMessage = room.lastMessage;

  // 채팅방 유형 정의 (본인이 만든 방일 경우 '문의', 상대방이 만든 방일 경우 '답변')
  const chatType = room.ownerId === currentUser?._id ? '문의' : '답변';

  // 읽지 않은 메시지 수
  const unreadCount = room.unreadCount || 0;

  // 마지막 메시지 내용 렌더링 함수
  const renderLastMessage = () => {
    if (!lastMessage) return '새로운 채팅방이 생성되었습니다.';
    return lastMessage.content || '새로운 메시지가 있습니다.';
  };

  // 채팅방 나가기 클릭 핸들러 (부모로 이벤트 전달)
  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모의 onClick(onSelect) 방지
    onLeave(String(room._id));
  };

  return (
    <div role="button" tabIndex={0} onClick={() => onSelect(String(room._id))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(String(room._id)); } }} aria-label={`${displayName} 채팅방 선택`} className={`${styles.item} ${isActive ? styles.itemActive : ''}`}>
      <button onClick={handleLeave} className={styles.leaveButton} aria-label="채팅방 나가기">
        <svg className={styles.leaveButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className={styles.avatarContainer}>
        <Image src={displayImage} alt={displayName} width={40} height={40} className={styles.avatar} />
        <div className={styles.onlineIndicator}></div>
      </div>

      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{displayName}</h3>
            <span className={styles.chatTypeBadge}>{chatType}</span>
          </div>
          <span className={styles.time}>{lastMessage?.createdAt || room.updatedAt || ''}</span>
        </div>

        {room.roomName && (
          <div className={styles.roomNameRow}>
            <span className={styles.roomName}>
              <span className={styles.roomNameLabel}>게시글:</span>
              {room.roomName}
            </span>
          </div>
        )}
        <div className={styles.lastMessageRow}>
          <p className={styles.lastMessage}>{renderLastMessage()}</p>
          {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
        </div>
      </div>
    </div>
  );
}
