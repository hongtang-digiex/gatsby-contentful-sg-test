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

## URL các server của Wewo
- Wewo store: [https://wewo-store.vercel.app/](https://wewo-store.vercel.app/)
- Wewo : [https://wewo-credentials.vercel.app/](https://wewo-credentials.vercel.app/)

## Collections mẫu để gọi API
`Chú ý: Các collections này được export từ postman, cách sử dụng chỉ cần import đoạn mã bên dưới vào postman để tạo collections là được`
- Credentials:
```bash
{
	"info": {
		"_postman_id": "2ce8f630-ebfc-4b22-b702-374d30d5025a",
		"name": "auth-wewo-api Copy",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "22818112"
	},
	"item": [
		{
			"name": "sign-up",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"user_name\": \"yeah654\", \r\n    \"user_password\": \"Pinkguy@093\", \r\n    \"confirm_user_password\": \"Pinkguy@093\", \r\n    \"phone_number\": \"012454436364\", \r\n    \"email_address\": \"thomastang288@gmail.com\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{local}}/api/wewo/auth/sign-up",
					"host": [
						"{{local}}"
					],
					"path": [
						"api",
						"wewo",
						"auth",
						"sign-up"
					]
				}
			},
			"response": []
		},
		{
			"name": "sign-in",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"user_name\": \"uuu\", \r\n    \"user_password\": \"Pinkguy@093\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{local}}/auth/wewo/sign-in",
					"host": [
						"{{local}}"
					],
					"path": [
						"auth",
						"wewo",
						"sign-in"
					]
				}
			},
			"response": []
		},
		{
			"name": "verify-account",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \"user_id\": \"63a2cf09dd176d2a2418f5b2\",\"verify_otp\": 323682 }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{local}}/auth/verify",
					"host": [
						"{{local}}"
					],
					"path": [
						"auth",
						"verify"
					]
				}
			},
			"response": []
		},
		{
			"name": "get-lat-long",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://wewo-credentials.vercel.app/user/get-lat-long?lat=10.45435&long=106.4364",
					"protocol": "https",
					"host": [
						"wewo-credentials",
						"vercel",
						"app"
					],
					"path": [
						"user",
						"get-lat-long"
					],
					"query": [
						{
							"key": "lat",
							"value": "10.45435"
						},
						{
							"key": "long",
							"value": "106.4364"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "reset-pass-request",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "email_address",
							"value": "hongtang240@gmail.com",
							"type": "text"
						},
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5OTk2MDdhZThiZmQyNzgzNTlkNGMwIiwidXNlcl9uYW1lIjoiaG9uZ3RhIiwicGhvbmVfbnVtYmVyIjoiMDM4NTM1NzQ2NyIsImVtYWlsX2FkZHJlc3MiOiJ0aG9tYXN0YW5nMjMwNEBnbWFpbC5jb20iLCJyb2xlIjoiU2VsbGVyIn0sImlhdCI6MTY3MTUzMjU1MSwiZXhwIjoxNjc0MTI0NTUxfQ.95NZJ0MChZ2xjvS_lSzHm5cf-GmwOJF8mmhVjeqGpVw",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "{{local}}/api/wewo/auth/request-mail",
					"host": [
						"{{local}}"
					],
					"path": [
						"api",
						"wewo",
						"auth",
						"request-mail"
					]
				}
			},
			"response": []
		},
		{
			"name": "reset-pass",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n   \"id\": \"63b2b910a10b9fabd932030c\", \"reset_password\": \"Pinkguy@093\", \"confirm_reset_pw\" : \"Pinkguy@093\" \r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{local}}/api/wewo/auth/reset",
					"host": [
						"{{local}}"
					],
					"path": [
						"api",
						"wewo",
						"auth",
						"reset"
					]
				}
			},
			"response": []
		},
		{
			"name": "refresh-otp",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "email_address",
							"value": "thomastang23@gmail.com",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "{{local}}/api/wewo/auth/refresh-otp",
					"host": [
						"{{local}}"
					],
					"path": [
						"api",
						"wewo",
						"auth",
						"refresh-otp"
					]
				}
			},
			"response": []
		}
	]
}
```

- Store:
```bash
{
	"info": {
		"_postman_id": "af49183e-12d3-4171-8b58-95c5c07610ff",
		"name": "store-wewo-api",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "22818112"
	},
	"item": [
		{
			"name": "add-store",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"token\":  \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5YTdiYTEwNzI1MjY2ZjRkMjE3ZThiIiwidXNlcl9uYW1lIjoiaG9uZ3RhbmciLCJwaG9uZV9udW1iZXIiOiIwMzg1MzU3NDY3IiwiZW1haWxfYWRkcmVzcyI6InRob21hc3RhbmcyMzA0QGdtYWlsLmNvbSIsInJvbGUiOiJTZWxsZXIifSwiaWF0IjoxNjcxMjExNjcxLCJleHAiOjE2NzM4MDM2NzF9.7_QghjPk7CxDurVlcArjtWOJRJ5EdRACF0_ZrH1-LY0\", \r\n    \"type\": \"Furnitures\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{server_store}}/store/add-store",
					"host": [
						"{{server_store}}"
					],
					"path": [
						"store",
						"add-store"
					]
				}
			},
			"response": []
		},
		{
			"name": "get-store",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{server_store}}/api/seller/get-store-by-sellerid?seller_id=639a7ba10725266f4d217e8b",
					"host": [
						"{{server_store}}"
					],
					"path": [
						"api",
						"seller",
						"get-store-by-sellerid"
					],
					"query": [
						{
							"key": "seller_id",
							"value": "639a7ba10725266f4d217e8b"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "update-store",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n       \"token\":  \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5YTdiYTEwNzI1MjY2ZjRkMjE3ZThiIiwidXNlcl9uYW1lIjoiaG9uZ3RhbmciLCJwaG9uZV9udW1iZXIiOiIwMzg1MzU3NDY3IiwiZW1haWxfYWRkcmVzcyI6InRob21hc3RhbmcyMzA0QGdtYWlsLmNvbSIsInJvbGUiOiJTZWxsZXIifSwiaWF0IjoxNjcxMjExNjcxLCJleHAiOjE2NzM4MDM2NzF9.7_QghjPk7CxDurVlcArjtWOJRJ5EdRACF0_ZrH1-LY0\", \r\n    \"type\": \"Chess\",\r\n    \"store_id\": \"639c91e97907199b64a18572\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{server_store}}/store/update-store",
					"host": [
						"{{server_store}}"
					],
					"path": [
						"store",
						"update-store"
					]
				}
			},
			"response": []
		},
		{
			"name": "remove-store",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{ \r\n    \"token\":  \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjM5YTdiYTEwNzI1MjY2ZjRkMjE3ZThiIiwidXNlcl9uYW1lIjoiaG9uZ3RhbmciLCJwaG9uZV9udW1iZXIiOiIwMzg1MzU3NDY3IiwiZW1haWxfYWRkcmVzcyI6InRob21hc3RhbmcyMzA0QGdtYWlsLmNvbSIsInJvbGUiOiJTZWxsZXIifSwiaWF0IjoxNjcxMjExNjcxLCJleHAiOjE2NzM4MDM2NzF9.7_QghjPk7CxDurVlcArjtWOJRJ5EdRACF0_ZrH1-LY0\", \r\n    \"store_id\": \"639c91e97907199b64a18572\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{server_store}}/store/remove-store",
					"host": [
						"{{server_store}}"
					],
					"path": [
						"store",
						"remove-store"
					]
				}
			},
			"response": []
		}
	]
}
```
file environments...
```sh
// .env file 
SECRET_KEY=pinkguy093
GOOGLE_MAILER_CLIENT_ID=1056346298973-8ga2ec82s92qil7k8r3qqh0j91asq1mt.apps.googleusercontent.com
GOOGLE_MAILER_CLIENT_SECRET=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
GOOGLE_MAILER_REFRESH_TOKEN=1//048gNxdVpv7HLCgYIARAAGAQSNwF-L9IrtVMDE5L6HroU70szktr71fL1RsT6t-iI3hISjQX2hnZPTNZfBY8tjxmfxo3wqxCRqf0
ADMIN_EMAIL_ADDRESS=hongtang240@gmail.com
DB_URL=mongodb+srv://hong:pH3OoSvyR4d18BHk@wewo.0yalwh7.mongodb.net/?retryWrites=true&w=majority
```
