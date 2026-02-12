'use client';

import style from './signup.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const { user } = useUserStore();
  const accessToken = user?.token?.accessToken;
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();
  useEffect(() => {
    if (!hasHydrated) return;
    // 로컬 스토리지 복원 안끝났으면 아~무것도 안함

    if (accessToken) {
      router.replace('/');
    }
    // 로그인 했으면 메인 페이지로 강제이동
  }, [router, hasHydrated, accessToken]);

  const [currentStep, setCurrentStep] = useState(1);
  // 지금 몇번째 페이지인지 저장하기 위해서 선언

  const [isSubmitting, setIsSubmitting] = useState(false);
  // 회원가입 버튼 눌렀을때 제출 중인지 체크

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    region: '',
    age: '',
    gender: '',
    image: '/images/default-profile.png',
  });

  // 중복확인 상태 추가
  const [checkStatus, setCheckStatus] = useState({
    email: false, // 이메일 중복확인 완료 여부
    name: false, // 닉네임 중복확인 완료 여부
  });

  // 에러 상태 추가
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    region: '',
    age: '',
    gender: '',
    image: '/images/default-profile.png',
  });

  // 성공 상태
  const [successMessages, setSuccessMessages] = useState({
    email: '',
    name: '',
  });

  // 이메일 중복확인
  const checkEmailDuplicate = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: '이메일을 먼저 입력해주세요.' });
      return;
    }

    // 이메일 정규식
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: '올바른 이메일 형식이 아닙니다.' });
      return;
    }

    try {
      // 이메일 중복확인 API 호출
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email?email=${encodeURIComponent(formData.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
      });

      const data = await res.json();

      console.log('이메일 중복확인 응답:', data);
      console.log('응답 상태:', res.status);

      // HTTP 상태 코드 먼저 체크
      if (!res.ok) {
        // 422, 409 등 에러 응답 처리
        if (res.status === 409) {
          setCheckStatus({ ...checkStatus, email: false });
          // 중복확인 실패

          setErrors({ ...errors, email: '이미 존재하는 이메일입니다.' });

          setSuccessMessages({ ...successMessages, email: '' });
          // 성공 메시지 지움
        } else if (res.status === 422) {
          setCheckStatus({ ...checkStatus, email: false });
          setErrors({ ...errors, email: data.message || '유효하지 않은 이메일입니다.' });
          setSuccessMessages({ ...successMessages, email: '' });
        } else {
          throw new Error(data.message || '이메일 확인 실패');
          // 다른 에러가 뜬 경우 예상못한 에러를 catch로 보냄
        }
        return;
      }

      // 200 응답일 때만 data.ok 체크
      if (data.ok === 1) {
        setCheckStatus({ ...checkStatus, email: true });
        setErrors({ ...errors, email: '' });
        setSuccessMessages({ ...successMessages, email: '중복확인 완료' });
      } else {
        setCheckStatus({ ...checkStatus, email: false });
        setErrors({ ...errors, email: data.message || '사용할 수 없는 이메일입니다.' });
        setSuccessMessages({ ...successMessages, email: '' });
      }
    } catch (error) {
      console.error(error);
      setCheckStatus({ ...checkStatus, email: false });
      setErrors({ ...errors, email: '이메일 중복 확인에 실패했습니다.' });
      setSuccessMessages({ ...successMessages, email: '' });
    }
  };

  // 닉네임 중복확인
  const checkNameDuplicate = async () => {
    if (!formData.name) {
      setErrors({ ...errors, name: '닉네임을 먼저 입력해주세요.' });
      return;
    }

    if (formData.name.length < 2 || formData.name.length > 6) {
      setErrors({ ...errors, name: '닉네임은 2~6글자로 입력해주세요.' });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/name?name=${encodeURIComponent(formData.name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
      });

      const data = await res.json();

      if (data.ok === 1) {
        setCheckStatus({ ...checkStatus, name: true });
        setErrors({ ...errors, name: '' });
        setSuccessMessages({ ...successMessages, name: '중복확인 완료' });
      } else if (res.status === 409) {
        setCheckStatus({ ...checkStatus, name: false });
        setErrors({ ...errors, name: '이미 존재하는 닉네임입니다.' });
        setSuccessMessages({ ...successMessages, name: '' });
      }
    } catch (error) {
      console.error(error);
      toast.error('중복확인에 실패했습니다.');
    }
  };

  // input 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 해당 필드 에러 지우기
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // 이메일 검사
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    } else if (!checkStatus.email) {
      newErrors.email = '이메일 중복확인을 해주세요.';
      isValid = false;
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8글자 이상 입력해야 합니다.';
      isValid = false;
    }

    // 비밀번호 확인 검사
    if (!formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호를 한번 더 입력해 주세요.';
      isValid = false;
    } else if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 2단계 유효성 검사
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // 닉네임 검사
    if (!formData.name) {
      newErrors.name = '닉네임을 입력해주세요.';
      isValid = false;
    } else if (formData.name.length < 2 || formData.name.length > 6) {
      newErrors.name = '닉네임은 최소 2글자 ~ 최대 6글자 사이로 입력해주세요.';
      isValid = false;
    } else if (!checkStatus.name) {
      newErrors.name = '닉네임 중복확인을 해주세요.';
      isValid = false;
    }

    // 지역 검사
    if (!formData.region) {
      newErrors.region = '지역을 선택해주세요.';
      isValid = false;
    }

    // 나이 검사
    if (!formData.age) {
      newErrors.age = '나이를 선택해주세요.';
      isValid = false;
    }

    // 성별 검사
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 다음 단계로
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // 이전 단계로
  const handlePrevStep = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(1);
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
        body: JSON.stringify({
          type: 'seller',
          email: formData.email,
          password: formData.password,
          name: formData.name,
          region: formData.region,
          age: Number(formData.age),
          gender: formData.gender,
          image: formData.image,
        }),
      });

      const data = await res.json();

      if (data.ok === 1) {
        toast.success('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        toast.error(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      toast.error('일시적인 네트워크 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={style['main']}>
      <Toaster position="top-center" />
      <div className={style['signup-wrap']}>
        <form onSubmit={handleSubmit}>
          {/* ==================== 첫 번째 페이지 ==================== */}
          {currentStep === 1 && (
            <section className={style['signup-step']}>
              <button type="button" className={`${style['back-btn']} ${style['first-btn']}`} onClick={handlePrevStep} aria-label="이전페이지">
                <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.439367 8.09227C-0.146456 8.59433 -0.146456 9.40968 0.439367 9.91175L9.43761 17.6235C10.0234 18.1255 10.9748 18.1255 11.5606 17.6235C12.1465 17.1214 12.1465 16.306 11.5606 15.804L3.62156 9L11.5559 2.19603C12.1418 1.69396 12.1418 0.878612 11.5559 0.376548C10.9701 -0.125516 10.0187 -0.125516 9.43292 0.376548L0.43468 8.08825L0.439367 8.09227Z"
                    fill="black"
                  />
                </svg>
              </button>
              <div className={style['logo-img']} role="img" aria-label="Moa 로고"></div>
              <h1 className="sr-only">회원가입</h1>

              <div className={style['email-fieldset']}>
                <div>
                  <label className={style['label']} htmlFor="email">
                    이메일
                  </label>
                  <input className={style['input']} name="email" value={formData.email} onChange={handleChange} type="email" id="email" placeholder="이메일을 입력해 주세요" required aria-describedby={errors.email ? 'signup-email-error' : successMessages.email ? 'signup-email-success' : undefined} />
                </div>
                <button type="button" className={style['check-btn']} onClick={checkEmailDuplicate}>
                  중복확인
                </button>
                {errors.email && <span id="signup-email-error" role="alert" className={`${style['field-message']} ${style['field-email']}`}>{errors.email}</span>}
                {successMessages.email && <span id="signup-email-success" className={`${style['ok-message']} ${style['field-email']}`}>{successMessages.email}</span>}
              </div>

              <div>
                <label className={style['label']} htmlFor="password">
                  비밀번호
                </label>
                <input className={style['input']} name="password" value={formData.password} onChange={handleChange} type="password" id="password" placeholder="비밀번호를 입력해 주세요" required aria-describedby={errors.password ? 'signup-password-error' : undefined} />
                {errors.password && <span id="signup-password-error" role="alert" className={`${style['field-message']} ${style['field-password']}`}>{errors.password}</span>}
              </div>

              <div>
                <label className={style['label']} htmlFor="password-check">
                  비밀번호 확인
                </label>
                <input className={style['input']} name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} type="password" id="password-check" placeholder="비밀번호를 한번 더 입력해 주세요" required aria-describedby={errors.passwordCheck ? 'signup-passwordcheck-error' : undefined} />
                {errors.passwordCheck && <span id="signup-passwordcheck-error" role="alert" className={`${style['field-message']} ${style['field-password']}`}>{errors.passwordCheck}</span>}
              </div>

              <button type="button" onClick={handleNextStep} className={style['btn']}>
                다음으로
              </button>
            </section>
          )}

          {/* ==================== 두 번째 페이지 ==================== */}
          {currentStep === 2 && (
            <section className={style['signup-step']}>
              <button type="button" className={style['back-btn']} onClick={handlePrevStep} aria-label="이전페이지">
                <svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.439367 8.09227C-0.146456 8.59433 -0.146456 9.40968 0.439367 9.91175L9.43761 17.6235C10.0234 18.1255 10.9748 18.1255 11.5606 17.6235C12.1465 17.1214 12.1465 16.306 11.5606 15.804L3.62156 9L11.5559 2.19603C12.1418 1.69396 12.1418 0.878612 11.5559 0.376548C10.9701 -0.125516 10.0187 -0.125516 9.43292 0.376548L0.43468 8.08825L0.439367 8.09227Z"
                    fill="black"
                  />
                </svg>
              </button>
              <div className={style['logo-img']} role="img" aria-label="Moa 로고"></div>

              <div className={style['nickname-fieldset']}>
                <div>
                  <label className={style['label']} htmlFor="nickname">
                    닉네임
                  </label>
                  <input className={style['input']} name="name" value={formData.name} onChange={handleChange} type="text" id="nickname" placeholder="닉네임을 입력해 주세요" required aria-describedby={errors.name ? 'signup-name-error' : successMessages.name ? 'signup-name-success' : undefined} />
                </div>
                <button type="button" className={style['check-btn']} onClick={checkNameDuplicate}>
                  중복확인
                </button>
                {errors.name && <span id="signup-name-error" role="alert" className={`${style['field-message']} ${style['field-nickname']}`}>{errors.name}</span>}
                {successMessages.name && <span id="signup-name-success" className={`${style['ok-message']} ${style['field-nickname']}`}>{successMessages.name}</span>}
              </div>

              <div className={style['region-fieldset']}>
                <div className={style['field-div']}>
                  <label className={style['label']} htmlFor="region">
                    지역
                  </label>
                  <select className={style['select']} name="region" value={formData.region} onChange={handleChange} id="region" required aria-describedby={errors.region ? 'signup-region-error' : undefined}>
                    <option value="">지역을 선택해 주세요</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종특별자치시">세종특별자치시</option>
                    <option value="경기도">경기도</option>
                    <option value="강원특별자치도">강원특별자치도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주특별자치도">제주특별자치도</option>
                  </select>
                </div>
                <svg aria-hidden="true" className={style['svg-1']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                    fill="black"
                  />
                </svg>
              </div>
              {errors.region && <span id="signup-region-error" role="alert" className={style['field-message']}>{errors.region}</span>}

              <div className={style['fieldset-wrap']}>
                <div className={style['age-fieldset']}>
                  <div className={style['field-div']}>
                    <label className={style['label']} htmlFor="age">
                      나이
                    </label>
                    <div>
                      <select className={style['select']} name="age" value={formData.age} onChange={handleChange} id="age" required aria-describedby={errors.age ? 'signup-age-error' : undefined}>
                        <option value="">선택</option>
                        <option value="10">10대</option>
                        <option value="20">20대</option>
                        <option value="30">30대</option>
                        <option value="40">40대 이상</option>
                      </select>
                    </div>
                    <svg aria-hidden="true" className={style['svg-2']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                {errors.age && <span id="signup-age-error" role="alert" className={style['field-message']}>{errors.age}</span>}

                <div className={style['gender-fieldset']}>
                  <div className={style['field-div']}>
                    <label className={style['label']} htmlFor="gender">
                      성별
                    </label>
                    <select className={style['select']} name="gender" value={formData.gender} onChange={handleChange} id="gender" required aria-describedby={errors.gender ? 'signup-gender-error' : undefined}>
                      <option value="">선택</option>
                      <option value="남">남</option>
                      <option value="여">여</option>
                    </select>
                  </div>
                  <svg aria-hidden="true" className={style['svg-3']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                      fill="black"
                    />
                  </svg>
                </div>
                {errors.gender && <span id="signup-gender-error" role="alert" className={style['field-message']}>{errors.gender}</span>}
              </div>

              <button type="submit" className={style['btn']} disabled={isSubmitting}>
                {isSubmitting ? '가입 중...' : '회원가입'}
              </button>
            </section>
          )}
        </form>
      </div>
    </main>
  );
}
