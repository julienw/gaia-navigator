/*jshint esnext:true */
(function(exports) {
  'use strict';

  const priv = Object.freeze({
    backButton: Symbol('backButton'),
    confirmDialog: Symbol('confirmDialog')
  });

  exports.ConversationView = {
    [priv.backButton]: document.querySelector('.js-back-button'),
    [priv.confirmDialog]: document.querySelector('.js-confirmation-dialog'),

    initView() {
      this[priv.confirmDialog].addEventListener('click', (e) => {
        if (e.target.matches('button')) {
          this.hideDialog();
        }
      });

      this.onBackButtonClicked = this.onBackButtonClicked.bind(this);
      this.navigateBack = this.navigateBack.bind(this);

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

      var content = document.querySelector('.content');
      content.textContent = `this is thread ${args.id}`;
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
})(window);
