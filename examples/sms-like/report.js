/*jshint esnext:true */

(function(exports) {
  'use strict';

  const priv = Object.freeze({
    backButton: Symbol('backButton')
  });

  exports.ReportView = {
    [priv.backButton]: document.querySelector('.panel-report-back-button'),

    initView() {
      this[priv.backButton].addEventListener(
        'click', this.onBackButtonClicked
      );
    },

    cleanup() {
      this[priv.backButton].removeEventListener(
        'click', this.onBackButtonClicked
      );
    },

    beforeEnter(args) {
      console.log('ReportView.beforeEnter', args);

      var title = document.querySelector('.panel-report-title');
      title.textContent = `For id ${args.id}`;

      this.initView();
    },

    beforeLeave(args) {
      console.log('ReportView.beforeLeave', args);
    },

    afterEnter(args) {
      console.log('ReportView.afterEnter', args);
    },

    afterLeave(args) {
      console.log('ReportView.afterLeave', args);
    },

    onBackButtonClicked() {
      Navigation.back();
    }
  };
})(window);
