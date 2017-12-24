(function ($) {
  Drupal.behaviors.PpSearchApiForm = {
    attach: function (context, settings) {
      var searchClick = function(e) {
        event.preventDefault();
        var option_selected = $(this).attr('data-display'),
            $parent = $(this).parents('.form-banner'),
            $advanced_link = $parent.find('.js-form-banner-advanced');
        if($advanced_link.hasClass('active-advanced')) {
          $advanced_link.trigger('click');
        }
        if (option_selected !== undefined) {
          $('#edit-node-type-select').selectpicker('val', option_selected).trigger('change');
        }
        //Add class active
        $parent.find('.js-form-banner-search').removeClass('active-search');
        $(this).addClass('active-search');
      };
      $('.js-form-banner-search', context).once('PpSearchApiFormSearch', function () {
        $(this).on('click', searchClick);
      });

      // Actions advanced form
      var advancedClick = function(e) {
        e.preventDefault();
        var $formBanner = $(this).parents('.form-banner'),
            $contentForm = $('.form-banner__advanced', $formBanner);
        $(this).toggleClass('active-advanced');
        $formBanner.toggleClass('active-advanced');
        $contentForm.slideToggle();
      };
      $('.js-form-banner-advanced', context).once('PpSearchApiFormAdvanced', function () {
        $(this).on('click', advancedClick);
      });
    }
  };
}(jQuery));
