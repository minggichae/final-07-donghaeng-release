'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import styles from './Apply.module.css';
import { Meetings } from '@/types/meetings';
import { createApply } from '@/actions/meetings';
import toast, { Toaster } from 'react-hot-toast';

interface ApplyFormProps {
  meeting: Meetings;
  id: string;
}

export default function ApplyForm({ meeting, id }: ApplyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 유저 정보 가져오기
  const user = useUserStore((state) => state.user);
  const userId = user?._id;
  const accessToken = user?.token?.accessToken;
  console.log('유저아이디', userId);

  const processAction = async (id: string, answer1: string, answer2: string) => {
    const formData = new FormData();
    formData.append('accessToken', accessToken || '');
    formData.append(
      'products',
      JSON.stringify([
        {
          _id: Number(id),
          quantity: 0,
        },
      ])
    );
    formData.append(
      'extra',
      JSON.stringify({
        answer1,
        answer2,
      })
    );

    return await createApply(null, formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지가 리로드됨을 방지
    if (isSubmitting) return;
    setIsSubmitting(true);

    const form = e.currentTarget;
    const answer1 = (form.elements.namedItem('answer1') as HTMLTextAreaElement).value;
    const answer2 = (form.elements.namedItem('answer2') as HTMLTextAreaElement).value;
    const result = await processAction(id, answer1, answer2);

    if (result?.ok === 1) {
      toast.success('신청이 완료되었습니다.');
      setTimeout(() => {
        router.push(`/meetings/${id}`);
      }, 1000);
    } else {
      toast.error(result?.message || '신청에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <form className={styles['apply-body']} onSubmit={handleSubmit}>
        <h1 className={styles['apply-title']}>모임 신청</h1>
        <div className={styles['question-div']}>
          <label htmlFor="answer1"><h3>{meeting.extra.survey1}</h3></label>
          <textarea id="answer1" name="answer1" required></textarea>
        </div>
        <div className={styles['question-div']}>
          <label htmlFor="answer2"><h3>{meeting.extra.survey2}</h3></label>
          <textarea id="answer2" name="answer2" required></textarea>
        </div>
        <div className={styles['btn-div']}>
          <button type="submit" className={styles['btn-apply']} disabled={isSubmitting}>
            {isSubmitting ? '신청 중...' : '신청하기'}
          </button>
          <button type="button" className={styles['btn-cancel']} onClick={() => router.back()}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
}
