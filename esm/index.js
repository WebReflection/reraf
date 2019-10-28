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
};
