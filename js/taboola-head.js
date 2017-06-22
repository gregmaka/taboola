(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.taboola_head = {
    attach: function () {
      window._taboola = window._taboola || [];
      _taboola.push({article:'auto'});
      !function (e, f, u, i) {
        if (!document.getElementById(i)){
          e.async = 1;
          e.src = u;
          e.id = i;
          f.parentNode.insertBefore(e, f);
        }
      }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      drupalSettings.taboola.service_url,
      'tb_loader_script');
      if(window.performance && typeof window.performance.mark == 'function')
        {window.performance.mark('tbl_ic');}
    }
  };
})(jQuery, Drupal, drupalSettings);
