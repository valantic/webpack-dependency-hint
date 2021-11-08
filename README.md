# webpack-dependency-hint
A Webpack plugin that delivers a console output when a dependency check is recommended.
The amount of days till the message should appear can be configured per default it's set to 90 days.
To handle the date format it uses https://day.js.org/. and the Console output gets styles by https://www.npmjs.com/package/chalk.

![image](https://user-images.githubusercontent.com/12095490/140756894-ae4ed940-242d-4624-b39d-dc883ab31f43.png)

## Documentation

### Installation
```
npm i webpack-dependency-hint --save-dev
```

### Usage
```js
// webpack.config.js
const DependencyHint = require('webpack-dependency-hint');

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

