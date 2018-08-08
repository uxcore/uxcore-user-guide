## uxcore-user-guide

React user guide

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependency Status][dep-image]][dep-url]
[![devDependency Status][devdep-image]][devdep-url]
[![NPM downloads][downloads-image]][npm-url]

[![Sauce Test Status][sauce-image]][sauce-url]

[npm-image]: http://img.shields.io/npm/v/uxcore-aito-user-guide.svg?style=flat-square
[npm-url]: http://npmjs.org/package/uxcore-aito-user-guide
[travis-image]: https://img.shields.io/travis/uxcore/uxcore-aito-user-guide.svg?style=flat-square
[travis-url]: https://travis-ci.org/uxcore/uxcore-aito-user-guide
[coveralls-image]: https://img.shields.io/coveralls/uxcore/uxcore-aito-user-guide.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/uxcore/uxcore-aito-user-guide?branch=master
[dep-image]: http://img.shields.io/david/uxcore/uxcore-aito-user-guide.svg?style=flat-square
[dep-url]: https://david-dm.org/uxcore/uxcore-aito-user-guide
[devdep-image]: http://img.shields.io/david/dev/uxcore/uxcore-aito-user-guide.svg?style=flat-square
[devdep-url]: https://david-dm.org/uxcore/uxcore-aito-user-guide#info=devDependencies
[downloads-image]: https://img.shields.io/npm/dm/uxcore-aito-user-guide.svg
[sauce-image]: https://saucelabs.com/browser-matrix/uxcore-aito-user-guide.svg
[sauce-url]: https://saucelabs.com/u/uxcore-aito-user-guide


### Development

```sh
git clone https://github.com/uxcore/uxcore-aito-user-guide
cd uxcore-aito-user-guide
npm install
npm run server
```

if you'd like to save your install time，you can use uxcore-tools globally.

```sh
npm install uxcore-tools -g
git clone https://github.com/uxcore/uxcore-aito-user-guide
cd uxcore-aito-user-guide
npm install
npm run dep
npm run start
```

### Test Case

```sh
npm run test
```

### Coverage

```sh
npm run coverage
```

## Demo

http://uxcore.alibaba.net/components/uxcore-aito-user-guide?type=others

## Contribute

Yes please! See the [CONTRIBUTING](https://github.com/uxcore/uxcore/blob/master/CONTRIBUTING.md) for details.

## 使用方法

一个产品或者页面中可能有多个引导，需要给每个引导做一个key
```javascript
const UserGuide = require('uxcore-user-guide').getWithKey('guide-key', {
  // config here
  // prefixCls,
  // className
});
```
然后给这个引导添加步骤，每个步骤可以有4种选择
* 使用React HOC

```javascript
const Step1 = UserGuide.addUserGuide({
  dom: 'button',
  step: 1,
  hint: '我是第一步提示',
  type: 'ReactComponent',
});
```
* 使用DOM

```javascript
const Step1 = UserGuide.addUserGuide({
  dom: document.getElementById('app'),
  step: 2,
  hint: '我是第二步提示',
  type: 'HTMLElement',
});
```
* 使用一个函数返回DOM

```javascript
const Step1 = UserGuide.addUserGuide({
  getDom() { return document.getElementById('app'); },
  step: 3,
  hint: '我是第三步提示',
  type: 'HTMLElementMaker',
});
```
* 使用图片

```javascript
UserGuide.addUserGuide({
  step: 4,
  hint: '我是第四步的提示，我也没有对应的DOM',
  type: 'Image',
  top: 1800,
  left: 1000,
  image: 'https://img.alicdn.com/tfs/TB1TRNAllfH8KJjy1XbXXbLdXXa-240-240.png',
  imageHeight: 120,
  imageWidth: 120,
});
```

需要开始引导时，需要

```javascript
UserGuide.start('guide-key');
```
