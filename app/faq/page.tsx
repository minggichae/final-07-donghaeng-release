import Image from 'next/image';
import styles from './Faq.module.css';
import type { Metadata } from 'next';
import DefaultLayout from '@/app/components/DefaultLayout';

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description: 'Moa 서비스 이용에 대한 자주 묻는 질문과 답변을 확인하세요.',
};

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const faqData: FaqCategory[] = [
  {
    category: '서비스 이용',
    items: [
      {
        question: 'Moa는 어떤 서비스인가요?',
        answer: 'Moa는 취미와 관심사를 공유하는 사람들이 모임을 만들고 참여할 수 있는 소셜 모임 플랫폼입니다. 운동, 요리, 문화, 게임 등 다양한 카테고리의 모임을 찾거나 직접 만들 수 있습니다.',
      },
      {
        question: '서비스 이용에 비용이 발생하나요?',
        answer: 'Moa의 기본 서비스(모임 검색, 참여, 채팅 등)는 무료로 이용 가능합니다. 일부 프리미엄 기능의 경우 추후 유료로 제공될 수 있으며, 이 경우 사전에 안내드립니다.',
      },
      {
        question: '모임 추천은 어떤 기준으로 되나요?',
        answer: 'AI 기반 추천 시스템을 통해 회원님의 관심 카테고리, 위치, 참여 이력 등을 분석하여 맞춤형 모임을 추천해 드립니다.',
      },
    ],
  },
  {
    category: '계정',
    items: [
      {
        question: '회원가입은 어떻게 하나요?',
        answer: '홈페이지 상단의 "회원가입" 버튼을 클릭하여 이메일, 비밀번호, 닉네임 등 필수 정보를 입력하면 가입이 완료됩니다.',
      },
      {
        question: '비밀번호를 잊어버렸어요. 어떻게 해야 하나요?',
        answer: '로그인 페이지에서 "비밀번호 찾기"를 클릭한 후, 가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크가 전송됩니다.',
      },
    ],
  },
  {
    category: '모임',
    items: [
      {
        question: '모임은 어떻게 만드나요?',
        answer: '로그인 후 "모임 만들기" 버튼을 클릭하여 모임 이름, 카테고리, 일시, 장소, 최대 인원 등을 입력하면 모임을 생성할 수 있습니다.',
      },
      {
        question: '모임 장소는 어떻게 확인하나요?',
        answer: '모임 상세 페이지에서 지도를 통해 모임 장소를 확인할 수 있습니다. 카카오맵과 연동되어 정확한 위치 정보를 제공합니다.',
      },
      {
        question: '모임의 최대 인원 제한이 있나요?',
        answer: '모임 생성 시 모임장이 최대 인원을 자유롭게 설정할 수 있습니다. 최대 인원에 도달하면 더 이상 참여 신청이 불가능합니다.',
      },
    ],
  },
  {
    category: '채팅',
    items: [
      {
        question: '채팅은 어떻게 사용하나요?',
        answer: '모임에 참여하면 해당 모임의 채팅방에 자동으로 입장됩니다. 채팅 메뉴에서 참여 중인 모임의 채팅방 목록을 확인하고 실시간으로 대화할 수 있습니다.',
      },
      {
        question: '채팅 내용은 저장되나요?',
        answer: '채팅 내용은 서비스 이용 기간 동안 저장됩니다. 모임이 종료되거나 탈퇴한 경우에도 이전 채팅 기록을 확인할 수 있습니다.',
      },
    ],
  },
  {
    category: '기타',
    items: [
      {
        question: '문의사항이 있으면 어디로 연락하나요?',
        answer: '고객센터 이메일(support@moa.co.kr)로 문의해 주시면 운영시간(09:00~18:00, 주말·공휴일 제외) 내에 순차적으로 답변 드립니다.',
      },
      {
        question: '서비스 장애가 발생했을 때는 어떻게 하나요?',
        answer: '서비스 장애 발생 시 공지사항을 통해 안내드리며, 빠른 복구를 위해 최선을 다하겠습니다. 긴급한 문의는 고객센터 이메일로 연락해 주세요.',
      },
    ],
  },
];

export default function Faq() {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <h1 className={styles.title}>자주 묻는 질문</h1>
        <p className={styles.subtitle}>Moa 서비스 이용에 대해 궁금한 점을 확인해 보세요.</p>

        {faqData.map((category) => (
          <section key={category.category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.category}</h2>
            <div className={styles.list}>
              {category.items.map((item) => (
                <details key={item.question} className={styles.item}>
                  <summary className={styles.question}>
                    <Image className={styles.questionMark} src="/icon/search.svg" alt="" width={16} height={16} aria-hidden="true" />
                    <span className={styles.questionText}>{item.question}</span>
                    <Image className={styles.arrow} src="/icon/down.svg" alt="" width={12} height={12} aria-hidden="true" />
                  </summary>
                  <div className={styles.answer}>
                    <span className={styles.answerMark}>A</span>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </main>
    </DefaultLayout>
  );
}
