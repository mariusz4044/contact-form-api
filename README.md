﻿# Contact Form with Discord Webhook integration

## 1. Create `.env` file
Create `.env` file and variables:

```dotenv
PORT= //Express start sever port e.g "3000"
EXPRESS_SESSION_SECRET= //Express session private key e.g "test12"
DISCORD_WEBHOOK= //Paste discord webhook url
```

## 2. Build project
To build project use `npm run build`
Or just build and start `npm run start`

## 3. Endpoints 

### Get captcha image
```ts
 GET
 /captcha
 return '<img src="base64" alt="captcha-image' />'
```
#### Send form 
```ts
 POST
 /form 
 Body: {email: string, message: string, captcha: string}
 return 'Bad Captcha / Message sent successfully'
```
