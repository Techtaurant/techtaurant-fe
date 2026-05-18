## Techtaurant Frontend

### 환경 변수

아래 환경 변수가 필요합니다.

```bash
NEXT_PUBLIC_API_BASE_URL = <https://백엔드도메인>
NEXT_PUBLIC_ENV = local | development | production
```

### 개발 환경 시작

로컬 HTTPS 개발 환경 기준

로컬 접속 주소:

- `https://local.techtaurant.com:3010`

사전 준비:

- `mkcert`가 설치되어 있어야 합니다.

실행 순서:

```bash
pnpm install # 패키지 설치
pnpm api:generate # API codegen
pnpm setup:https # mkcert로 local.techtaurant.com 인증서 등록
pnpm dev:https # https://local.techtaurant.com:3010 개발 서버 실행
```
