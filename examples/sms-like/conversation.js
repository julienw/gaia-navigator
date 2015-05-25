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

      document.querySelector('.js-dialog-choice-yes').addEventListener(
        'click', this.navigateBack.bind(this)
      );

      this[priv.backButton].addEventListener(
        'click', this.onBackButtonClicked.bind(this)
      );
    },

    beforeEnter(args) {
      console.log('ConversationView.beforeEnter', args);

      this.initView();

      var content = document.querySelector('.content');
      var threadId = Utils.params(window.location.search).id;
      content.textContent = `this is thread ${threadId}`;
    },

    beforeLeave(args) {
      console.log('ConversationView.beforeLeave', args);
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
