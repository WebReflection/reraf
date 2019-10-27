# reraf

[![Build Status](https://travis-ci.com/WebReflection/reraf.svg?branch=master)](https://travis-ci.com/WebReflection/reraf) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/reraf/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/reraf?branch=master)

A super light and simple way to reschedule animation frames, compatible with every browser and Node.js through a `setTimeout` and `clearTimeout` fallback.

```js
import reraf from 'reraf';
// or const reraf = require('reraf');
// or <script src="//unpkg.com/reraf">

const reschedule = reraf(/* optional integer limit */);

reschedule(console.log, null, ['first']);
reschedule(console.log, null, ['second']);
// will log "second", but never "first"
```
