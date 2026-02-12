'use client';

import profile from '@/public/icon/profile.svg';
import camera from '@/public/icon/camera.svg';
import down from '@/public/icon/down.svg';
import styles from './Modify.module.css';
import Link from 'next/link';
import Image from 'next/image';
import DefaultLayout from '@/app/components/DefaultLayout';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import { updateUser } from '@/actions/user';
import { uploadFile } from '@/actions/file';
import { regionData } from '@/docs/regionData';

export default function Modify() {
  // 라우터 선언
  const router = useRouter();
  // zustand 스토어 선언
  const { user, setUser } = useUserStore();
  // actions에서 선언한 updataUser 사용
  const [state, formAction, isPending] = useActionState(updateUser, null);

  // 토큰 가져오기
  const accessToken = user?.token?.accessToken;
  // zustand의 복원 여부 확인
  // 로컬스토리지 복원이 끝나기 전에 잘못된 리다이렉트가 발생하는 걸 방지
  const hasHydrated = useUserStore((state) => state.hasHydrated);

  // 파일을 참조할 ref
  const fileInput = useRef<HTMLInputElement>(null);
  // 파일의 상태를 변경하는 state
  const [profileImage, setProfileImage] = useState(user?.image || profile.src);
  // 업로드된 이미지 경로를 저장하는 state
  const [uploadImagePath, setUploadImagePath] = useState(user?.image || '');
  // 이미지 업로드 중 상태
  const [isUploading, setIsUploading] = useState(false);

  // user.region을 지역과 시/군/구로 공백을 기준으로 나누는 변수
  const parts = user?.region?.split(' ');
  // 지역(시/도) 상태 저장 state(기존 지역이 있었으면 parts에서 가져오기 1번째는 지역)
  const [selectedCity, setSelectedCity] = useState(parts?.[0] || '');
  // 지역(시/군/구) 상태 저장 state(기존 지역이 있었으면 parts에서 가져오기 2번째는 시/군/구)
  const [selectedDistrict, setSelectedDistrict] = useState(parts?.[1] || '');

  // useEffect를 사용해서 zustand 갱신
  // redirect는 갱신이 되지 않고 페이지를 이동한다.
  useEffect(() => {
    console.log('state:', state);
    console.log('user token:', user?.token);
    // state가 존재하고 성공 응답일 때만 실행
    if (state && state.ok === 1) {
      // 서버가 돌려준 갱신된 유저 정보(state.item)로 zustand 스토어를 업데이트.
      setUser({ ...state.item, token: user?.token, _id: user!._id });
      router.push('/mypage'); // 마이페이지로 이동
    }
  }, [state]);

  // 선택한 이미지를 미리보는 함수
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 선택한 첫 번째 파일
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 미리보기
    if (file) {
      // 파일을 브라우저에서 바로 볼 수 있는 임시 URL로 변환
      const imageUrl = URL.createObjectURL(file);
      // 미리보기 state 업데이트
      setProfileImage(imageUrl);
    }

    // 서버에 경로 업로드
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      if (result.ok === 1) {
        // 성공 응답일 때만 실행
        setUploadImagePath(result.item[0].path);
      } else {
        alert('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      // finally는 try catch 끝난 후 무조건 실행
      setIsUploading(false);
    }
  };

  // 토큰이 없는 경우 강제 이동
  useEffect(() => {
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함
    if (!hasHydrated) return;

    if (!accessToken) {
      router.replace('/login');
    }
  }, [hasHydrated, accessToken, router]);

  return (
    <DefaultLayout>
      <form className={styles['modify-form']} action={formAction}>
        {/* 서버에 보내기 위한 토큰과 id 값 */}
        <input type="hidden" name="accessToken" value={user?.token?.accessToken || ''} />
        <input type="hidden" name="_id" value={user?._id || ''} />
        <input type="hidden" name="email" value={user?.email || ''} />
        <input type="hidden" name="image" value={uploadImagePath} />
        <input type="hidden" name="region" value={selectedDistrict ? `${selectedCity} ${selectedDistrict}` : selectedCity} />
        <input type="file" accept="image/*" hidden ref={fileInput} onChange={handleImageChange} />
        <main className={styles['modify-div']}>
          <div className={styles['profile-top']}>
            <div className={styles['img-wrapper']}>
              <Image src={profileImage} alt={`${user?.name || '사용자'} 프로필 이미지`} width={165} height={165} className={styles['profile-img']} />
              <button type="button" className={styles['btn-camera']} onClick={() => fileInput.current?.click()} aria-label="프로필 사진 변경">
                <Image src={camera.src} width={29} height={27} alt="" aria-hidden="true" />
              </button>
            </div>

            <div className={styles['btn-div']}>
              <Link href="/mypage">
                <button type="button" className={styles['btn-cancel']}>
                  취소
                </button>
              </Link>
              <button type="submit" className={styles['btn-complete']} disabled={isUploading || isPending}>
                {isUploading ? '업로드중...' : isPending ? '수정중...' : '완료'}
              </button>
            </div>
          </div>
          <div>
            <div className={styles['nickname-div']}>
              <label htmlFor="nickname">닉네임</label>
              <input id="nickname" name="name" defaultValue={user?.name || '닉네임'}></input>
            </div>

            <div className={styles['introduce-div']}>
              <label htmlFor="comment">소개</label>
              <textarea id="comment" name="comment" maxLength={50} defaultValue={user?.comment || '나의 소개를 쓰는 공간'}></textarea>
            </div>
            <div className={styles['address-div']}>
              <div>
                <label htmlFor="city">지역 </label>
                <div className={styles['select-wrapper']}>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setSelectedDistrict('');
                    }}
                    className={styles['city']}
                  >
                    <option value="">지역</option>
                    {Object.keys(regionData).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <Image src={down} alt="" aria-hidden="true" width={16} height={16} />
                </div>
              </div>

              <div>
                <label htmlFor="district" className={styles['district-label']}>
                  시/군/구{' '}
                </label>
                <div className={styles['select-wrapper']}>
                  <select id="district" value={selectedDistrict} disabled={!selectedCity} className={styles['district']} onChange={(e) => setSelectedDistrict(e.target.value)}>
                    <option value="">{selectedCity ? '시/군/구' : '지역을 선택해주세요'}</option>
                    {selectedCity &&
                      regionData[selectedCity]?.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                  </select>
                  <Image src={down} alt="" aria-hidden="true" width={16} height={16} />
                </div>
              </div>
            </div>

            <div className={styles['etc-div']}>
              <div>
                <label htmlFor="age">나이</label>
                <div className={styles['select-wrapper']}>
                  <select id="age" name="age" defaultValue={user?.age || ''}>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대 이상</option>
                  </select>
                  <Image src={down} alt="" aria-hidden="true" width={16} height={16} />
                </div>
              </div>

              <div>
                <label htmlFor="gender">성별</label>
                <div className={styles['select-wrapper']}>
                  <select id="gender" name="gender" defaultValue={user?.gender || '성별'}>
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                  <Image src={down} alt="" aria-hidden="true" width={16} height={16} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </form>
    </DefaultLayout>
  );
}