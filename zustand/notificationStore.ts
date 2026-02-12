import { create } from 'zustand';
import { Socket } from 'socket.io-client';
import { Notification } from '@/types/notification';

interface NotiStoreState {
  // 실시간 알림을 위한 Socket.IO 클라이언트 객체를 저장
  notiSocket: Socket | null;
  // Socket.IO 클라이언트 객체를 설정
  setNotiSocket: (socket: Socket | null) => void;
  // 알림 목록을 저장
  notifications: Notification[];
  // 알림 목록을 설정
  setNotifications: (notifications: Notification[]) => void;
  // 알림 데이터 수신 완료 여부
  isLoaded: boolean;
  // 알림 데이터 수신 완료 설정
  setIsLoaded: (loaded: boolean) => void;
}
// 실제 스토어를 생성 후 내보내기
const useNotiStore = create<NotiStoreState>((set) => ({
  // 객체를 저장하는 변수
  notiSocket: null,
  // 소켓 객체를 상태에 업데이트하는 함수
  setNotiSocket: (socket) => set({ notiSocket: socket }),
  notifications: [],
  // 알림 목록을 상태에 업데이트하는 함수
  setNotifications: (notifications) => set({ notifications }),
  // 초기 데이터 로딩 완료 여부
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));

export default useNotiStore;
