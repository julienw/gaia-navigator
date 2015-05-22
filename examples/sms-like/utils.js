/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

/* globals ContactPhotoHelper, Notification, Promise, Threads, Settings,
           Dialog,
           Promise
*/

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
    }
  };

  exports.Utils = Utils;

}(this));
