'use strict';
var cAF = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
var rAF = cAF === clearTimeout ? setTimeout : requestAnimationFrame;
function reraf(limit) {
  var force, timer;
  reset();
  return function reschedule(callback, self, args) {
    cAF(timer);
    if (--force < 0)
      invoke();
    else
      timer = rAF(invoke);
    return stop;
    function invoke() {
      reset();
      callback.apply(self, args || []);
    }
  };
  function reset() {
    force = limit || Infinity;
    timer = 0;
  }
  function stop() {
    cAF(timer);
  }
}
module.exports = reraf;
