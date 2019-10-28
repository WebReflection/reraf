'use strict';
var cAF = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
var rAF = cAF === clearTimeout ? setTimeout : requestAnimationFrame;
function reraf(limit) {
  var force = limit || Infinity;
  var timer = 0;
  var stop = function () { cAF(timer); };
  return function (callback, self, args) {
    cAF(timer);
    if (--force < 0)
      invoke();
    else
      timer = rAF(invoke);
    return stop;
    function invoke() {
      force = limit || Infinity;
      timer = 0;
      callback.apply(self, args || []);
    }
  };
}
module.exports = reraf;
