'use strict';
var cAF = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
var rAF = cAF === clearTimeout ? setTimeout : requestAnimationFrame;
function reraf(limit) {
  var force = limit || Infinity;
  var timer = 0;
  return function (callback, self, args) {
    cAF(timer);
    if (--force < 0)
      invoke(force = limit);
    else
      timer = rAF(invoke);
    function invoke() {
      timer = 0;
      callback.apply(self, args || []);
    }
  };
}
module.exports = reraf;
