/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  // Switchable headings
  var strings = ['Inspired by you.', 'Innovated by Abaxis', 'Abaxis Global Diagnostics'],
    $rotate_item = $(".js-switchable-headings h2"),
    desktop = "(min-width:73.75em)"; // 1180px.

  function rotateHeadings() {
    var ct = $rotate_item.data("string") || 0;

    $rotate_item.data("string",
      ct == strings.length -1 ? 0 : ct + 1)
      .text(strings[ct])
      .fadeIn().delay(4000).fadeOut(200, rotateHeadings);
  }

  rotateHeadings();

  // Config faq
  Drupal.behaviors.ToggleActive = {
    attach: function () {
      var jsToggleActive = function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('is-active');
      };

      $('.block-faqs__item__title').on('click', jsToggleActive);
      $('.js-toggle-click').on('click', function(){
        $(this).toggleClass('is-active');
      });
    }
  };

  // Menu click dropdown.
  var $childrenExpand = $('.expanded .expanded > a'),
  jsDropDownMenuClick = function(e) {
    e.preventDefault();
    $childrenExpand.parent().find('ul').slideUp();

    if (!$(this).parent().hasClass('show-menu')) {
      $childrenExpand.parent().removeClass('show-menu');
      $(this).parent().find('ul').slideDown();
      $(this).parent().addClass('show-menu');
    }
    else {
      $(this).parent().find('ul').slideUp();
      $(this).parent().removeClass('show-menu');
    }
  }

  enquire.register(desktop, {
    match: function () {
      $childrenExpand.on('click', jsDropDownMenuClick);

      $(document).on('touchstart click', function (e) {
        if (!$('.header').is(e.target) && $('.header').has(e.target).length === 0) {
          $('.expanded .expanded ul').slideUp();
          $('.expanded .expanded').removeClass('show-menu');
        }
      });
    },
    unmatch : function () {
      $childrenExpand.off('click', jsDropDownMenuClick);
    }
  });


  // Equalheight navigation.
  var $featureTitle = $('.block-features__item__title'),
      $featureDescription = $('.block-features__item__description');

  if($featureTitle.length || $featureDescription.length) {
    $featureTitle.matchHeight();
    $featureDescription.matchHeight();
  }

  // Chosen
  var configChosen = {
      width: "auto",
      disable_search_threshold: 15,
      placeholder_text_multiple: ' ',
      disable_search: true
    };

  Drupal.behaviors.selectChosen = {
    attach: function (context, settings) {
      $('.form-marketo select').chosen(configChosen);
    }
  };

  // Marketo
  var resetMarkupMarketo = function () {
    var $mktoForm = $('.form-marketo .mktoForm');
    $mktoForm.removeAttr('style');
    $('input, textarea, label, div, .mktoButtonWrap', $mktoForm).removeAttr('style');
  };
  if (typeof MktoForms2 === 'object') {
    MktoForms2.whenRendered(function (form) {
      var $mktoForm = $('.form-marketo .mktoForm'),
          $mktoFormRow = $('.mktoFormRow', $mktoForm),
          $formText = $('input[type="text"], input[type="url"], input[type="email"], input[type="tel"],input[type="number"], input[type="date"]', $mktoForm),
          $formTextarea = $('textarea', $mktoForm),
          $formSelect = $('select', $mktoForm),
          $formButton = $('.mktoButtonRow button', $mktoForm),
          $formLabel = $('.mktoFieldWrap mktoLabel', $mktoForm);
      // Remove styling of Marketo.
      $('#mktoForms2BaseStyle', $mktoForm).remove();
      $('#mktoForms2ThemeStyle', $mktoForm).remove();
      $mktoForm.removeAttr('style');
      $('input, textarea, select, label, div, .mktoButtonWrap', $mktoForm).removeAttr('style');
      $formText.removeAttr('class');
      $formText.addClass('form-text');
      $formTextarea.addClass('form-textarea');

      // Button style.
      $formButton.removeAttr('class');
      $formButton.addClass('btn btn--bg-red btn--medium');

      // Add class item.
      $mktoFormRow.addClass('form-item');

      $('style', $mktoForm).remove();
      $('.mktoCheckboxList', $mktoForm).parent().addClass('mkto-form-checkbox');

      $mktoFormRow.each(function() {

        var $formLabelText = $(this).find('.mktoLabel');
        if (!($formLabelText.text() == "*" || $formLabelText.text() == "**")) {
          $formLabelText.addClass('has-label');
        }
      });

      $($formSelect).each(function() {
        var $this = $(this),
            $parent = $this.parent();
        if (!$parent.find('.chosen-container').length) {
          $parent.addClass('form-type-select');
          $this.chosen(configChosen);
        }
        else {
          $this.chosen('destroy');
          $this.chosen(configChosen);
        }
      });
      $mktoForm.addClass('show-mktoForm');
    });
  }

  var resizeTimer,
      widthScreen = $(window).width();
  $(window).on('resize', function() {
    // Just when width screen resized.
    if(widthScreen != $(window).width()) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        resetMarkupMarketo();
      }, 250);
    }
  });

  // Anchor Link scroll
  $('.js-scroll-anchor a').click(function(e){
    e.preventDefault();
    $headerHeight = $('.header__navigation').outerHeight();
    console.log($headerHeight);
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top - $headerHeight
    }, 500);
  });

}(this, this.document, this.jQuery));
