/*jshint esnext:true */

(function(exports) {
  'use strict';

  var panel = document.querySelector('.panel');

  function addParameter(url, param) {
    if (url.indexOf('?') === -1) {
      url += '?';
    } else {
      url += '&';
    }
    url += encodeURIComponent(param);
    return url;
  }

  function initFromUrl() {
    var current = Utils.params(location.search);
    if ('fromRight' in current) {
      panel.classList.add('from-right');
    }
  }

  function setLocation(url) {
    gnc_getLocation().assign(url);
  }

  initFromUrl();

  exports.Navigation = {
    left(url) {
      url = addParameter(url, 'fromRight=1');
      panel.classList.add('to-left');
      setLocation(url);
    },
    right(url) {
      panel.classList.remove('to-left');
      setLocation(url);
    }
  };
})(window);
