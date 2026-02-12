# Moa (모아) - 취미 공유 플랫폼

지도 기반 모임 탐색과 AI 맞춤 모임 추천을 통한 취미 공유 커뮤니티 플랫폼입니다.

![banner-image](docs/images/배너.png)

## 📋 프로젝트 개요

취미 중심 사용자 연결을 통한 간편한 모임 참여 플랫폼입니다.
지도 기반 모임 탐색, AI 맞춤 모임 추천, 1:1 실시간 채팅 기능을 제공하여
부담 없이 새로운 경험을 시작할 수 있도록 돕습니다.

🔗 [사이트 바로가기](https://final-07-moa-release.vercel.app/)

## 📌 주요 기능

### 취미 중심 모임 플랫폼

- 사용자 계정 인증을 통한 서비스 접근
- 키워드 검색 기능
- Socket.io 기반 1:1 실시간 채팅
- OpenAI GPT를 활용한 AI 성향 기반 모임 추천
- 카테고리별, 최신순 정렬
- 다중 필터 선택 시 즉시 결과 반영 (지역, 날짜, 성별, 나이대)

### 지도 기반 모임 탐색

- 카카오맵 API 연동
- 마커 클릭 시 커스텀 오버레이 호출
- 바로가기 클릭 시 모임 상세로 이동
- 필터를 통한 지역별 모임 검색

### 마이페이지 관리

- 프로필 정보 수정 (닉네임, 지역, 나이, 성별, 자기소개)
- 모임 관리하기 (신청자 승인/거절)
- 북마크 추가/삭제
- 모임 조회 (전체/참여 전/참여 후)

### 모임 생명주기 관리

- 모임 등록 (이미지, 질문지 포함)
- 모임 수정/삭제
- 모임 신청 및 질문지 답변
- 신청자 관리 및 알림 전송

## 📅 개발 기간

> 2026.01.14 ~ 2026.02.13

## 👥 프로젝트 팀 소개

| 프로필 | 이름 | 역할 | 담당 페이지 | GitHub |
| :---: | :---: | :---: | :--- | :---: |
| <img src="https://github.com/minggichae.png" width="80"> | 채민기 | 팀장, PM | 마이페이지, 수정페이지<br/>지도 페이지<br/>알림 페이지<br/>필터 컴포넌트 | [GitHub](https://github.com/minggichae) |
| <img src="https://github.com/holyhw.png" width="80"> | 유현욱 | 팀원, PL | 헤더, 푸터 컴포넌트<br/>메인페이지, AI 추천<br/>모임/참여자 관리 페이지<br/>채팅 페이지<br/>북마크 기능 | [GitHub](https://github.com/holyhw) |
| <img src="https://github.com/kkhhjjoo.png" width="80"> | 김현주 | 팀원, 서기 | 모임 리스트 페이지<br/>모임 상세 페이지 | [GitHub](https://github.com/kkhhjjoo) |
| <img src="https://github.com/jian526.png" width="80"> | 김지안 | 팀원, 발표 | 로그인, 회원가입 페이지<br/>모임 등록/수정 페이지<br/>모임 조회 페이지 | [GitHub](https://github.com/jian526) |

## ⚙️ 기술 스택

| 분류 | 기술 |
| :--- | :--- |
| **프론트엔드** | ![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **상태 관리** | ![Zustand](https://img.shields.io/badge/Zustand_5-000000?style=flat-square) |
| **스타일링** | ![CSS Modules](https://img.shields.io/badge/CSS_Modules-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **실시간 통신** | ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white) |
| **API** | ![Kakao](https://img.shields.io/badge/Kakao_Map_API-FFCD00?style=flat-square&logo=kakao&logoColor=black) ![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white) |
| **UI 컴포넌트** | ![HeadlessUI](https://img.shields.io/badge/Headless_UI-66E3FF?style=flat-square&logo=headlessui&logoColor=black) ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white) |
| **UI/UX 디자인** | ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white) |
| **개발 환경** | ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white) |
| **협업 툴** | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white) |
| **배포** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |
| **이미지 호스팅** | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) |

## 📚 라이브러리 선정 이유

| 기술 스택 | 도입 이유 |
| :--- | :--- |
| React | 컴포넌트 기반 아키텍처를 통한 UI 재사용성 및 개발 생산성 향상 |
| Next.js | 서버 사이드 렌더링(SSR)과 파일 기반 라우팅을 통한 성능 최적화 및 SEO 개선, App Router를 활용한 Server Actions 지원 |
| Zustand | 간결한 API와 보일러플레이트 최소화를 통한 효율적인 전역 상태 관리, localStorage persist 기능으로 새로고침 시 상태 유지 |
| CSS Modules | 스코프 격리를 통한 스타일 충돌 방지 및 컴포넌트 단위 스타일 관리 |
| Socket.io | 실시간 양방향 통신으로 1:1 채팅 및 읽음 상태 추적 기능 구현 |
| OpenAI API | GPT-4o-mini 모델을 활용한 사용자 맞춤형 모임 카테고리 추천 |
| Kakao Map API | 지역 기반 모임 위치 시각화 및 지도 탐색 기능 |
| Headless UI | 접근성을 고려한 UI 컴포넌트 (모달, 드롭다운 등) |
| Swiper | 메인 페이지 배너 및 카테고리 캐러셀 구현 |

## 🖥️ 서비스 소개

### 🔐 로그인/회원가입

- 이메일 로그인
- 회원가입 시 각 항목별 유효성 검사
- 토큰 기반 인증 (accessToken, refreshToken)

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/로그인.gif" width="500"/>   | <img src="docs/gif/로그인_모바일버전.gif" width="200"/>   |
| <img src="docs/gif/회원가입.gif" width="500"/> | <img src="docs/gif/회원가입_모바일버전.gif" width="200"/> |

---

### 🏠 홈화면

- 메인 배너 및 서비스 안내
- 카테고리별 모임 리스트 추천
- 지도 미리보기 (카카오맵 연동)
- 키워드 검색 기능
- AI 추천 모달


| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/fa1023ff-5af8-46c7-a10a-fae2eeb2924a" width="500"/> | <img src="https://github.com/user-attachments/assets/09b66980-cd58-488a-bc7a-aa10c2ef8788" width="200"/> |

---

### 📋 모임목록

- 카테고리별, 필터별 검색 (지역, 날짜, 성별, 나이대)
- 북마크 기능
- 무한 스크롤 지원

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/fdd8ddc0-92dd-49af-838d-49b8043a8f25" width="500"/>  | <img src="https://github.com/user-attachments/assets/16ff602c-0387-4b43-9cbe-ff5a316175a9" width="200"/> |

---

### 📄 모임상세

- 상세 정보 조회
- 주최자 프로필 확인
- 모임 신청, 관리, 수정, 삭제
- 주최자와 1:1 채팅

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/961f10da-ba25-4339-b26f-4b26e9c2554e" width="500"/> | <img src="https://github.com/user-attachments/assets/04b1c14b-ce17-4f68-80c7-893c3d91701e" width="200"/> |

---

### ➕ 모임등록

- 모임 제목, 카테고리, 설명, 날짜, 장소, 성별, 나이, 인원 설정
- 모임 이미지 업로드 (Cloudinary)
- 질문지 작성 (최대 2개)

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/모임등록.gif" width="500"/> | <img src="docs/gif/모임등록_모바일버전.gif" width="200"/> |

---

### ✏️ 모임수정

- 기존 모임 내용 호출
- 이미지 업로드 수정
- 질문지 작성 수정

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/9b473952-88ef-4949-8a4e-bbafd24ff90c" width="500"/> | <img src="https://github.com/user-attachments/assets/50314b45-1419-4208-a6ce-fbaf2deb37be" width="200"/> |

---

### ✉️ 모임신청

- 질문지 답변
- 신청 관리

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/모임신청.png" width="500"/> | <img src="docs/gif/모임신청_모바일버전.gif" width="200"/> |

---


### 👀 모임조회

- 전체, 참여 전, 참여 후 구분 표시
- 신청 대기/승인/거절 상태 표시

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/a2d5cd1f-5515-46e5-9a7a-1716481ef1e8" width="500"/> | <img src="https://github.com/user-attachments/assets/b3e9e6ab-6cbc-46c7-b5a4-879ed6e8eb2f" width="200"/> |

---

### ⭐ 북마크

- 북마크 토글로 목록 추가/제거

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/67efefd9-5fec-4e38-bb4e-dafc0ecfb79f" width="500"/> | <img src="https://github.com/user-attachments/assets/c1c7cbdf-5a99-4f68-a495-54501f37b5ab" width="200"/> |

---

### 👤 마이페이지

- 프로필 수정
- 모임 관리
- 모임 조회
- 북마크 연결

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/마이페이지.png" width="500"/> | <img src="docs/gif/마이페이지_모바일버전.png" width="200"/> |

---

### ⚙️ 관리페이지

- 참여 신청자 조회
- 질문지 답변 확인
- 승인/거절 처리
- 알림 전송


| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/20430a45-0f98-46ed-bc14-93ce2206cedc" width="500"/> | <img src="https://github.com/user-attachments/assets/9570d478-8910-478e-a535-3ad9f5401e0d" width="200"/> |

---


### 💬 채팅

- Socket.io 기반 실시간 1:1 채팅
- 읽지 않은 메시지 수 표시
- 메시지 읽음 상태 추적
- 채팅방 나가기 기능

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img width="500" src="https://github.com/user-attachments/assets/3ae5c0a6-8572-45c5-8c29-39e220e97f3e" /> | <img width="200" src="https://github.com/user-attachments/assets/a60ce7ca-d37c-4f17-8afb-50d277c7dd08" /> |



---

### 🗺️ 모임지도

- 필터로 모임 필터링
- 지역별 모임 위치 표시 (카카오맵 API)
- 마커 클릭 시 모임 정보 오버레이

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/moa_map_desktop.gif" width="500"/> | <img src="https://github.com/user-attachments/assets/23334bf7-47d0-4156-85ab-c146c39d7a33" width="200"/> |

---

### 🔔 알림

- 모임 신청 알림
- 승인/거절 알림
- 알림 읽음 상태 관리

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img width="500" src="https://github.com/user-attachments/assets/63a9a455-6e60-4ccf-bcf4-85e0b4fe5ee7" /> | <img width="200" src="https://github.com/user-attachments/assets/d0d18642-5d92-4c66-8b3c-d6cf2b67e445" /> |



---

### 🤖 AI 추천

- 사용자 정보 입력 (나이, 성별, 선호도)
- OpenAI GPT-4o-mini를 통한 맞춤 카테고리 추천
- 추천 카테고리 기반 모임 필터링

| 데스크톱 | 모바일 |
| :---: | :---: |
| <img src="docs/gif/ai.gif" width="500"/> | <img src="docs/gif/ai_모바일버전.gif" width="200"/> |

---

## 🔄 워크플로우

<div align="center">
  <img src="docs/images/워크플로우.png" alt="워크플로우" width="600">
</div>

## 📌 스크럼/회의록

<div align="center">
<h3> 2026년 1월 </h3>

| 일  |                     월                     |                     화                     |                     수                     |                     목                     |                     금                     | 토  |
| :-: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :-: |
|     |                                            |                                            |                                            |                     1                      |                     2                      |  3  |
|  4  |                     5                      |                     6                      |                     7                      |                     8                      |                     9                      | 10  |
| 11  |                     12                     |                     13                     | [14](docs/dailyscrum/0114-데일리스크럼.md) | [15](docs/dailyscrum/0115-데일리스크럼.md) | [16](docs/dailyscrum/0116-데일리스크럼.md) | 17  |
| 18  | [19](docs/dailyscrum/0119-데일리스크럼.md) | [20](docs/dailyscrum/0120-데일리스크럼.md) | [21](docs/dailyscrum/0121-데일리스크럼.md) | [22](docs/dailyscrum/0122-데일리스크럼.md) | [23](docs/dailyscrum/0123-데일리스크럼.md) | 24  |
| 25  | [26](docs/dailyscrum/0126-데일리스크럼.md) | [27](docs/dailyscrum/0127-데일리스크럼.md) | [28](docs/dailyscrum/0128-데일리스크럼.md) | [29](docs/dailyscrum/0129-데일리스크럼.md) | [30](docs/dailyscrum/0130-데일리스크럼.md) | 31  |

</div>

<div align="center">
<h3> 2026년 2월 </h3>

| 일  |                    월                     |                     화                     |                     수                     |                     목                     | 금  | 토  |
| :-: | :---------------------------------------: | :----------------------------------------: | :----------------------------------------: | :----------------------------------------: | :-: | :-: |
|  1  | [2](docs/dailyscrum/0202-데일리스크럼.md) | [3](docs/dailyscrum/0203-데일리스크럼.md)  | [4](docs/dailyscrum/0204-데일리스크럼.md)  | [5](docs/dailyscrum/0205-데일리스크럼.md)  |  6  |  7  |
|  8  | [9](docs/dailyscrum/0209-데일리스크럼.md) | [10](docs/dailyscrum/0210-데일리스크럼.md) | [11](docs/dailyscrum/0211-데일리스크럼.md) | [12](docs/dailyscrum/0212-데일리스크럼.md) | 13  | 14  |
| 15  |                    16                     |                     17                     |                     18                     |                     19                     | 20  | 21  |
| 22  |                    23                     |                     24                     |                     25                     |                     26                     | 27  | 28  |

</div>

## 🐛 트러블슈팅

| 이름     | 문제점                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 해결 방법                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **민기** | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **현욱** | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **현주** | 북마크 클릭 시 여러 개가 동시에 선택되는 버그 발생. `git pull`을 받지 않아 최신 코드가 누락됨.                                                                                                                                                                                                                                                                                                                                                                                                             | `git pull`, `git merge`를 통해 최신 코드 동기화 후 해결                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **지안** | 1. **Git 브랜치 동기화 문제**: `develop` 브랜치에서 `git pull`이 정상적으로 되지 않는 문제 발생<br/>2. **CSS Module `:global` 사용 문제**: CSS Module에서 `:global`을 사용하면서 스타일이 전역으로 적용되어 다른 페이지에도 영향을 주는 문제 발생<br/>3. **로그인 상태 유지 문제**: 로그인 여부를 `useState`로만 판단해 로그인되지 않았을 경우 로그인 페이지로 강제 이동하도록 구현했는데, 새로고침 시 로그인 상태에서도 로그인 화면으로 이동하는 문제 발생. Hydration 이전 상태를 `false`로 인식했기 때문 | 1. **Git 동기화 해결**: rebase 사용 시 발생하는 히스토리 오염 문제를 팀원들에게 공유. 이후 `git pull`이 되지 않는 경우 `rebase` 대신 `merge` 전략을 사용하도록 협업 방식을 정리하여 develop 브랜치와의 버전을 안정적으로 맞춤<br/>2. **CSS 격리**: `:global` 사용을 최소화하고, 필요한 경우 더 구체적인 선택자를 사용하여 적용 범위를 제한. 컴포넌트 단위로 스타일이 격리되도록 구조 개선<br/>3. **Hydration 처리**: `useStore.ts`에 `setHasHydrated`를 추가하여 상태가 hydration된 이후에만 로그인 여부를 판단하도록 수정. 새로고침 시에도 로그인 상태가 정상적으로 유지되도록 개선 |

## 회고

<details>
  <summary>민기</summary>
  <ul>
    <li>좋았던 점: 카카오맵 API를 활용해 필터링·마커·커스텀 오버레이 기능을 직접 설계하고 구현하며 지도 페이지 전반의 완성도를 끌어올린 경험이 가장 뜻깊었습니다.</li>
    <li>아쉬웠던 점: 팀장으로서 일정 관리와 세부 소통에서 디테일을 놓쳐 팀 운영이 미흡했고, 지도 페이지의 UI 디자인 완성도를 더 높이지 못한 점이 아쉬움으로 남습니다.</li>
  </ul>
</details>
<details>
  <summary>현욱</summary>
  <ul>
    <li>좋았던 점: 수업을 통해서 배웠던 react와 next.js로 웹사이트를 제작해 봐서 좋았고 다양한 기능들을 구현할 수 있는 경험을 해서 좋았습니다.</li>
    <li>아쉬웠던 점: 팀원 간의 역량에 따라서 적절하게 업무를 나누지 못해서 아쉬웠고 잘하려는 욕심 때문에 진행이 늦어져서 일정 관리에 아쉬움을 느꼈습니다.</li>
  </ul>
</details>
<details>
  <summary>현주</summary>
  <ul><li> 좋았던 점: React와 next.js로 프로젝트를 만드는것은 처음이었는데 조원분들의 도움으로 프로젝트를 만들 수 있었고, 문제없이 순항한 것 같아 만족스럽습니다. </li>
  <li>아쉬웠던 점: 4개의 파트를 맡았었는데 저의 안일함으로 지연이 되서 부분은 다른 분들이 맡게 되어 아쉬웠습니다.</li>
  </ul>
</details>
<details>
  <summary>지안</summary>
  <ul><li>좋았던 점: 좋은 팀원들을 만나 많이 배울 수 있게 되어서 정말 좋았고, Next.js로 웹페이지를 만든 경험이 생겨서 만족스러웠습니다.</li>
  <li>아쉬웠던 점: 브랜치 관리에 대한 이해 부족으로 협업 과정에서 어려움을 겪었으며, 이를 통해 체계적인 Git 활용 능력의 중요성을 깨닫게 되었습니다. </li>
  </ul>
</details>


## 📁 프로젝트 폴더 구조

```
final-07-donghaeng/
├── 📁 actions/                    # Server Actions
│   ├── ai-recommend.ts            # AI 추천 (OpenAI GPT)
│   ├── bookmarks.ts               # 북마크 CRUD
│   ├── chat.ts                    # 채팅 메시지 전송
│   ├── file.ts                    # 파일 업로드 (Cloudinary)
│   ├── manage.ts                  # 신청자 승인/거절
│   ├── meetings.ts                # 모임 CRUD, 지원
│   ├── notification.ts            # 알림 생성/조회
│   └── user.ts                    # 로그인, 회원가입, 프로필 수정
│
├── 📁 app/                        # Next.js App Router
│   ├── 📁 (auth)/                 # 인증 그룹
│   │   ├── 📁 login/              # 로그인
│   │   └── 📁 signup/             # 회원가입
│   │
│   ├── 📁 (main)/                 # 메인 페이지 그룹
│   │   ├── page.tsx               # 홈 화면
│   │   ├── AiRecommendModal.tsx   # AI 추천 모달
│   │   ├── CategorySection.tsx    # 카테고리 섹션
│   │   └── SearchAiSection.tsx    # 검색 및 AI 섹션
│   │
│   ├── 📁 (view)/                 # 뷰 전용 그룹
│   │   ├── 📁 bookmarks/          # 북마크 페이지
│   │   └── 📁 history/            # 지원한 모임 조회
│   │
│   ├── 📁 chat/                   # 채팅 기능
│   │   ├── page.tsx               # 채팅 리스트
│   │   └── 📁 [roomId]/           # 채팅 상세
│   │
│   ├── 📁 components/             # 공통 컴포넌트
│   │   ├── Header.tsx             # 헤더
│   │   ├── Footer.tsx             # 푸터
│   │   ├── Filter.tsx             # 필터
│   │   ├── MeetingCard.tsx        # 모임 카드
│   │   ├── BookmarkButton.tsx     # 북마크 버튼
│   │   ├── MobileSidebar.tsx      # 모바일 사이드바
│   │   └── DefaultLayout.tsx      # 기본 레이아웃
│   │
│   ├── 📁 manage/                 # 모임 관리
│   │   ├── page.tsx               # 모임 관리 리스트
│   │   └── 📁 [id]/               # 참여자 관리
│   │
│   ├── 📁 map/                    # 지도 페이지
│   │
│   ├── 📁 meetings/               # 모임 리스트
│   │   ├── page.tsx               # 모임 목록
│   │   ├── 📁 add/                # 모임 등록
│   │   └── 📁 [id]/               # 모임 상세
│   │       ├── page.tsx           # 상세 페이지
│   │       ├── 📁 apply/          # 모임 신청
│   │       └── 📁 edit/           # 모임 수정
│   │
│   ├── 📁 mypage/                 # 마이페이지
│   │   ├── page.tsx               # 프로필 페이지
│   │   └── 📁 modify/[id]/        # 프로필 수정
│   │
│   ├── 📁 notifications/          # 알림 페이지
│   │
│   ├── 📁 faq/                    # FAQ
│   ├── 📁 privacy/                # 개인정보처리방침
│   ├── 📁 terms/                  # 이용약관
│   │
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── globals.css                # 전역 스타일
│   ├── error.tsx                  # 에러 바운더리
│   └── not-found.tsx              # 404 페이지
│
├── 📁 hooks/                      # 커스텀 훅
│   ├── useChat.ts                 # 채팅 기능 훅
│   ├── useFilter.ts               # 필터 상태 훅
│   └── useNoti.ts                 # 알림 훅
│
├── 📁 lib/                        # API 함수
│   ├── meetings.ts                # 모임 조회 API
│   ├── bookmarks.ts               # 북마크 API
│   ├── chat.ts                    # 채팅방 API
│   ├── user.ts                    # 사용자 API
│   ├── manage.ts                  # 관리 API
│   ├── notification.ts            # 알림 API
│   └── common.ts                  # 공통 함수
│
├── 📁 types/                      # TypeScript 타입 정의
│   ├── api.ts                     # API 응답 타입
│   ├── meetings.ts                # 모임 인터페이스
│   ├── user.ts                    # 사용자 타입
│   ├── chat.ts                    # 채팅 타입
│   ├── notification.ts            # 알림 타입
│   ├── bookmarks.ts               # 북마크 타입
│   ├── manage.ts                  # 관리 타입
│   └── apply.ts                   # 신청 타입
│
├── 📁 utils/                      # 유틸리티
│   └── apiWithAuth.ts             # 인증된 API 호출 (자동 토큰 갱신)
│
├── 📁 zustand/                    # 상태 관리 스토어
│   ├── userStore.ts               # 사용자/인증 상태
│   ├── chatStore.ts               # 채팅/Socket.io 상태
│   ├── bookmarkStore.ts           # 북마크 상태
│   ├── meetingStore.ts            # 모임 상태
│   └── notificationStore.ts       # 알림 상태
│
├── 📁 docs/                       # 문서/이미지
├── 📁 public/                     # 정적 파일
│
├── .env                           # 환경 변수
├── next.config.ts                 # Next.js 설정
├── tsconfig.json                  # TypeScript 설정
├── eslint.config.mjs              # ESLint 설정
└── package.json                   # 의존성
```

---

<div align="center">

Made with ❤️ by Team Moa

</div>
