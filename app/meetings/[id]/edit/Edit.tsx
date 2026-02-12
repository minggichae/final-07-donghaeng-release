'use client';

import Link from 'next/link';
import style from './Edit.module.css';
import { useActionState, useEffect, useState, useTransition } from 'react';
import useUserStore from '@/zustand/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ActionState, updateMeeting } from '@/actions/meetings';
import { uploadFile } from '@/actions/file';
import { Meetings } from '@/types/meetings';
import { ClipLoader } from 'react-spinners';

interface EditMeetingFormProps {
  initialData: Meetings;
  meetingId: string;
}

export default function Edit({ initialData, meetingId }: EditMeetingFormProps) {
  const router = useRouter();
  //강제로 다른 페이지로 보낼때 사용. 로그인 안돼있으면 /login으로 보내려고 넣어놓음
  const { user } = useUserStore();
  // zustand에 저장된 로그인 사용자 정보 가져오기

  const initialState: ActionState | null = null;
  //  서버 액션의 초기 결과값. 아직 서버에 요청을 보내지 않았으니까 null
  const [state, formAction] = useActionState(updateMeeting, initialState);
  // updateMeeting: 서버에 모임수정 요청 보내는 서버액션, useActionState: 요청의 결과를 state로 받아 볼수 있게 해줌
  // 결과적으로 formAction >> 서버에 수정 요청이 됨됨됨... state: 서버에서 응답 결과

  const [, startTransition] = useTransition();

  const accessToken = user?.token?.accessToken;
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  useEffect(() => {
    if (!hasHydrated) return;
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함

    if (!accessToken) {
      router.replace('/login');
    }
    // 로그인 안했으면 로그인페이지로 강제이동
  }, [router, hasHydrated, accessToken]);

  // 인원 카운터
  const [count, setCount] = useState(initialData.quantity || 10);

  // 이미지 미리보기
  const [imagePreview, setImagePreview] = useState<string>(initialData.mainImages?.[0]?.path || '');
  //    이미 등록된 모임 이미지를 보여줘야하니까 초기값이 initalData.mainImaes... 어어 모임이미지가 없으면 공백
  const [uploadedImage, setUploadedImage] = useState<{ path: string; name: string } | null>(initialData.mainImages?.[0] || null);
  //  서버로 보낼 이미지 정보가 필요.
  const [isUploading, setIsUploading] = useState(false);
  //  이미지가 업로드 중인지 확인하기 위해서 사용

  // 이미지 업로드 핸들러
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 서버에 업로드
    setIsUploading(true);
    try {
      const result = await uploadFile(file);

      if (result.ok) {
        // 업로드 성공
        setUploadedImage({
          path: result.item[0].path,
          name: result.item[0].name,
        });
      } else {
        alert('이미지 업로드에 실패했습니다.');
        setImagePreview('');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
      setImagePreview('');
    } finally {
      setIsUploading(false);
    }
  };

  // 인원 증가/감소
  const handleDecrease = () => {
    if (count > 0) setCount(count - 1);
  };

  const handleIncrease = () => {
    if (count < 300) setCount(count + 1);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 300) {
      setCount(value);
    }
  };

  // 폼 제출 전 처리
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('=== 폼 제출 시작 ===');
    console.log('user:', user);

    if (!user || !user.token || !user.token.accessToken) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    // 폼 데이터 가져오기
    const formData = new FormData(e.currentTarget);

    console.log('=== 원본 FormData ===');
    for (const [key, value] of formData.entries()) {
      console.log(key, ':', value);
    }

    // extra 객체 구성
    const extra = {
      category: formData.get('category') as string,
      gender: formData.get('gender') as string,
      age: parseInt(formData.get('age') as string),
      date: formData.get('date') as string,
      region: formData.get('region') as string,
      survey1: formData.get('question-1') as string,
      survey2: formData.get('question-2') as string,
    };

    let finalImage = uploadedImage;

    // 이미지가 없으면 기본 이미지를 업로드
    if (!uploadedImage) {
      try {
        // public 폴더의 기본 이미지를 fetch로 가져오기
        const response = await fetch('/images/default-img.png');
        const blob = await response.blob();
        const file = new File([blob], 'default-img.png', { type: 'image/jpeg' });

        // 서버에 업로드
        const result = await uploadFile(file);

        if (result.ok) {
          finalImage = {
            path: result.item[0].path,
            name: result.item[0].name,
          };
        }
      } catch (error) {
        console.error('기본 이미지 업로드 실패:', error);
        alert('이미지를 선택해주세요!');
        return;
      }
    }

    console.log('=== extra 객체 ===', extra);

    // FormData 재구성
    const submitData = new FormData();
    submitData.append('_id', meetingId);
    submitData.append('accessToken', user.token.accessToken);
    submitData.append('name', formData.get('meetings-title') as string);
    submitData.append('content', formData.get('meetings-content') as string);
    submitData.append('quantity', count.toString());
    submitData.append('price', '0');
    submitData.append('shippingFees', '0');

    // extra 추가
    submitData.append('mainImages', JSON.stringify([finalImage]));
    submitData.append('extra', JSON.stringify(extra));

    console.log('=== 최종 submitData ===');
    for (const [key, value] of submitData.entries()) {
      console.log(key, ':', value);
    }

    // Server Action 호출
    startTransition(() => {
      formAction(submitData);
    });
  };

  // Server Action 결과 처리
  useEffect(() => {
    if (!state) return;

    if (state.ok) {
      alert('모임이 성공적으로 수정되었습니다.');
      // redirect는 Server Action에서 처리됨
    } else if (state.message) {
      alert(state.message);
    }
  }, [state]);
  //  서버에 수정 요청을 보낸뒤, 결과를 사용자에게 반응해줌 값이 바뀔때만 effect를 실행하라....

  return (
    <main className={style['wrap']}>
      <div className={style['Edit-wrap']}>
        <form className={style['meetings-create']} onSubmit={handleSubmit}>
          <div className={style['meetings-Edit']}>
            <h2>모임 수정</h2>
            <fieldset className={style['title-fieldset']}>
              <label htmlFor="meetings-title">모임 제목</label>
              <input className={style['title-input']} maxLength={40} type="text" id="meetings-title" name="meetings-title" defaultValue={initialData.name} />
            </fieldset>

            <fieldset className={style['category-fieldset']}>
              <label htmlFor="category">카테고리</label>

              <div className={style['category-div']}>
                <select className={style['category-select']} name="category" id="category" required defaultValue={initialData.extra?.category || ''}>
                  <option value="" disabled>
                    선택
                  </option>
                  <option value="운동">운동</option>
                  <option value="요리 / 제조">요리 / 제조</option>
                  <option value="문화 / 공연 / 축제">문화 / 공연 / 축제</option>
                  <option value="게임 / 오락">게임 / 오락</option>
                  <option value="사교">사교</option>
                  <option value="인문학 / 책 / 글">인문학 / 책 / 글</option>
                  <option value="아웃도어 / 여행">아웃도어 / 여행</option>
                  <option value="음악 / 악기">음악 / 악기</option>
                  <option value="업종 / 직무">업종 / 직무</option>
                  <option value="외국 / 언어">외국 / 언어</option>
                  <option value="공예 / 만들기">공예 / 만들기</option>
                  <option value="댄스 / 무용">댄스 / 무용</option>
                  <option value="봉사활동">봉사활동</option>
                  <option value="사진 / 영상">사진 / 영상</option>
                  <option value="자기계발">자기계발</option>
                  <option value="스포츠 관람">스포츠 관람</option>
                  <option value="반려동물">반려동물</option>
                  <option value="자동차 / 바이크">자동차 / 바이크</option>
                </select>
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                    fill="black"
                  />
                </svg>
              </div>
            </fieldset>

            <fieldset className={style['context-fieldset']}>
              <label htmlFor="meetings-content">모임 설명</label>

              <textarea className={style['content-input']} id="meetings-content" name="meetings-content" defaultValue={initialData.content} />
            </fieldset>

            <fieldset className={style['img-fieldset']}>
              <label htmlFor="meetings-img">모임 이미지</label>

              <div className={style['ractingle-wrap']}>
                <input type="file" id="meetings-img" name="meetings-img" accept="image/*" onChange={handleImageChange} disabled={isUploading} hidden />

                {isUploading ? (
                  <div className={style['loading-wrapper']}>
                    <ClipLoader size={50} color="#323577" />
                  </div>
                ) : imagePreview ? (
                  <button type="button" className={style['image-preview']} onClick={() => document.getElementById('meetings-img')?.click()} style={{ cursor: 'pointer' }} aria-label="이미지 변경">
                    <Image src={imagePreview} alt="미리보기" style={{ objectFit: 'cover', objectPosition: 'center' }} width={100} height={100} />{' '}
                  </button>
                ) : (
                  <button type="button" className={style['ractingle']} onClick={() => document.getElementById('meetings-img')?.click()} style={{ cursor: 'pointer' }} aria-label="이미지 추가">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path
                        d="M10.2857 1.28571C10.2857 0.574554 9.71116 0 9 0C8.28884 0 7.71429 0.574554 7.71429 1.28571V7.71429H1.28571C0.574554 7.71429 0 8.28884 0 9C0 9.71116 0.574554 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.4254 8.28884 18 9 18C9.71116 18 10.2857 17.4254 10.2857 16.7143V10.2857H16.7143C17.4254 10.2857 18 9.71116 18 9C18 8.28884 17.4254 7.71429 16.7143 7.71429H10.2857V1.28571Z"
                        fill="#fff"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </fieldset>

            <div className={style['field-parent-wrap']}>
              <fieldset className={style['date-fieldset']}>
                <label htmlFor="date">날짜</label>

                <input type="date" className={style['date-input']} id="date" name="date" required min={new Date().toISOString().split('T')[0]} defaultValue={initialData.extra?.date} />
              </fieldset>

              <fieldset className={style['region-fieldset']}>
                <label htmlFor="region" className={style['region-label']}>
                  장소
                </label>
                <input className={`${style['region-input']} `} maxLength={40} type="text" name="region" id="region" placeholder="모임 장소를 입력해주세요" required defaultValue={initialData.extra?.region}></input>
              </fieldset>

              <fieldset className={style['gender-fieldset']}>
                <label htmlFor="gender">성별</label>
                <div>
                  <select className={style['select-btn']} required id="gender" name="gender" defaultValue={initialData.extra?.gender || ''}>
                    <option value="" disabled defaultValue=""></option>
                    <option value="남">남</option>
                    <option value="여">여</option>
                    <option value="무관">무관</option>
                  </select>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </fieldset>

              <fieldset className={style['age-fieldset']}>
                <label htmlFor="age">나이</label>
                <div>
                  <select required id="age" name="age" className={style['select-btn']} defaultValue={initialData.extra?.age?.toString() || ''}>
                    <option value="" disabled defaultValue=""></option>
                    <option value="10">10대</option>
                    <option value="20">20대</option>
                    <option value="30">30대</option>
                    <option value="40">40대 이상</option>
                  </select>
                  <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </fieldset>
            </div>

            <fieldset className={style['count']}>
              <label htmlFor="count-input">
                인원
                <br />
                (0~300)명
              </label>
              <div className={style['counter-wrapper']}>
                <button type="button" className={style['count-btn, descrase']} onClick={handleDecrease} aria-label="인원 감소">
                  <svg width="18" height="3" viewBox="0 0 18 3" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0 1.5C0 0.670312 0.574554 0 1.28571 0H16.7143C17.4254 0 18 0.670312 18 1.5C18 2.32969 17.4254 3 16.7143 3H1.28571C0.574554 3 0 2.32969 0 1.5Z" fill="#323577" />
                  </svg>
                </button>
                <input type="number" id="count-input" name="count-input" min="0" max="300" value={count} onChange={handleCountChange} />
                <button type="button" className={style['count-btn, increase']} onClick={handleIncrease} aria-label="인원 증가">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path
                      d="M10.2857 1.28571C10.2857 0.574554 9.71116 0 9 0C8.28884 0 7.71429 0.574554 7.71429 1.28571V7.71429H1.28571C0.574554 7.71429 0 8.28884 0 9C0 9.71116 0.574554 10.2857 1.28571 10.2857H7.71429V16.7143C7.71429 17.4254 8.28884 18 9 18C9.71116 18 10.2857 17.4254 10.2857 16.7143V10.2857H16.7143C17.4254 10.2857 18 9.71116 18 9C18 8.28884 17.4254 7.71429 16.7143 7.71429H10.2857V1.28571Z"
                      fill="#323577"
                    />
                  </svg>
                </button>
              </div>
            </fieldset>
          </div>

          <div>
            <h2>신청자 전용 질문 작성</h2>
            <div className={style['question']}>
              <fieldset className={style['question-1-field']}>
                <label htmlFor="question-1">1번 질문</label>
                <input type="text" name="question-1" id="question-1" placeholder="신청자에게 물어볼 질문을 작성하세요" defaultValue={initialData.extra?.survey1} required />
              </fieldset>

              <fieldset className={style['question-2-field']}>
                <label htmlFor="question-2">2번 질문</label>
                <input type="text" name="question-2" id="question-2" placeholder="신청자에게 물어볼 질문을 작성하세요" defaultValue={initialData.extra?.survey2} required />
              </fieldset>
            </div>
          </div>
          <br />
          <div className={style['btn-wrap']}>
            <button className={style['btn']} type="submit">
              수정
            </button>
            <Link href={`/meetings/${meetingId}`}>
              <button className={style['btn-2']} type="button">
                취소
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
