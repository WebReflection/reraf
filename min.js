var reraf=function(){"use strict";var o="function"==typeof cancelAnimationFrame?cancelAnimationFrame:clearTimeout,u=o===clearTimeout?setTimeout:requestAnimationFrame;return function(a){var i=a||1/0,c=0;return function(n,e,t){function r(){c=0,n.apply(e,t||[])}o(c),--i<0?r(i=a):c=u(r)}}}();