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

  function isFirstNavigationDocument() {
    return gnc_getHistory().length === 1;
  }

  function pushMissingDocuments() {
    var toPush = [currentView];
    var current = currentView;
    while (current.previous) {
      current = findViewFromName(current.previous);
      toPush.unshift(current);
    }

    if (toPush.length) {
      gnc_getHistory().replaceState(null, null, toPush[0].url);

      toPush.slice(1).forEach((view) => {
        gnc_getHistory().pushState(null, null, view.url);
      });
    }
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

      if (isFirstNavigationDocument()) {
        pushMissingDocuments();
      }

      var args = Utils.params(window.location.search);
      executeNavigationStep('beforeEnter', args);
      attachAfterEnterHandler();
    }
  };
})(window);
