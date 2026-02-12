'use client';

import Link from 'next/link';
import style from './Detail.module.css';
import { useRouter } from 'next/navigation';
import useUserStore from '@/zustand/userStore';
import { Meetings } from '@/types/meetings';
import { useActionState, useEffect, useState } from 'react';
import { deleteMeeting } from '@/actions/meetings';
import { getMyMeetings } from '@/lib/meetings';

export default function NavigateButton({ meeting }: { meeting: Meetings }) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [, formAction] = useActionState(deleteMeeting, null);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [shouldApply, setShouldApplay] = useState(false);

  //신청하기 버튼 클릭 시 로그인 체크후 리다이렉트
  const handleApplyClick = () => {
    if (!user) {
      //로그인 안된 경우 로그인 페이지로 리다이렉트
      router.push('/login');
    } else {
      //로그인 된 경우 신청페이지로 이동
      router.push(`/meetings/${meeting._id}/apply`);
    }
  };
  // 신청 여부 확인
  useEffect(() => {
    const checkApplyStatus = async () => {
      if (!user?.token?.accessToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getMyMeetings(user.token.accessToken);

        if (response.ok === 1 && 'item' in response) {
          console.log('현재 모임 ID:', meeting._id);
          //item이 배열인지 확인
          const items = Array.isArray(response.item) ? response.item : [response.item];

          //현재 모임에 신청했는지 확인 (상태 상관없이)
          const applied = items.some((order) => Number(order.products?.[0]?._id) === Number(meeting._id));
          console.log('applied 결과:', applied);
          setIsApplied(applied);
        }
      } catch (error) {
        console.error('신청 상태 확인 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkApplyStatus();
  }, [user, meeting._id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) event.preventDefault();
  };

  return (
    <div className={style.buttonContainer}>
      {user?._id === meeting.seller_id ? (
        // 호스트일 때: 관리하기, 수정하기, 삭제하기
        <div className={style.hostMode}>
          <Link className={style.adminBtn} href={`/manage/${meeting._id}`}>
            관리하기
          </Link>
          <Link className={style.editBtn} href={`/meetings/${meeting._id}/edit`}>
            수정하기
          </Link>
          <form action={formAction} onSubmit={handleSubmit}>
            <input type="hidden" name="accessToken" value={user.token?.accessToken} />
            <input type="hidden" name="_id" value={meeting._id} />
            <button className={style.deleteBtn}>삭제하기</button>
          </form>
        </div>
      ) : (
        // 일반 사용자일 때: 신청하기 / 신청완료
        <div className={style.userMode}>
          {isApplied ? (
            <button className={style.appliedBtn} disabled>
              신청완료
            </button>
          ) : (
            <button onClick={handleApplyClick} className={isLoading ? style.appliedBtn : style.applyBtn} disabled={isLoading}>
              {isLoading ? '확인 중...' : '신청하기'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}