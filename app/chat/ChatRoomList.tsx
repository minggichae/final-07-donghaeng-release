import { ChatRoomState } from '@/types/chat';
import ChatRoomItem from './ChatRoomItem';
import styles from './ChatRoomList.module.css';

interface ChatRoomListProps {
  rooms: ChatRoomState[]; // 표시할 채팅방 목록
  activeRoomId: number | undefined; // 현재 선택되어 활성화된 방 ID
  onSelectRoom: (id: string) => void; // 방 선택 시 호출되는 콜백 함수
  onLeaveRoom: (id: string) => void; // 방 나가기 버튼 클릭 시 호출되는 콜백 함수
}

export default function ChatRoomList({ rooms, activeRoomId, onSelectRoom, onLeaveRoom }: ChatRoomListProps) {
  return (
    <div className={`${activeRoomId ? styles.containerHidden : ''} ${styles.container}`}>
      {/* 목록 헤더 */}
      <div className={styles.header}>
        <h2 className={styles.title}>채팅 목록</h2>
      </div>

      {/* 검색바 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input type="text" placeholder="상대방 검색..." className={styles.searchInput} aria-label="채팅방 검색" />
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 채팅방 목록 */}
      <div className={styles.roomList}>
        {rooms.length === 0 ? (
          <div className={styles.emptyList}>
            <p className={styles.emptyText}>참여 중인 대화가 없습니다.</p>
          </div>
        ) : (
          rooms.map((room) => <ChatRoomItem key={room._id} room={room} isActive={activeRoomId === room._id} onSelect={onSelectRoom} onLeave={onLeaveRoom} />)
        )}
      </div>
    </div>
  );
}
