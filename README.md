# telenoty

📢 Simple and Easy to emit notification via Telegram

[![npm version](https://badge.fury.io/js/telenoty.svg)](https://www.npmjs.com/package/telenoty)
![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

## Installation

```bash
npm install -g telenoty
```

## Usage

- Required - [Telegram Bot](#craete-bot)
  - Create your Telegram bot
  - Get access token
  - Get chat id
  - Regist and enjoy!

```bash
# Regist bot information (save on ~/.telenoty)
# --regist, -r
telenoty --regist {BOT_TOKEN} {CHAT_ID}

# Send message
# --message, -m
telenoty --message {MESSAGE}
```

<img src="docs/usage_1.jpg">
<img src="docs/usage_2.jpg">
<img src="docs/usage_3.jpg">

- More usage
  - with [Python](#with-python)

## Create bot

1. Create Telegram bot

   - [@BotFather](https://telegram.me/botfather)

    <img src="docs/bot_1.jpg">

2. Get access token

   - Send bot name and ID
   - Copy access token (for registration)
   - Go to chat room

    <img src="docs/bot_2.jpg">

3. Get chat id

   - Send any message

    <img src="docs/bot_3.jpg">

   - and go to [https://api.telegram.org/bot{ACCESS_TOKEN}/getUpdates](https://api.telegram.org/botYOUR_TOKEN/getUpdates)

    <img src="docs/bot_4.jpg">

   - Copy chat id

4. Regist and enjoy!
   - [Go](#usage)

## with Python

```python
import subprocess

def send_message(message):
    return subprocess.call(['telenoty', '--message', message], \
        stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)

result = send_message('test')
if result == 0:
  print('success')
else:
  print('fail')
```

## Devlopment

```bash
# Install dependencies
npm i

# Build for production
npm run build

# Test
node dist/telenoty.js
```

## License

[MIT](LICENSE)
