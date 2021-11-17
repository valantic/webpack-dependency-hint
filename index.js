const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const chalk = require('chalk');

const warning = chalk.bold.yellow;
const warningItalic = chalk.bold.yellow.italic;
const warningHeader = chalk.bold.bgYellowBright.black;

dayjs.extend(customParseFormat);

class DependencyHint {
  static defaultOptions = {
    lastUpdate: '',
    daysTillWarning: 90,
    inputFormat: 'DD.MM.YYYY',
    outputFormat: 'DD.MM.YYYY',
    warningText: 'Please consider your project manager to arrange a dependency update.',
    compilerHook: 'afterEnvironment'
  };

  // Any options should be passed in the constructor of your plugin,
  // (this is a public API of your plugin).
  constructor(options = {}) {
    // Applying user-specified options over the default options
    // and making merged options further available to the plugin methods.
    // You should probably validate all the options here as well.
    this.options = { ...DependencyHint.defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.hooks[compilerHook].tap(
        'Dependency Update hint plugin',
        (
            stats /* stats is passed as an argument when done hook is tapped.  */
        ) => {
          const {
            daysTillWarning,
            lastUpdate,
            inputFormat,
            outputFormat,
            warningText,
          } = this.options || {};
          const lastUpdateDate = dayjs(lastUpdate, inputFormat);
          const timeSinceLastUpdate = lastUpdateDate.diff(dayjs(), 'day') * -1
          const isExpired = timeSinceLastUpdate >= daysTillWarning;

          if (lastUpdate && lastUpdateDate.isValid() && isExpired) {
            console.log('\n\n');
            console.log(warningHeader(`${String.fromCodePoint(0x1F6A8)} Dependency Check:`));
            console.log('  ' + warning(`The last dependency update is already ${chalk.underline(`${timeSinceLastUpdate} days`)} old.`));
            console.log('  ' + warning(warningText));
            console.log('  ' + warningItalic(`Last check: ${lastUpdateDate.format(outputFormat)}`));
            console.log('\n\n');
          }
        }
    );
  }
}

module.exports = DependencyHint;
