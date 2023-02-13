# Wewo back-end by Node.js

## Installation

Chạy lệnh npm để tải các files môi trường và thư viện bên ngoài [npm](https://www.npmjs.com/) to install npm.

```bash
 npm install
```
Sau khi tải xong: 
```bash
{
  "name": "dang-khoa-microservices-web",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "dang-khoa-microservices-web",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "bcrypt": "^5.1.0",
        "body-parser": "^1.20.1",
        "color": "^4.2.3",
        "cors": "^2.8.5",
        "dotenv": "^16.0.2",
        "express": "^4.18.1",
        "express-async-handler": "^1.2.0",
        "express-session": "^1.17.3",
        "geoip-lite": "^1.4.6",
        "google-auth-library": "^8.7.0",
        "jsonwebtoken": "^8.5.1",
        "mongodb": "^4.9.1",
        ...
```

## Khởi động chương trình
- Chạy trên url http://localhost:4003
```bash
 npm run dev
```
- Hoặc gõ script `credentials` để chạy bằng pm2: 
```bash
 npm run credentials
```