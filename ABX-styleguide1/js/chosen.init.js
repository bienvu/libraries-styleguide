/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function (window, document, $, Drupal) {
  'use strict';

  // Init chosen lib.
  $('select').chosen({
    disable_search: true
  });

  Drupal.behaviors.chosen = {
    attach: function (context, settings) {
      $('select').chosen({
        disable_search: true
      });
    }
  };
}(this, this.document, this.jQuery, this.Drupal));
