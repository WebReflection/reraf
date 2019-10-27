# reraf

A super simple way to reschedule animation frames, compatible with every browser and Node.js through a `setTimeout` and `clearTimeout` fallback.

```js
import reraf from 'reraf';
// or const reraf = require('reraf');
// or <script src="//unpkg.com/reraf">

const reschedule = reraf(/* optional integer limit */);

reschedule(console.log, null, ['first']);
reschedule(console.log, null, ['second']);
// will log "second", but never "first"
```
