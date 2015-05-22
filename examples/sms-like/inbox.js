/*jshint esnext:true */
(function(exports) {
  'use strict';

  exports.InboxView = {
    beforeEnter(args) {
      console.log('InboxView.beforeEnter', args);
    },

    beforeLeave(args) {
      console.log('InboxView.beforeLeave', args);
    },

    afterEnter(args) {
      console.log('InboxView.afterEnter', args);
    },

    afterLeave(args) {
      console.log('InboxView.afterLeave', args);
    }
  };
})(window);
