import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import useUserStore from '@/zustand/userStore';
import { NewNotification } from '@/types/notification';
import useNotiStore from '@/zustand/notificationStore';
import { notiAllRead, notiOneRead } from '@/actions/notification';

let globalNotiSocket: Socket | null = null; // 소켓 연결 객체를 하나만 유지하기 위한 변수
let isConnecting = false; // 현재 연결 시도 여부를 체크하는 변수

export function useNoti() {
  const user = useUserStore((state) => state.user);
  const userId = user?._id;

  const { notiSocket, setNotiSocket, notifications, setNotifications, isLoaded, setIsLoaded } = useNotiStore();

  const accessToken = useUserStore.getState().user?.token?.accessToken;

  useEffect(() => {
    // 로그인 하지 않거나, 소켓 연결이 되어있거나, 현재 연결 시도 중이면 반환
    if (!userId || notiSocket || isConnecting) return;

    // 싱글톤 패턴: globalNotiSocket을 사용하여 컴포넌트가 리렌더링되더라도
    // 소켓이 불필요하게 여러 번 생성되지 않도록 관리함(이미 연결된 소켓이 있으면 재사용)
    if (globalNotiSocket) {
      setNotiSocket(globalNotiSocket);
      return;
    }

    isConnecting = true;
    console.log('알림서버 연결 시도...');

    // 2. 소켓 연결 생성
    const socket = io(`${process.env.NEXT_PUBLIC_NOTI_URL}/${process.env.NEXT_PUBLIC_CLIENT_ID}`, {
      reconnectionAttempts: 5, // 연결이 끊기면 최대 5번 재시도
    });

    globalNotiSocket = socket; // 전역 변수에 저장
    setNotiSocket(socket); // zustand에 저장

    // 3. 이벤트 리스너 등록
    socket.on('connect', () => {
      console.log('알림서버 연결 완료');
      isConnecting = false;
      // 서버에 사용자 ID 등록 (해당 사용자용 알림을 받기 위함)
      socket.emit('setUserId', userId);
    });

    socket.on('disconnect', () => {
      console.log('알림서버 연결 해제');
    });

    // 서버에서 'notification' 이벤트로 데이터를 보낼 때 처리
    socket.on('notification', (data: NewNotification) => {
      console.log('알림 수신:', data);
      if (data.newNoti) {
        // 새 알림 한 건 추가
        const currentNotis = useNotiStore.getState().notifications;
        setNotifications([...currentNotis, data.newNoti]);
      } else if (data.list) {
        // 전체 알림 목록으로 갱신
        setNotifications(data.list);
      }
      // 데이터 수신 완료
      setIsLoaded(true);
    });

    socket.on('connect_error', (err) => {
      console.error('알림서버 연결 실패:', err.message);
      isConnecting = false;
      // 연결 실패 시에도 로딩 완료 처리
      setIsLoaded(true);
    });
  }, [userId, notiSocket, setNotiSocket, setNotifications, setIsLoaded]);

  // 전체 읽음 처리, 로컬에서 isRead: true로 처리
  const markAllRead = async () => {
    // 토큰, 소켓, 유저 id가 없으면 반환
    if (!accessToken || !notiSocket || !userId) return;

    // 전체 읽음 처리
    const result = await notiAllRead(accessToken);
    if (result.ok) {
      // 소켓으로 다른 사용자에게 전체 읽음 처리 알림 전달
      notiSocket.emit('markAllRead', userId);

      // 로컬에서 전체 읽음 처리
      const updatedNotis = notifications.map((n) => ({ ...n, isRead: true }));
      setNotifications(updatedNotis);
    }
  };

  // 개별 읽음 처리, 로컬에서 isRead: true로 처리
  const markOneRead = async (notiId: string) => {
    if (!accessToken) return;

    // 서버에 개별 읽음 처리 요청
    const result = await notiOneRead(accessToken, notiId);
    // 성공, 실패 여부에 따른 알림 처리
    // 서버에서 업데이트 되었다는 응답일 때 성공 처리
    if (result.ok) {
      // 해당 알림만 읽음 처리
      const updatedNotis = notifications.map((n) => (n._id === notiId ? { ...n, isRead: true } : n));
      setNotifications(updatedNotis);
      console.log('개별 읽음 처리 성공:', updatedNotis);
    } else {
      // 실패 처리
      console.log('개별 읽음 처리 실패:', result);
    }
  };

  // 알림 목록, 전체 읽음, 개별 읽음 반환
  return { notifications, setNotifications, markAllRead, markOneRead, isLoaded };
}
