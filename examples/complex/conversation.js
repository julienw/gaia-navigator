/*jshint esnext:true */
(function() {
  'use strict';

  var content = document.querySelector('.content');
  var threadId = Utils.params(window.location.search).id;
  content.textContent = `this is thread ${threadId}`;

  var confirmCheckbox = document.querySelector('.js-should-confirm-checkbox');
  var backButton = document.querySelector('.js-back-button');
  var confirmationDialog = document.querySelector('.js-confirmation-dialog');
  confirmationDialog.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
      hideDialog();
    }
  });

  document.querySelector('.js-dialog-choice-yes').addEventListener('click', navigateBack);

  backButton.addEventListener('click', onBackButtonClicked);

  function onBackButtonClicked(e) {
    e.preventDefault();
    if (confirmCheckbox.checked) {
      showDialog();
    } else {
      navigateBack();
    }
  }

  function navigateBack() {
    Navigation.left(backButton.href);
  }

  function hideDialog() {
    confirmationDialog.hidden = true;
  }

  function showDialog() {
    confirmationDialog.hidden = false;
  }
})();
