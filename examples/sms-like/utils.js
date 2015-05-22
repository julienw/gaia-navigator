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
    }
  };

  exports.Utils = Utils;

}(this));
