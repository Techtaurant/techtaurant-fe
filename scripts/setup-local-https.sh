#!/bin/sh

set -eu

LOCAL_HOST="local.techtaurant.com"
HOSTS_FILE="/etc/hosts"
CERT_FILE="local.techtaurant.com.pem"
KEY_FILE="local.techtaurant.com-key.pem"

if ! command -v mkcert >/dev/null 2>&1; then
  echo "mkcert가 설치되어 있지 않습니다. 먼저 mkcert를 설치해주세요."
  exit 1
fi

echo "> mkcert 로컬 CA를 설치합니다"
mkcert -install

if grep -Eq "^[^#]*[[:space:]]${LOCAL_HOST}([[:space:]]|\$)" "$HOSTS_FILE"; then
  echo "> $HOSTS_FILE 에 $LOCAL_HOST 가 이미 등록되어 있습니다"
else
  echo "> $HOSTS_FILE 에 $LOCAL_HOST 를 추가합니다"
  echo "127.0.0.1 $LOCAL_HOST" | sudo tee -a "$HOSTS_FILE" >/dev/null
fi

echo "> HTTPS 인증서를 생성합니다"
mkcert -cert-file "$CERT_FILE" -key-file "$KEY_FILE" "$LOCAL_HOST"

echo ""
echo "HTTPS 로컬 설정이 완료되었습니다."
echo "인증서: $CERT_FILE"
echo "개인키: $KEY_FILE"
echo "실행: pnpm dev:https"
