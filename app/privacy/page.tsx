import styles from './Privacy.module.css';
import type { Metadata } from 'next';
import DefaultLayout from '@/app/components/DefaultLayout';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'Moa의 개인정보처리방침을 확인하세요.',
};

export default function Privacy() {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <h1 className={styles.title}>개인정보처리방침</h1>
        <p className={styles.updated}>최종 수정일: 2026년 2월 12일</p>

        <p className={styles.intro}>
          Moa(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다. 본 개인정보처리방침을 통해 이용자의 개인정보가 어떠한 목적과 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
        </p>

        <section className={styles.section}>
          <h2>1. 수집하는 개인정보 항목</h2>
          <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>수집 항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>필수 항목</td>
                  <td>이메일 주소, 비밀번호, 닉네임</td>
                </tr>
                <tr>
                  <td>선택 항목</td>
                  <td>프로필 이미지, 관심 카테고리, 자기소개</td>
                </tr>
                <tr>
                  <td>자동 수집</td>
                  <td>접속 IP, 쿠키, 서비스 이용 기록, 접속 로그</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>2. 개인정보의 수집 및 이용 목적</h2>
          <ul>
            <li>회원 가입 및 본인 확인</li>
            <li>서비스 제공 및 운영 (모임 생성, 참여, 채팅 등)</li>
            <li>서비스 개선 및 맞춤형 모임 추천</li>
            <li>공지사항 전달 및 고객 문의 응대</li>
            <li>부정 이용 방지 및 서비스 안정성 확보</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 아래와 같이 보관합니다.</p>
          <ul>
            <li>
              계약 또는 청약철회 등에 관한 기록: <strong>5년</strong> (전자상거래법)
            </li>
            <li>
              소비자 불만 또는 분쟁 처리에 관한 기록: <strong>3년</strong> (전자상거래법)
            </li>
            <li>
              웹사이트 방문 기록: <strong>3개월</strong> (통신비밀보호법)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. 개인정보의 제3자 제공</h2>
          <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.</p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. 개인정보의 파기 절차 및 방법</h2>
          <ul>
            <li>
              <strong>파기 절차:</strong> 이용 목적이 달성된 개인정보는 별도의 DB로 옮겨져 내부 방침 및 관련 법령에 따라 일정 기간 저장 후 파기됩니다.
            </li>
            <li>
              <strong>파기 방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각합니다.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. 이용자의 권리와 행사 방법</h2>
          <ul>
            <li>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있습니다.</li>
            <li>이용자는 회원 탈퇴를 통해 개인정보의 수집 및 이용에 대한 동의를 철회할 수 있습니다.</li>
            <li>개인정보 열람, 정정, 삭제, 처리 정지 요청은 마이페이지 또는 고객센터를 통해 가능합니다.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. 쿠키의 사용</h2>
          <p>회사는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키를 사용합니다. 이용자는 브라우저 설정을 통해 쿠키의 저장을 거부할 수 있으나, 이 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.</p>
        </section>

        <section className={styles.section}>
          <h2>8. 개인정보 보호를 위한 기술적·관리적 대책</h2>
          <ul>
            <li>비밀번호 암호화 저장 및 전송</li>
            <li>해킹 등에 대비한 보안 시스템 운영</li>
            <li>개인정보 취급 직원의 최소화 및 교육</li>
            <li>접근 통제 시스템 운영</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. 개인정보 보호 책임자</h2>
          <div className={styles.contactInfo}>
            <p>
              <strong>개인정보 보호 책임자:</strong> 채민기
            </p>
            <p>
              <strong>이메일:</strong> support@moa.co.kr
            </p>
            <p>
              <strong>고객센터:</strong> 09:00 ~ 18:00 (주말·공휴일 제외)
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>10. 개인정보처리방침의 변경</h2>
          <p>본 개인정보처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 수 있으며, 변경 시 최소 7일 전에 서비스 내 공지사항을 통해 고지합니다.</p>
        </section>

        <section className={styles.section}>
          <p className={styles.effective}>본 개인정보처리방침은 2026년 2월 12일부터 시행됩니다.</p>
        </section>
      </main>
    </DefaultLayout>
  );
}
