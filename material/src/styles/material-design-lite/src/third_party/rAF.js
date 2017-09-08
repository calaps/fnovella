// Source: https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
// Adapted from https://gist.github.com/paulirish/1579671 which derived from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

(function () {


  if (!Date.now) {
    /**
     * Date.now polyfill.
     * @return {number} the current Date
     */
    Date.now = function () { return new Date().getTime(); };
    Date.now = Date.now;
  }

  const vendors = ['webkit', 'moz'];
  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    const vp = vendors[i];
    window.requestAnimationFrame = window[`${vp}RequestAnimationFrame`];
    window.cancelAnimationFrame = (window[`${vp}CancelAnimationFrame`] ||
        window[`${vp}CancelRequestAnimationFrame`]);
    window.requestAnimationFrame = window.requestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame;
  }

  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    let lastTime = 0;
    /**
     * requestAnimationFrame polyfill.
     * @param  {!Function} callback the callback function.
     */
    window.requestAnimationFrame = function (callback) {
      const now = Date.now();
      const nextTime = Math.max(lastTime + 16, now);
      return setTimeout(() => { callback(lastTime = nextTime); },
                        nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
    window.requestAnimationFrame = window.requestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame;
  }

}());
