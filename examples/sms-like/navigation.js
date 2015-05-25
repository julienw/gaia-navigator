/*jshint esnext:true */

(function(exports) {
  'use strict';

  function setLocation(url) {
    gnc_getLocation().assign(url);
  }

  const VIEWS = Object.freeze({
    conversation: {
      file: '/conversation.html',
      view: 'ConversationView'
    },
    inbox: {
      file: '/inbox.html',
      view: 'InboxView'
    }
  });

  function findView(location) {
    for (var name in VIEWS) {
      var object = VIEWS[name];
      if (location.pathname.endsWith(object.file)) {
        return object;
      }
    }

    return null;
  }

  exports.Navigation = {
    back() {
      gnc_getHistory().back();
    },

    go(view, args) {
      setLocation(url);
    },

    init() {
      var view = findView(window.location);
      if (!view) {
        return;
      }

      var viewObject = window[view.view];
      viewObject.beforeEnter && viewObject.beforeEnter();
    }
  };
})(window);
