/*jshint esnext:true */

(function(exports) {
  'use strict';

  function setLocation(url) {
    gnc_getLocation().assign(url);
  }

  const VIEWS = Object.freeze({
    conversation: 'conversation.html',
    inbox: 'inbox.html'
  });

  exports.Navigation = {
    back() {
      gnc_getLocation.back();
    },

    go(view, args) {
      setLocation(url);
    }
  };
})(window);
