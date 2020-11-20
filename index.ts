/* eslint-disable indent */
import fs from 'fs';
import arg from 'arg';
import axios from 'axios';

const isCLI = require.main === module;

interface BotRegistration {
  token: string;
  chatId: string;
}

const DefaultBotRegistration: BotRegistration = {
  token: '',
  chatId: '',
};

class Telenoty {
  private static CONFIG_PATH = process.env.HOME + '/.telenoty';
  private _bot: BotRegistration = null;
  private _debug = false;

  constructor(debug = false) {
    this._debug = debug;
  }

  loadConfig() {
    return new Promise((resolve) => {
      fs.readFile(Telenoty.CONFIG_PATH, 'utf-8', (err, data) => {
        try {
          err ? this.createConfig() : (this._bot = JSON.parse(data)) && resolve();
        } catch (e) {
          console.log(this._debug);
          this._debug && console.error(e);
        }
      });
    });
  }

  private createConfig(botRegistration: BotRegistration = DefaultBotRegistration) {
    fs.writeFileSync(Telenoty.CONFIG_PATH, JSON.stringify(botRegistration, null, 2));
    this._bot = botRegistration;
  }

  registration(token, chatId) {
    if (token && chatId) {
      this.createConfig({ token, chatId });
    } else {
      throw new Error('token or chat id not provided');
    }
  }

  async sendMessage(message: string) {
    const { token, chatId } = this._bot;
    if (token && chatId) {
      await axios
        .get(`https://api.telegram.org/bot${token}/sendmessage?chat_id=${chatId}&text=${message}`)
        .catch((e) => {
          throw e.response.status ? new Error('bot or chat not found') : e;
        });
    } else {
      throw new Error('token or chat id not provided');
    }
  }
}

// is CLI?
if (isCLI) {
  (async () => {
    const args = arg({
      '--regist': Boolean,
      '--message': String,
      '--debug': Boolean,
      '--help': Boolean,
      // Simplify flags
      '-r': '--regist',
      '-m': '--message',
      '-h': '--help',
    });

    const instance = new Telenoty(args['--debug']);
    await instance.loadConfig();

    // Regist
    if (args['--regist']) {
      const [token, chatId] = [...args._, undefined, undefined];
      instance.registration(token, chatId);
      return 'bot registered';
    } else if (args['--message'] !== undefined) {
      // Send message
      const message = args['--message'];
      if (message) {
        await instance.sendMessage(message);
        return 'ok';
      } else {
        throw new Error('empty message not allowed');
      }
    } else {
      return [
        '',
        '',
        'Usage',
        '  telenoty [options]',
        '',
        'Options',
        '  -r, --regist {token} {chatId}    bot registration (create or override)',
        '  -m, --message {message}          message to send',
        '  --debug                          enable debug mode',
      ].join('\n');
    }
  })()
    .then((res) => void console.log('telenoty:', res) || process.exit(0))
    .catch((e) => void console.error('telenoty:', e.message) || process.exit(1));
}
