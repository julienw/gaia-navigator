/*jshint esnext:true */

(function(exports) {
  'use strict';

  const VIEWS = Object.freeze([
    Object.freeze({
      name: 'conversation',
      url: 'conversation.html',
      view: 'ConversationView',
      previous: 'inbox'
    }),
    Object.freeze({
      name: 'inbox',
      url: 'inbox.html',
      view: 'InboxView'
    })
  ]);

  var currentView;

  function setLocation(url) {
    gnc_getLocation().assign(url);
  }

  function findViewFromLocation(location) {
    return VIEWS.find((object) => {
      return location.pathname.endsWith('/' + object.url);
    }) || null;
  }

  function findViewFromName(name) {
    return VIEWS.find((object) => {
      return object.name === name;
    }) || null;
  }

  function executeNavigationStep(stepName, args) {
    var viewObject = window[currentView.view];
    if (viewObject[stepName]) {
      return Promise.resolve(viewObject[stepName](args));
    }
    return Promise.resolve();
  }

  function attachAfterEnterHandler() {
    window.addEventListener(
      'navigation-transition-end',
      function onNavigationEnd() {
        window.removeEventListener('navigation-transition-end', onNavigationEnd);
        executeNavigationStep('afterEnter');
      }
    );
  }

  exports.Navigation = {
    back() {
      return executeNavigationStep('beforeLeave').then(
        () => gnc_getHistory().back()
      );
    },

    go(viewName, args) {
      var view = findViewFromName(viewName);
      return executeNavigationStep('beforeLeave').then(
        () => setLocation(view.url)
      );
    },

    init() {
      currentView = findViewFromLocation(window.location);
      if (!currentView) {
        return;
      }

      var args = Utils.params(window.location.search);
      executeNavigationStep('beforeEnter', args);
      attachAfterEnterHandler();
    }
  };
})(window);
