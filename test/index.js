var reraf = require('../cjs')();
var self = {};
var args = [1, 2];
reraf(function () {
  console.assert(this === self, 'unexpected context');
  console.assert(args.join(',') === args.join.call(arguments, ','), 'unexpected arguments');
  delete require.cache[require.resolve('../cjs')];
  global.cancelAnimationFrame = clearTimeout;
  global.requestAnimationFrame = setTimeout;
  global.clearTimeout = null;
  var reraf = require('../cjs')();
  reraf(function () {
    console.assert(this === self, 'unexpected context');
    console.assert('' === args.join.call(arguments, ','), 'unexpected arguments');
    var reraf = require('../cjs')(1);
    var calls = 0;
    reraf(function () {
      console.assert(false, 'this should never happen');
    });
    reraf(function () {
      console.assert(calls === 0, 'unexpected delay');
      reraf(function () {
        console.assert(false, 'this should not have happened');
      })();
      console.log('OK');
    });
    calls++;
  }, self);
}, self, args);
