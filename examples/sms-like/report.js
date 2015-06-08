(function(exports) {
  'use strict';

  exports.ReportView = {
    beforeEnter(args) {
      console.log('ReportView.beforeEnter', args);
    },

    beforeLeave(args) {
      console.log('ReportView.beforeLeave', args);
    },

    afterEnter(args) {
      console.log('ReportView.afterEnter', args);
    },

    afterLeave(args) {
      console.log('ReportView.afterLeave', args);
    }
  }
})(window);
