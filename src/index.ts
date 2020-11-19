import fs from 'fs';
import arg from 'arg';

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
  private _debug = false;
  private _bot: BotRegistration;

  private createConfig() {
    fs.writeFileSync(Telenoty.CONFIG_PATH, JSON.stringify(DefaultBotRegistration, null, 2));
    this._bot = DefaultBotRegistration;
  }

  async init() {
    return new Promise((resolve) => {
      fs.readFile(Telenoty.CONFIG_PATH, 'utf-8', (err, data) => {
        try {
          err ? this.createConfig() : (this._bot = JSON.parse(data)) && resolve();
        } catch (e) {
          this._debug && console.log(e);
        }
      });
    });
  }
}

const args = arg({
  '--regist': Boolean,
  '--message': String,
  // Simplify flags
  '-r': Boolean,
  '-m': String,
});

(async () => {
  const instance = new Telenoty();
  await instance.init();

  if (args['--regist']) {
    // TODO: Regist telegram bot
  } else if (args['--message']) {
    // TODO: Request message to bot
  }
})();
