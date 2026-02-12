import MessageBubble from '@/app/chat/MessageBubble';
import useChat from '@/hooks/useChat';
import useUserStore from '@/zustand/userStore';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './ChatRoom.module.css';

export default function ChatRoom() {
  const messagesContainerRef = useRef<HTMLDivElement>(null); // 메시지 컨테이너 스크롤 제어용 Ref
  const router = useRouter();
  const pathname = usePathname();
  const [inputText, setInputText] = useState(''); // 메시지 입력창 상태
  // useChat 훅에서 채팅 관련 상태와 액션들을 가져옴
  const { activeRoomId, setActiveRoomId, rooms, messages, sendMessage, leaveRoom } = useChat();
  const user = useUserStore((state) => state.user); // 현재 로그인한 사용자 정보

  // 메시지 변경 시 메시지 컨테이너만 하단으로 스크롤
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  if (!user) return null;

  // 현재 활성화된 방 정보 찾기
  const activeRoom = rooms.find((r) => activeRoomId !== undefined && String(r._id) === String(activeRoomId));

  // 현재 방의 멤버 중 내가 아닌 상대방 정보 추출
  const partner = activeRoom?.members.find((m) => String(m._id) !== String(user._id));

  // 본인이 방의 개설자(ownerId)이면 '문의', 아니면 '답변'으로 표시
  const chatType = activeRoom?.ownerId === user._id ? '문의' : '답변';

  // 메시지 전송 핸들러
  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputText.trim() || !user) return;
    await sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className={`${!activeRoomId ? styles.containerHidden : ''} ${styles.container}`}>
      {activeRoomId && partner ? (
        <div className={styles.inner}>
          {/* 채팅방 상단 헤더: 상대방 정보 및 나가기 버튼 */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <button
                onClick={() => {
                  setActiveRoomId(undefined);
                  router.replace(pathname);
                }}
                className={styles.backButton}
                aria-label="채팅 목록으로 돌아가기"
              >
                <svg className={styles.backButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className={styles.partnerInfo}>
                <Image src={partner?.image || '/images/default-profile.png'} alt={partner.name} width={40} height={40} className={styles.partnerAvatar} />
                <div className={styles.partnerDetails}>
                  <div className={styles.partnerNameRow}>
                    <h3 className={styles.partnerName}>{partner?.name || '상대방'}</h3>
                    <span className={styles.chatTypeBadge}>{chatType}</span>
                  </div>
                  {activeRoom?.roomName && (
                    <p className={styles.partnerRoomName}>
                      <span className={styles.partnerRoomNameLabel}>게시글:</span>
                      {activeRoom.roomName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button
                onClick={() => {
                  if (leaveRoom(activeRoomId)) {
                    router.replace(pathname);
                  }
                }}
                className={styles.leaveRoomButton}
                aria-label="대화방 나가기"
              >
                <svg className={styles.leaveRoomButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* 중간 영역: 채팅 메시지들이 표시되는 스크롤 영역 */}
          <div ref={messagesContainerRef} className={styles.messagesContainer}>
            {!activeRoom || !messages.length ? (
              <div className={styles.emptyMessages}>
                <p className={styles.emptyMessagesText}>아직 대화가 없습니다.</p>
                <p className={styles.emptyMessagesSubText}>첫 메시지를 보내 대화를 시작해보세요!</p>
              </div>
            ) : (
              messages.map((msg, index) => <MessageBubble key={msg._id || index} message={msg} isMe={String(msg.senderId) === String(user._id)} sender={partner || undefined} />)
            )}
          </div>

          {/* 하단 영역: 메시지 입력 폼 */}
          <div className={styles.inputContainer}>
            <form onSubmit={handleSendMessage} className={styles.inputForm}>
              <div className={styles.inputWrapper}>
                <label htmlFor="chat-message-input" className="sr-only">메시지 입력</label>
                <input type="text" id="chat-message-input" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="메시지를 입력하세요..." className={styles.messageInput} />
                <button type="submit" disabled={!inputText.trim()} className={styles.sendButton} aria-label="메시지 전송">
                  <svg className={styles.sendButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.emptyChatRoom}>
          {/* 선택된 채팅방이 없을 때 표시되는 빈 화면 */}
          <div className={styles.emptyChatRoomIcon}>
            <svg className={styles.emptyChatRoomIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className={styles.emptyChatRoomTitle}>채팅을 시작해보세요</h3>
          <p className={styles.emptyChatRoomText}>게시글의 상대방 닉네임을 클릭한 후 쪽지나 게시글 문의를 통해 대화를 시작할 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}
