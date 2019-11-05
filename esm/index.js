var compat = typeof cancelAnimationFrame === 'function';
var cAF = compat ? cancelAnimationFrame : clearTimeout;
var rAF = compat ? requestAnimationFrame : setTimeout;
export default function reraf(limit) {
  var force, timer;
  return reset(), function reschedule(callback, self, args) {
    cAF(timer);
    if (--force < 0)
      invoke();
    else
      timer = rAF(invoke);
    return function stop(flush) {
      var didStop = !!timer;
      cAF(timer);
      if (didStop && flush)
        invoke();
      return didStop;
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
};
