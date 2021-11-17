# webpack-dependency-hint
A Webpack plugin that delivers a console output when a dependency check is recommended.
The amount of days till the message should appear can be configured per default it's set to 90 days.
To handle the date format it uses https://day.js.org/. and the Console output gets styles by https://www.npmjs.com/package/chalk.

![image](https://user-images.githubusercontent.com/12095490/140756894-ae4ed940-242d-4624-b39d-dc883ab31f43.png)

## Documentation

### Installation
```
npm i @valantic/webpack-dependency-hint --save-dev
```

### Usage
```js
// webpack.config.js
const DependencyHint = require('@valantic/webpack-dependency-hint');

module.exports = {
  // ... configuration settings here ...
  plugins: [
    new DependencyHint({
      lastUpdate: '01.01.2020',
    })
  ],
};
```

### Options
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`lastUpdate`**|`{String}`|`""`|The date of the last update or check.|
|**`daysTillWarning`**|`{Number}`|`90`|The amount of days till the warning should appear.|
|**`inputFormat`**|`{String}`|`"DD.MM.YYYY"`|The input date format.|
|**`outputFormat`**|`{String}`|`"DD.MM.YYYY"`|The output date format.|
|**`warningText`**|`{String}`|`"Please consider your project manager to arrange a dependency update."`|The additional text that appears in the console.|
|**`compilerHook`**|`{String}`|`"afterEnvironment"`|The webpack compiler hook (see https://webpack.js.org/api/compiler-hooks/#hooks)|

### Hints
In case you don't want to store the date manually in the webpack config you can add it to the package.json and import
it to the webpack config.

```json
// package.json
{
  "name": "your-project",
  "version": "1.0.0",
  "description": "Your custom project",
  "lastDependencyUpdate": "01.01.2021",
  ...
}
```

```js
// webpack.config.js
const DependencyHint = require('@valantic/webpack-dependency-hint');
const pkg = require('./package.json');

module.exports = {
  // ... configuration settings here ...
  plugins: [
    new DependencyHint({
      lastUpdate: pkg.lastDependencyUpdate,
    })
  ],
};
```
