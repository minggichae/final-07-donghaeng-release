import styles from './Terms.module.css';
import type { Metadata } from 'next';
import DefaultLayout from '@/app/components/DefaultLayout';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'Moa 서비스 이용약관을 확인하세요.',
};

export default function Terms() {
  return (
    <DefaultLayout>
      <main className={styles.container}>
        <h1 className={styles.title}>이용약관</h1>
        <p className={styles.updated}>최종 수정일: 2026년 2월 12일</p>

        <section className={styles.section}>
          <h2>제1조 (목적)</h2>
          <p>본 약관은 Moa(이하 &quot;회사&quot;)가 제공하는 모임 플랫폼 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section className={styles.section}>
          <h2>제2조 (용어의 정의)</h2>
          <ol>
            <li>&quot;서비스&quot;란 회사가 제공하는 모임 생성, 참여, 채팅 등 모임 관련 온라인 플랫폼 서비스를 말합니다.</li>
            <li>&quot;이용자&quot;란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
            <li>&quot;회원&quot;이란 회사에 개인정보를 제공하여 회원 등록을 한 자로서, 회사의 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
            <li>&quot;모임&quot;이란 회원이 서비스를 통해 생성하거나 참여할 수 있는 취미, 관심사 기반의 그룹 활동을 말합니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제3조 (약관의 효력 및 변경)</h2>
          <ol>
            <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
            <li>회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 적용일 7일 전부터 공지합니다.</li>
            <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제4조 (이용계약의 체결)</h2>
          <ol>
            <li>이용계약은 이용자가 약관의 내용에 동의한 후 회원가입 신청을 하고, 회사가 이를 승낙함으로써 체결됩니다.</li>
            <li>
              회사는 다음 각 호에 해당하는 경우 회원가입을 거절하거나 사후에 이용계약을 해지할 수 있습니다.
              <ul>
                <li>타인의 정보를 도용한 경우</li>
                <li>허위 정보를 기재한 경우</li>
                <li>기타 회사가 정한 이용 요건을 충족하지 못한 경우</li>
              </ul>
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제5조 (서비스의 제공 및 변경)</h2>
          <ol>
            <li>
              회사는 다음과 같은 서비스를 제공합니다.
              <ul>
                <li>모임 생성 및 관리 서비스</li>
                <li>모임 검색 및 참여 서비스</li>
                <li>실시간 채팅 서비스</li>
                <li>모임 추천 서비스</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
            </li>
            <li>회사는 서비스의 내용을 변경할 수 있으며, 변경 시 변경 내용을 사전에 공지합니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제6조 (서비스의 중단)</h2>
          <p>회사는 시스템 정기점검, 증설 및 교체, 천재지변, 국가비상사태 등 불가항력적인 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 사전에 공지하며, 사전 공지가 불가능한 경우에는 사후에 공지합니다.</p>
        </section>

        <section className={styles.section}>
          <h2>제7조 (회원의 의무)</h2>
          <ol>
            <li>
              회원은 서비스 이용 시 다음 각 호의 행위를 하여서는 안 됩니다.
              <ul>
                <li>타인의 정보를 도용하는 행위</li>
                <li>회사의 지적재산권을 침해하는 행위</li>
                <li>다른 이용자에게 불쾌감을 주는 행위</li>
                <li>영리 목적의 광고성 정보를 전송하는 행위</li>
                <li>서비스의 안정적 운영을 방해하는 행위</li>
                <li>기타 관련 법령에 위반되는 행위</li>
              </ul>
            </li>
            <li>회원은 관련 법령, 본 약관, 이용안내 등 회사가 통지하는 사항을 준수하여야 합니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제8조 (회사의 의무)</h2>
          <ol>
            <li>회사는 관련 법령과 본 약관이 금지하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다합니다.</li>
            <li>회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제9조 (책임의 제한)</h2>
          <ol>
            <li>회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
            <li>회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</li>
            <li>회사는 이용자 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>제10조 (분쟁 해결)</h2>
          <ol>
            <li>본 약관에 관한 분쟁은 대한민국 법률에 따라 해석되며, 분쟁이 발생할 경우 회사의 본사 소재지를 관할하는 법원을 전속관할 법원으로 합니다.</li>
            <li>회사와 이용자 간에 발생한 분쟁에 관하여는 전자거래기본법 및 동법 시행령에서 정하는 바에 따릅니다.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>부칙</h2>
          <p>본 약관은 2026년 2월 12일부터 시행됩니다.</p>
        </section>
      </main>
    </DefaultLayout>
  );
}
