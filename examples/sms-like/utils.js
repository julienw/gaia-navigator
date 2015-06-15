/* jshint esnext: true */

(function(exports) {
  'use strict';
  var rparams = /([^?=&]+)(?:=([^&]*))?/g;

  var Utils = {
    params: function(input) {
      var parsed = {};
      input.replace(rparams, function($0, $1, $2) {
        parsed[$1] = $2;
      });
      return parsed;
    },

    url(base, params) {
      if (base.indexOf('?') === -1) {
        base += '?';
      } else {
        base += '&';
      }

      for (var key in params) {
        base += encodeURIComponent(`${key}=${params[key]}&`);
      }

      return base;
    },

    /**
     * Promise related utilities
     */
    Promise: {
      /**
       * Returns object that contains promise and related resolve\reject methods
       * to avoid wrapping long or complex code into single Promise constructor.
       * @returns {{promise: Promise, resolve: function, reject: function}}
       */
      defer: function() {
        var deferred = {};

        deferred.promise = new Promise(function(resolve, reject) {
          deferred.resolve = resolve;
          deferred.reject = reject;
        });

        return deferred;
      }
    }
  };

  exports.Utils = Utils;

}(this));
