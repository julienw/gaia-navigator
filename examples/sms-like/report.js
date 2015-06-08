/*jshint esnext:true */

(function(exports) {
  'use strict';

  exports.ReportView = {
    beforeEnter(args) {
      console.log('ReportView.beforeEnter', args);

      var title = document.querySelector('.panel-report-title');
      title.textContent = `For id ${args.id}`;
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
  };
})(window);
