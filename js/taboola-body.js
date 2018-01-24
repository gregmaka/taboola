(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.taboola_body = {
    attach: function () {
      window._taboola = window._taboola || [];
      $.each( drupalSettings.taboola, function( key, setting ) {
        if ($.isNumeric(key)) {
          _taboola.push({
            mode: drupalSettings.taboola[key].mode,
            container: drupalSettings.taboola[key].container,
            placement: drupalSettings.taboola[key].placement,
            target_type: drupalSettings.taboola[key].target_type
          });
        }
      });
      _taboola.push({flush: true});
    }
  };
})(jQuery, Drupal, drupalSettings);
