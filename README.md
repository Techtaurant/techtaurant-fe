## Techtaurant Frontend

## 개발 환경 시작

로컬 HTTPS 개발 환경을 기준으로 실행합니다.

접속 주소:

- `https://local.techtaurant.com:3010`

사전 준비:

- `mkcert`가 설치되어 있어야 합니다.

실행 순서:

```bash
pnpm install
pnpm setup:https
pnpm dev:https
```

`pnpm setup:https`는 아래 작업을 수행합니다.

- `mkcert -install`
- `/etc/hosts`에 `local.techtaurant.com` 등록
- 로컬 인증서 생성
