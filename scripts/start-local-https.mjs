import fs from 'node:fs';
import { createServer } from 'node:https';
import { parse } from 'node:url';

import next from 'next';

const hostname = 'local.techtaurant.com';
const port = 3010;
const dev = process.env.NODE_ENV !== 'production';
const certFile = 'local.techtaurant.com.pem';
const keyFile = 'local.techtaurant.com-key.pem';

if (!fs.existsSync(certFile) || !fs.existsSync(keyFile)) {
  throw new Error('HTTPS 인증서가 없습니다. 먼저 `pnpm setup:https`를 실행해주세요.');
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

createServer(
  {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile),
  },
  (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  },
).listen(port, hostname, () => {
  console.log(`> Ready on https://${hostname}:${port}`);
});
