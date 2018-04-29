const chalk = require("chalk");

class Logger {
	constructor({isVerbose = false, onlyTTY = false} = {}) {
		this._onlyTTY = !!onlyTTY;
		this._isTTY = !!process.stdout.isTTY;
		this._isVerbose = !!isVerbose;
	}

	info(...msgs) {
		if (!this._isVerbose) {
			return;
		}
		this._print(chalk.bold.blue("INFO: "), ...msgs);
	}
	error(...errors) {
		this._print(chalk.bold.red("ERROR: "), ...errors);
	}

	get onlyTTY() {
		return new Proxy(this, {
				get: (obj, prop) => {
					return prop === '_onlyTTY' ? true : obj[prop];
				},
		});
  }

	set isVerbose(flag) {
		this._isVerbose = !!flag;
	}

	_print(...msgs) {
		if (this._onlyTTY && !this._isTTY) {
			return;
		}
		process.stderr.write(msgs.join(" ") + "\n");
	}
}

module.exports = new Logger();
