import fs from 'fs';
import arg from 'arg';
import axios from 'axios';

const isCli = require.main === module;

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

  constructor(debug: boolean = false) {
    this._debug = debug;
  }

  private createConfig() {
    fs.writeFileSync(Telenoty.CONFIG_PATH, JSON.stringify(DefaultBotRegistration, null, 2));
    this._bot = DefaultBotRegistration;
  }

  async loadConfig() {
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

  setBot(token: string, chatId: string) {
    this._bot = { token, chatId };
    return this;
  }

  async sendMessage(message: string) {
    const { token, chatId } = this._bot;
    if (token && chatId) {
      axios.get(
        `https://api.telegram.org/bot${token}/sendmessage?chat_id=${chatId}&text=${message}`,
      );
    } else {
      throw new Error('token or chat id not provided');
    }
  }
}

export { Telenoty };

// is CLI?
if (isCli) {
  try {
    const args = arg({
      '--regist': Boolean,
      '--message': String,
      '--debug': Boolean,
      // Simplify flags
      '-r': Boolean,
      '-m': String,
    });

    (async () => {
      const instance = new Telenoty(args['--debug']);
      await instance.loadConfig();

      if (args['--regist']) {
        // TODO: Regist telegram bot
      } else if (args['--message']) {
        // TODO: Request message to bot
      }
    })();
  } catch (e) {
    if (e.code === 'ARG_UNKNOWN_OPTION') {
      console.error('telenoty: unknown option');
    } else {
      console.error('');
    }
  }
}
