(function (Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.taboola_body = {
    attach: function () {
      window._taboola = window._taboola || [];
      var lazyLoad = drupalSettings.taboola.lazy_load;

      // Loop taboola blocks.
      for (var key in drupalSettings.taboola) {
        if (!isNaN(key) && drupalSettings.taboola.hasOwnProperty(key)) {
          // Check whether to lazy load taboola.
          if (lazyLoad) {
            lazyLoadTaboola();
          }
          else {
            renderTaboola(key);
          }
        }
      }

      if (!lazyLoad) {
        _taboola.push({flush: true});
      }

      /**
       * Renders Taboola block by key.
       *
       * @param {integer} key
       */
      function renderTaboola(key) {
        _taboola.push({
          mode: drupalSettings.taboola[key].mode,
          container: drupalSettings.taboola[key].container,
          placement: drupalSettings.taboola[key].placement,
          target_type: drupalSettings.taboola[key].target_type
        });
      }

      /**
       * Lazy loads Taboola block once it is in view.
       */
      function lazyLoadTaboola() {
        // Create an intersection observer to check if the Taboola block is
        // in view.
        let options = {root: null, rootMargin: '0px', threshold: 1.0}
        var observer = new IntersectionObserver(onIntersection, options);
        var target = document.getElementById(drupalSettings.taboola[key].container);
        observer.observe(target);

        // Renders Taboola block once it is in view.
        function onIntersection(entries){
          entries.forEach(entry => {
            // Check if the Taboola block is in view.
            if (entry.intersectionRatio > 0) {
              for (var key in drupalSettings.taboola) {
                if (!isNaN(key) && drupalSettings.taboola.hasOwnProperty(key)) {
                  // Loop over the available Taboola blocks, find the matching
                  // one by id.
                  if (drupalSettings.taboola[key].container === entry.target.id) {
                    renderTaboola(key);
                    _taboola.push({flush: true});

                    // Stop watching.
                    observer.unobserve(entry.target);
                  }
                }
              }
            }
          });
        }
      }
    }
  };
})(Drupal, drupalSettings);
