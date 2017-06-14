(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.taboola_body = {
    attach: function () {
      window._taboola = window._taboola || [];
      _taboola.push({
        mode: drupalSettings.taboola.mode,
        container: drupalSettings.taboola.container,
        placement: drupalSettings.taboola.placement,
        target_type: drupalSettings.taboola.target_type
      });

      _taboola.push({flush: true});
    }
  };
})(jQuery, Drupal, drupalSettings);
