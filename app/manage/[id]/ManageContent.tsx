'use client';

import styles from './Manage.module.css';
import { useEffect, useState } from 'react';
import { getManage } from '@/lib/manage';
import { getSellerProduct } from '@/lib/meetings';
import { patchManage } from '@/actions/manage';
import { updateBuyQuantity } from '@/actions/meetings';
import useUserStore from '@/zustand/userStore';
import { Manage } from '@/types/manage';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { createNoti } from '@/actions/notification';

interface ManageContentProps {
  productId: number;
}

export default function ManageContent({ productId }: ManageContentProps) {
  const [manage, setManage] = useState<Manage[]>();
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore((state) => state.user);
  const userId = user?._id;
  const accessToken = user?.token?.accessToken;

  useEffect(() => {
    const fetchManage = async () => {
      if (!userId || !accessToken) return;
      setIsLoading(true);
      const res = await getManage(accessToken);
      if (res.ok === 1) {
        const filtered = res.item.filter((item: Manage) => item.products[0]?._id === productId);
        setManage(filtered);
      }
      setIsLoading(false);
    };
    fetchManage();
  }, [userId, accessToken, productId]);

  const processAction = async (applicantId: number, isApprove: boolean) => {
    const formData = new FormData();
    formData.append('accessToken', accessToken || '');
    formData.append('_id', String(applicantId));
    formData.append('state', isApprove ? 'OS040' : 'OS310');
    formData.append('memo', isApprove ? '모임장이 신청을 승인하였습니다.' : '모임장이 신청을 거절하였습니다.');

    const result = await patchManage(null, formData);

    if (result?.ok === 1) {
      const applicant = manage?.find((item) => item._id === applicantId);
      const productIdFromApplicant = applicant?.products[0]?._id;
      if (isApprove) {
        if (productIdFromApplicant && accessToken) {
          const productData = await getSellerProduct(accessToken, productIdFromApplicant);
          const currentBuyQuantity = productData.ok === 1 ? productData.item?.buyQuantity || 0 : 0;
          await updateBuyQuantity(accessToken, productIdFromApplicant, currentBuyQuantity + 1);
        }
      }

      // 알림 생성
      if (applicant && accessToken) {
        // 알림에 필요한 정보들을 append를 통해 넣기
        const notiFormData = new FormData();
        notiFormData.append('accessToken', accessToken);
        notiFormData.append('target_id', String(applicant.user_id));
        notiFormData.append('content', isApprove ? '모임에 승인되었습니다.' : '모임에 거절되었습니다.');
        notiFormData.append('type', 'noti');
        notiFormData.append('meetingId', String(productId));
        notiFormData.append('meetingTitle', applicant?.products[0]?.name || '');
        notiFormData.append('mainImages', applicant?.products[0]?.image?.path || '');
        await createNoti(null, notiFormData);
      }
      toast.success(isApprove ? '승인되었습니다.' : '거절되었습니다.');
      setManage((prev) => prev?.filter((item) => item._id !== applicantId));
    } else {
      toast.error('처리 중 오류가 발생했습니다.');
    }
  };

  const handleAction = (applicantId: number, actionType: 'approve' | 'reject') => {
    const isApprove = actionType === 'approve';
    const confirmMessage = isApprove ? '모임을 승인하시겠습니까?' : '모임을 거절하시겠습니까?';

    toast(
      (t) => (
        <div className={styles['toast-container']}>
          <span className={styles['toast-message']}>{confirmMessage}</span>
          <div className={styles['toast-btn-group']}>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                processAction(applicantId, isApprove);
              }}
              className={isApprove ? styles['toast-btn-confirm'] : styles['toast-btn-reject']}
            >
              확인
            </button>
            <button onClick={() => toast.dismiss(t.id)} className={styles['toast-btn-cancel']}>
              취소
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className={styles['applicant-div-skelton']}>
            {/* 데스크탑 프로필 이미지 */}
            <div className={styles['profile-img-desktop']} />

            <div className={styles['applicant-btn-wrapper']}>
              <div className={styles['applicant-information']}>
                {/* 모바일 프로필 이미지 */}
                <div className={styles['profile-img-mobile']} />

                {/* 이름 */}
                <div className={styles['name']} />

                {/* bpm 영역 */}
                <div className={styles['bpm']} />
              </div>

              {/* 버튼 */}
              <div className={styles['btn-div']}>
                <div className={styles['btn']} />
                <div className={styles['btn']} />
              </div>
            </div>

            {/* 질문 영역 */}
            <div className={styles['question-div-bundle']}>
              <div className={styles['question-div']}>
                <div className={styles['question']} />
                <div className={styles['answer']} />
              </div>

              <div className={styles['question-div']}>
                <div className={styles['question']} />
                <div className={styles['answer']} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (!manage || manage.length === 0) {
    return <p className={styles['no-applicants']}>신청자가 없습니다.</p>;
  }

  return (
    <>
      <Toaster position="top-center" />
      {manage.map((applicant) => (
        <div key={applicant._id} className={styles['applicant-div']}>
          <Image src={applicant.user.image || '/logo/logo.svg'} loading="eager" width={100} height={100} alt={`${applicant.user.name} 프로필 이미지`} className={styles['profile-img-desktop']} />
          <div className={styles['applicant-btn-wrapper']}>
            <div className={styles['applicant-information']}>
              <Image src={applicant.user.image || '/logo/logo.svg'} loading="eager" width={100} height={100} alt={`${applicant.user.name} 프로필 이미지`} className={styles['profile-img-mobile']} />
              <span>{applicant.user.name}</span>
              <figure>
                <svg width="57" height="51" viewBox="0 0 57 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M28.3333 51C27.4833 51 26.6688 50.8465 25.8896 50.5396C25.1104 50.2326 24.4139 49.7722 23.8 49.1583L4.81667 30.1042C3.16389 28.4514 1.94792 26.5625 1.16875 24.4375C0.389583 22.3125 0 20.0931 0 17.7792C0 12.9153 1.58194 8.73611 4.74583 5.24167C7.90972 1.74722 11.8528 0 16.575 0C18.8417 0 20.9785 0.448611 22.9854 1.34583C24.9924 2.24306 26.775 3.49444 28.3333 5.1C29.8444 3.49444 31.6035 2.24306 33.6104 1.34583C35.6174 0.448611 37.7542 0 40.0208 0C44.7431 0 48.6979 1.74722 51.8854 5.24167C55.0729 8.73611 56.6667 12.8917 56.6667 17.7083C56.6667 20.0222 56.2653 22.2417 55.4625 24.3667C54.6597 26.4917 53.4556 28.3806 51.85 30.0333L32.7958 49.1583C32.1819 49.7722 31.4972 50.2326 30.7417 50.5396C29.9861 50.8465 29.1833 51 28.3333 51ZM31.1872 14.875C31.5513 14.875 31.875 14.9694 32.1583 15.1583C32.4417 15.3472 32.7014 15.5833 32.9375 15.8667L37.9667 23.375H51.2925C51.6675 22.4575 51.9485 21.5265 52.1355 20.582C52.3229 19.6376 52.4167 18.6797 52.4167 17.7083C52.4167 14.0722 51.2373 10.9201 48.8785 8.25208C46.5203 5.58403 43.5722 4.25 40.0343 4.25C38.3725 4.25 36.7743 4.59236 35.2396 5.27708C33.7049 5.96181 32.3708 6.91806 31.2375 8.14583L29.325 10.2C29.1833 10.3417 29.0417 10.4597 28.9 10.5542C28.7583 10.6486 28.5694 10.6958 28.3333 10.6958C28.0972 10.6958 27.8932 10.6514 27.7213 10.5627C27.5499 10.4734 27.3997 10.3525 27.2708 10.2L25.3583 8.14583C24.2122 6.92656 22.8749 5.97243 21.3463 5.28346C19.8182 4.59449 18.2278 4.25 16.575 4.25C13.0536 4.25 10.119 5.58261 7.77113 8.24783C5.42371 10.9131 4.25 14.0666 4.25 17.7083C4.25 18.6868 4.34444 19.6515 4.53333 20.6026C4.72222 21.5536 4.99729 22.4778 5.35854 23.375H19.8333C20.1913 23.375 20.531 23.4602 20.8526 23.6307C21.1747 23.8012 21.4252 24.0229 21.6042 24.2958L24.8625 29.2542L29.1125 16.3625C29.2579 15.9375 29.5219 15.5833 29.9044 15.3C30.2864 15.0167 30.714 14.875 31.1872 14.875ZM31.8042 21.7458L27.4833 34.6375C27.3431 35.0625 27.0798 35.4167 26.6935 35.7C26.3073 35.9833 25.8858 36.125 25.4292 36.125C25.0514 36.125 24.7208 36.0306 24.4375 35.8417C24.1542 35.6528 23.9181 35.4167 23.7292 35.1333L18.7 27.625H8.35833L26.8458 46.1125C27.0819 46.3486 27.3133 46.5139 27.54 46.6083C27.7667 46.7028 28.0311 46.75 28.3333 46.75C28.6356 46.75 28.9 46.7028 29.1267 46.6083C29.3533 46.5139 29.5847 46.3486 29.8208 46.1125L48.2375 27.625H36.8333C36.4556 27.625 36.125 27.5306 35.8417 27.3417C35.5583 27.1528 35.2986 26.9167 35.0625 26.6333L31.8042 21.7458Z"
                    fill="#c5baff"
                  />
                </svg>
                <figcaption>
                  70 <br />
                  bpm
                </figcaption>
              </figure>
            </div>
            <div className={styles['btn-div']}>
              <button type="button" className={styles['btn-approve']} onClick={() => handleAction(applicant._id, 'approve')}>
                승인
              </button>
              <button type="button" className={styles['btn-no']} onClick={() => handleAction(applicant._id, 'reject')}>
                거절
              </button>
            </div>
          </div>
          <dl className={styles['question-div-bundle']}>
            <div className={styles['question-div']}>
              <dt>{applicant.products[0]?.extra?.survey1 || '질문1'}</dt>
              <dd>{applicant.extra?.answer1 || '답변 없음'}</dd>
            </div>
            <div className={styles['question-div']}>
              <dt>{applicant.products[0]?.extra?.survey2 || '질문2'}</dt>
              <dd>{applicant.extra?.answer2 || '답변 없음'}</dd>
            </div>
          </dl>
        </div>
      ))}
    </>
  );
}
