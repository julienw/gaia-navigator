/*jshint esnext:true */
(function(exports) {
  'use strict';

  const priv = Object.freeze({
    backButton: Symbol('backButton'),
    confirmDialog: Symbol('confirmDialog'),
    reportLink: Symbol('reportLink')
  });

  exports.ConversationView = {
    [priv.backButton]: document.querySelector('.panel-conversation-back-button'),
    [priv.confirmDialog]: document.querySelector('.js-confirmation-dialog'),
    [priv.reportLink]: document.querySelector('.view-report-link'),

    initView() {
      this[priv.confirmDialog].addEventListener('click', (e) => {
        if (e.target.matches('button')) {
          this.hideDialog();
        }
      });

      document.querySelector('.js-dialog-choice-yes').addEventListener(
        'click', this.navigateBack
      );

      this[priv.backButton].addEventListener(
        'click', this.onBackButtonClicked
      );
    },

    cleanup() {
      document.querySelector('.js-dialog-choice-yes').removeEventListener(
        'click', this.navigateBack
      );

      this[priv.backButton].removeEventListener(
        'click', this.onBackButtonClicked
      );
    },

    beforeEnter(args) {
      console.log('ConversationView.beforeEnter', args);

      this.initView();

      var content = document.querySelector('.panel-conversation-content');
      content.textContent = `this is thread ${args.id}`;

      var reportLink = this[priv.reportLink];
      reportLink.href = reportLink.href.replace('XXX', args.id);
    },

    beforeLeave(args) {
      console.log('ConversationView.beforeLeave', args);
      this.cleanup();
    },

    afterEnter(args) {
      console.log('ConversationView.afterEnter', args);
    },

    afterLeave(args) {
      console.log('ConversationView.afterLeave', args);
    },

    onBackButtonClicked(e) {
      var confirmCheckbox = document.querySelector('.js-should-confirm-checkbox');
      if (confirmCheckbox.checked) {
        this.showDialog();
      } else {
        this.navigateBack();
      }
    },

    navigateBack() {
      Navigation.back();
    },

    hideDialog() {
      this[priv.confirmDialog].hidden = true;
    },

    showDialog() {
      this[priv.confirmDialog].hidden = false;
    }
  };

  ['onBackButtonClicked', 'navigateBack'].forEach((method) => {
    ConversationView[method] = ConversationView[method].bind(ConversationView);
  });

})(window);
