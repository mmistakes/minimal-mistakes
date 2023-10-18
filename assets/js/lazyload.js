/*! lazyload - v2.1.1 - 2018-04-01
 * https://github.com/13twelve/lazyload
 * Copyright (c) 2018
 * License: MIT
 * Author: Mike Byrne @13twelve https://github.com/13twelve
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.lazyLoad = factory();
  }
}(this, function () {

  var options = {
    pageUpdatedEventName: 'page:updated', // how your app tells the rest of the app an update happened
    elements: 'img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video[data-src], [data-lazyload]', // maybe you just want images?
    rootMargin: '0px', // IntersectionObserver option
    threshold: 0, // IntersectionObserver option
    maxFrameCount: 10, // 60fps / 10 = 6 times a second
  };

  // set up
  var frameLoop;
  var frameCount;
  var els = [];
  var elsLength;
  var observer;
  var checkType;

  /**
   * Converts HTML collections to an array
   * @private
   * @param {Array} array to convert
   * a loop will work in more browsers than the slice method
   */
  function _htmlCollectionToArray(collection) {
    var a = [];
    var i = 0;
    for (a = [], i = collection.length; i;) {
      a[--i] = collection[i];
    }
    return a;
  }

  /**
   * Checks if an element is in the viewport
   * @private
   * @param {Node} element to check.
   * @returns {Boolean} true/false.
   */
  function _elInViewport(el) {
    el = (el.tagName === 'SOURCE') ? el.parentNode : el;
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
  }

  /**
   * Removes data- attributes
   * @private
   * @param {Node} element to update
   */
  function _removeDataAttrs(el) {
    el.removeAttribute('data-src');
    el.removeAttribute('data-srcset');
    el.removeAttribute('data-lazyload');
  }

  /**
   * On loaded, removes event listener, removes data- attributes
   * @private
   */
  function _loaded() {
    this.removeEventListener('load', _loaded);
    _removeDataAttrs(this);
  }

  /**
   * Update an element
   * @private
   * @param {Node} element to update
   */
  function _updateEl(el) {
    var srcset = el.getAttribute('data-srcset');
    var src = el.getAttribute('data-src');
    var dlazyload = el.getAttribute('data-lazyload') !== null;
    //
    if (srcset) {
      // if source set, update and try picturefill
      el.setAttribute('srcset', srcset);
      if (window.picturefill) {
        window.picturefill({
          elements: [el]
        });
      }
    }
    if (src) {
      // if source set, update
      el.src = src;
    }
    if (dlazyload) {
      el.setAttribute('data-lazyloaded','');
      el.removeEventListener('load', _loaded);
      _removeDataAttrs(el);
    }
  }

  /**
   * The callback from the IntersectionObserver
   * @private
   * @entries {Nodes} elements being observed by the IntersectionObserver
   */
  function _intersection(entries) {
    // Disconnect if we've already loaded all of the images
    if (elsLength === 0) {
      observer.disconnect();
    }
    // Loop through the entries
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      // Are we in viewport?
      if (entry.intersectionRatio > 0) {
        elsLength--;
        // Stop watching this and load the image
        observer.unobserve(entry.target);
        entry.target.addEventListener('load', _loaded, false);
        _updateEl(entry.target);
      }
    }
  }

  /**
   * Loops images, checks if in viewport, updates src/src-set
   * @private
   */
  function _setSrcs() {
    var i;
    // browser capability check
    if (checkType === 'really-old') {
      elsLength = els.length;
      for (i = 0; i < elsLength; i++) {
        if (els[i]) {
          _updateEl(els[i]);
          _removeDataAttrs(els[i]);
        }
      }
      els = [];
    } else if (checkType === 'old') {
      // debounce checking
      if (frameCount === options.maxFrameCount) {
        // update cache of this for the loop
        elsLength = els.length;
        for (i = 0; i < elsLength; i++) {
          // check if this array item exists, hasn't been loaded already and is in the viewport
          if (els[i] && els[i].lazyloaded === undefined && _elInViewport(els[i])) {
            // cache this array item
            var thisEl = els[i];
            // set this array item to be undefined to be cleaned up later
            els[i] = undefined;
            // give this element a property to stop us running twice on one thing
            thisEl.lazyloaded = true;
            // add an event listener to remove data- attributes on load
            thisEl.addEventListener('load', _loaded, false);
            // update
            _updateEl(thisEl);
          }
        }
        // clean up array
        for (i = 0; i < elsLength; i++) {
          if (els[i] === undefined) {
            els.splice(i, 1);
          }
        }
        // reset var to decide if to continue running
        elsLength = els.length;
        // will shortly be set to 0 to start counting
        frameCount = -1;
      }

      // run again? kill if not
      if (elsLength > 0) {
        frameCount++;
        frameLoop = window.requestAnimationFrame(_setSrcs);
      }
    } else if (checkType === 'new') {
      observer = new IntersectionObserver(_intersection, {
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      });
      elsLength = els.length;
      for (i = 0; i < elsLength; i++) {
        if (els[i] && els[i].lazyloaded === undefined) {
          observer.observe(els[i]);
        }
      }
    }
  }

  /**
   * Gets the show on the road
   * @private
   */
  function _init() {
    // kill any old loops if there are any
    if (checkType === 'old') {
      try {
        cancelAnimationFrame(frameLoop);
      } catch(err) {}
    } else if (checkType === 'new') {
      try {
        observer.disconnect();
      } catch(err) {}
    }
    // grab elements to lazy load
    els = _htmlCollectionToArray(document.querySelectorAll(options.elements));
    elsLength = els.length;
    frameCount = options.maxFrameCount;
    // go go go
    _setSrcs();
  }

  /**
   * GO GO GO
   * @public
   * @param {object} options (see readme)
   */
  var lazyLoad = function(opts) {
    for(var item in opts) {
      if(opts.hasOwnProperty(item)) {
        options[item] = opts[item];
      }
    }
    if(!('addEventListener' in window) || !window.requestAnimationFrame || typeof document.body.getBoundingClientRect === undefined) {
      checkType = 'really-old';
    } else if ('IntersectionObserver' in window) {
      checkType = 'new';
    } else {
      checkType = 'old';
    }
    _init();
    if (options.pageUpdatedEventName) {
      document.addEventListener(options.pageUpdatedEventName, _init, true);
    }
  };

  return lazyLoad;
}));

lazyLoad();

