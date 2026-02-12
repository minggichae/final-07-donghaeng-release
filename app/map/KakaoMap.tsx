'use client'; // 클라이언트 선언

// 사용할 라이브러리 import
import tag from '@/public/icon/tag.svg';
import calender from '@/public/icon/calendar.svg';
import logo from '@/public/logo/logo.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Map, MapMarker, CustomOverlayMap, ZoomControl } from 'react-kakao-maps-sdk';
import styles from './Map.module.css';
import Image from 'next/image';
import { Meetings } from '@/types/meetings';
import { KakaoMapProps } from '@/types/kakaomap';

// 카카오맵 함수 제작
/*
  props로 width, height, lat(위도), lng(경도), css클래스명, 모임 배열, 모임 개인 id를 받아옴
 */
export default function KakaoMap({ width = '100%', lat = 37.5709, lng = 126.978, className, meetings = [], selectedId, mapPage = false }: KakaoMapProps) {
  const router = useRouter();
  // 로딩 판별 state
  const [isLoaded, setIsLoaded] = useState(false);

  // 배열로써 각 항목에 모임 데이터와 coords 좌표를 같이 넣는 state
  const [markerData, setMarkerData] = useState<{ meeting: Meetings; coords: { lat: number; lng: number } }[]>([]);

  // 클릭한 마커의 모임 데이터 저장 (null이면 오버레이 닫힘)
  // markerData와 같지만 모임 하나만 저장하는 state
  const [selectedMarker, setSelectedMarker] = useState<{ meeting: Meetings; coords: { lat: number; lng: number } } | null>(null);

  // 지도 중심 좌표를 저장하는 state
  const [center, setCenter] = useState({ lat, lng });

  // 모바일 여부를 판단하는 state
  const [isMobile, setIsMobile] = useState(false);

  // 페이지 재방문 시 이미 로드된 SDK 감지
  // sdk 로드 감지 useEffect
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  // 주소를 좌표로 변환하는 useEffect
  useEffect(() => {
    // 맵이 로드되지 않은 경우 반환
    if (!isLoaded || meetings.length === 0) return;

    // 카카오가 제공하는 주소 -> 좌표 변환기를 만드는 작업
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 변환한 결과를 임시로 넣어두는 빈배열
    const results: {
      meeting: Meetings;
      coords: { lat: number; lng: number };
    }[] = [];

    // 변환이 끝난 갯수를 세는 카운터(Geocoder는 비동기라서 전부 끝났는지 확인하려고 필요)
    let completed = 0;

    // forEach: 배열을 첫번째부터 하나씩 실행
    meetings.forEach((meeting) => {
      // meeting에 있는 주소를 뽑아서 geocoder.addressSearch를 통해 카카오에 전송 후 좌표를 콜백함수로 받음 -> result
      geocoder.addressSearch(meeting.extra.region, (result: { x: string; y: string }[], status: string) => {
        // 변환이 끝날 때 마다 카운터 +1
        completed++;
        // 변환 성공 여부 확인
        if (status === window.kakao.maps.services.Status.OK) {
          // 성공한 경우 lat: 위도, lng: 경도를 반환
          results.push({
            meeting,
            coords: {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            },
          });
        }
        // 모든 변환이 이루어졌는지 확인
        if (completed === meetings.length) {
          setMarkerData([...results]);
        }
      });
    });
    // isLoaded나 meetings가 바뀔 때마다 useEffect 실행
  }, [isLoaded, meetings]);

  // 리스트의 모임 클릭 시 오버레이를 여는 useEffect
  useEffect(() => {
    // id가 없거나, 데이터의 길이가 0인 경우 반환
    if (selectedId === null || markerData.length === 0) return;

    // find를 통해 markerData와 같은 모임 id를 찾아 found에 저장
    const found = markerData.find((item) => item.meeting._id === selectedId);
    if (found) {
      setSelectedMarker(found);
      setCenter(found.coords);
    }
  }, [selectedId, markerData]);

  // 화면의 크기를 체크하는 useEffect
  useEffect(() => {
    // 화면 크기가 1024 미만인 경우 모바일로 판단
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    // 컴포넌트 처음 렌더링될 때 화면 크기 체크
    checkMobile();
    // 창 크기에 따라 다시 체크하는 이벤트 등록
    window.addEventListener('resize', checkMobile);
    // 컴포넌트가 사라질 때 이벤트 정리
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 필터 변경 시 오버레이 닫기
  useEffect(() => {
    setSelectedMarker(null);
  }, [meetings]);

  // 오버레이 내용을 변수화하기(데스크탑, 모바일 공통)
  const overlayMap = selectedMarker && (
    <div className={mapPage ? styles['marker-info-window'] : styles['marker-info-window-main']}>
      {/* X 닫기 버튼 - 우측 상단 */}
      <div
        className={styles['btn-close']}
        role="button"
        tabIndex={0}
        aria-label="닫기"
        onClick={() => setSelectedMarker(null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedMarker(null);
          }
        }}
      >
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M19.6137 2.34438C20.2022 1.73728 20.1084 0.83557 19.4001 0.331147C18.6919 -0.173276 17.6399 -0.0929259 17.0514 0.514168L10 7.76804L2.94859 0.514168C2.3601 -0.0929259 1.30812 -0.173276 0.599854 0.331147C-0.108412 0.83557 -0.202153 1.73728 0.386332 2.34438L7.82833 10L0.386332 17.6556C-0.202153 18.2627 -0.108412 19.1644 0.599854 19.6689C1.30812 20.1733 2.3601 20.0929 2.94859 19.4858L10 12.232L17.0514 19.4858C17.6399 20.0929 18.6919 20.1733 19.4001 19.6689C20.1084 19.1644 20.2022 18.2627 19.6137 17.6556L12.1717 10L19.6137 2.34438Z"
            fill="#323577"
          />
        </svg>
      </div>
      <div className={styles['marker-info-content']}>
        {/* 모임 사진 */}
        <Image src={selectedMarker.meeting.mainImages[0]?.path || logo.src} alt={`${selectedMarker.meeting.name} 모임 사진`} width={80} height={70} className={styles['marker-img']} />

        <div className={styles['marker-info']}>
          {/* 모임 제목 */}
          <h3 className={styles['marker-title']}>{selectedMarker.meeting.name}</h3>
          {/* 모임 정보 */}
          <p>
            <Image src={tag.src} alt="" aria-hidden="true" width={14} height={12} />
            {selectedMarker.meeting.extra.category}
          </p>
          <p>
            <Image src={calender.src} alt="" aria-hidden="true" width={14} height={12} />
            {selectedMarker.meeting.extra.date}
          </p>
        </div>
      </div>
      {/* 화살표 버튼 - 우측 하단 */}
      <div
        className={styles['btn-arrow']}
        role="button"
        tabIndex={0}
        aria-label={`${selectedMarker.meeting.name} 상세보기`}
        onClick={() => router.push(`/meetings/${selectedMarker.meeting._id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(`/meetings/${selectedMarker.meeting._id}`);
          }
        }}
      >
        <svg width="18" height="12" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M16.7233 5.70592C17.0922 5.31548 17.0922 4.6814 16.7233 4.29096L12.9454 0.292831C12.5764 -0.0976105 11.9773 -0.0976105 11.6083 0.292831C11.2394 0.683273 11.2394 1.31735 11.6083 1.70779L13.7747 4.00047H0.944485C0.422067 4.00047 0 4.44713 0 5C0 5.55287 0.422067 5.99953 0.944485 5.99953H13.7747L11.6083 8.29221C11.2394 8.68265 11.2394 9.31673 11.6083 9.70717C11.9773 10.0976 12.5764 10.0976 12.9454 9.70717L16.7233 5.70904V5.70592Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );

  return (
    // 컴포넌트를 감싸는 div
    <div className={className} style={{ width, overflow: 'hidden' }}>
      {/* Script: 외부 스크립트의 로딩 우선순위를 최적화하여 페이지 성능을 향상시키는 도구 */}
      {/* strategy: 로딩 동작을 미세 조정, afterInteractive: 페이지 일부가 수화된 후 일찍 스크립트를 로드 */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            setIsLoaded(true);
          });
        }}
      />
      {isLoaded ? (
        <Map center={center} style={{ width: '100%', height: '100%' }} level={7}>
          {markerData.map((item, index) => (
            <MapMarker
              key={index}
              position={item.coords}
              onClick={() => {
                setSelectedMarker(item);
                setCenter(item.coords);
              }}
            />
          ))}
          {selectedMarker && (!mapPage || !isMobile) && (
            <CustomOverlayMap position={selectedMarker.coords} yAnchor={1.3}>
              {overlayMap}
            </CustomOverlayMap>
          )}
        </Map>
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>지도 로딩중...</div>
      )}
      {/* 모바일 화면 하단에 고정하는 오버레이 */}
      {selectedMarker && isMobile && mapPage && <div className={styles['mobile-overlay']}>{overlayMap}</div>}
    </div>
  );
}