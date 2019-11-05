'use strict';
var compat = typeof cancelAnimationFrame === 'function';
var cAF = compat ? cancelAnimationFrame : clearTimeout;
var rAF = compat ? requestAnimationFrame : setTimeout;
function reraf(limit) {
  var force, timer;
  return reset(), function reschedule(callback, self, args) {
    cAF(timer);
    if (--force < 0)
      invoke();
    else
      timer = rAF(invoke);
    return function stop(flush) {
      cAF(timer);
      if (flush && timer)
        invoke();
    };
    function invoke() {
      reset();
      callback.apply(self, args || []);
    }
  };
  function reset() {
    force = limit || Infinity;
    timer = 0;
  }
}
module.exports = reraf;
