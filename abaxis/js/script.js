/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var mobileOnly = "screen and (max-width:47.9375em)", // 767px.
  mobileTabletOnly = "screen and (max-width:73.6875em)", // // max-width: 1179px
  tabletOnly = "screen and (max-width: 73.6875em) and (min-width: 48em)", // min-width: 768px and max-width: 1180px.
  mobileLandscape = "(min-width:30em)", // 480px.
  tablet = "(min-width:48em)"; // 768px.
  desktop = "(min-width:73.75em)"; // 1180px.

  // Enquire usage:
  // enquire.register(tablet, {
  //   match: function () {
  //     $(window).on('resize', handler).resize();
  //   },
  //   unmatch : function () {
  //     $(window).on('resize', handler);
  //   },
  // });

  // Add  functionality here.
  // Call chosen for select.
  $("select").chosen();

  // Sliders default options.
  var defaultSlickOptions = {
        arrows: false,
        dots: true,
        fade: true,
        infinite: true
      },
      streamSlickOptions = {
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
      };

  // Config caurousel slick for block testimonial.
  $('.js-block-testimonial__slide').slick(defaultSlickOptions);

  // Config caurousel slick for block slideshow.
  $('.js-block-slideshow__slide').slick(defaultSlickOptions);

  // Config caurousel slick for block rotors.
  $('.js-block-rotors__slides').slick(defaultSlickOptions);

  // Config caurousel slick for block stream.
  $('.js-block-stream__carousel').slick(streamSlickOptions);

  // Config carousel slick for block be insprired.
  var $carouselSlick = $('.js-video-slide');
  enquire.register(mobileOnly, {
    //Match this case
    match: function () {
      $carouselSlick.slick(defaultSlickOptions);
    },
    unmatch: function () {
      $carouselSlick.slick('unslick');
    }
  });

  // Header dropdowns toggler
  var $header_dropdowns = $('.touchevents .navigation-dropdown > li');

  $header_dropdowns.on('click', function(e) {
    $(this).toggleClass('toggled');
  });

  $(document).on('touchstart', function (e) {
    if (!$header_dropdowns.is(e.target) && $header_dropdowns.has(e.target).length === 0) {
      $header_dropdowns.removeClass('toggled');
    }
  });

  // Config accordion.
  var jsAccordion = function(e) {
    e.preventDefault();
    var item = $(this).parent();

    if(item.hasClass('is-active')) {
      item.removeClass('is-active');
    } else {
      $('.js-block-accordion__item').removeClass('is-active');
      item.toggleClass('is-active');
    }
  };

  $('.js-block-accordion__header').on('click', jsAccordion);

  // Config tabs.
  var jsTabs = function(e) {
  e.preventDefault();

  var $this = $(this);
      $tab_index = $this.index();
      $content_item = $( '.js-tabs__content > div' );
      $js_tabs = $( '.js-tabs a' );

    $js_tabs.removeClass('is-active');
    $this.children().addClass('is-active');
    $content_item.removeClass('is-active');
    $content_item.eq( $tab_index ).addClass('is-active');
  };

  $('.js-tabs li').on('click', jsTabs);

  // Config select tabs.
  var jsSelect = function(e) {
      $tab_index = $( ".js-select option:selected" ).index();
      $content_item = $( '.js-tabs__content > div' );

    $content_item.removeClass('is-active');
    $content_item.eq( $tab_index ).addClass('is-active');
  };

  $('.js-select').on('change', jsSelect);

  // Load more items.
  var loadItems = function(e) {
    e.preventDefault();

    var $this = $(this),
      $window_width = $(window).width(),
      $container = $this.parents('.js-load-items-container'),
      items_to_show = e.data.items_to_show,
      $hidden_items = $('.hidden, .hidden-on-mobile, .hidden-on-mobileTabletOnly', $container);

    if($window_width > 768) {
      $hidden_items = $('.hidden, .hidden-on-mobileTabletOnly', $container);
    }

    if($window_width > 1180) {
      $hidden_items = $('.hidden', $container);
    }

    $hidden_items.slice(0, items_to_show).removeClass('hidden hidden-on-mobile hidden-on-mobileTabletOnly');

    if($hidden_items.length <= items_to_show) {
      $this.css('display', 'none');
    }
  };

  $('.js-load-5-items').on('click', {items_to_show: 5}, loadItems);
  $('.js-load-4-items').on('click', {items_to_show: 4}, loadItems);

  // Show content event landing.
  var jsShowContent = function() {
    $(this).toggleClass('active').next().toggleClass('active hidden-on-mobile');
  };

  enquire.register(mobileOnly, {
    match: function () {
      $('.js-show-content .tab-filter').on('click', jsShowContent);
    },
    unmatch : function () {
      $('.js-show-content .tab-filter').off('click', jsShowContent);
    }
  });

  // Search field toggler.
  var $searchBtn = $('.js-top-search'),
    topSearchFlag = 'show-search-box',
    $topSearchWrapper = $('.search-box'),
    $searchInput = $('.form-text', $topSearchWrapper);

  $searchBtn.on('click', function(e) {
    if(!$topSearchWrapper.hasClass(topSearchFlag)) {
      e.preventDefault();
      $topSearchWrapper.addClass(topSearchFlag);
      $searchInput.focus();
    }
  });

  $(document).on('touchstart click', function (e) {
    if (!$searchBtn.is(e.target) && $searchBtn.has(e.target).length === 0) {
      $searchInput.blur();
      $topSearchWrapper.removeClass(topSearchFlag);
    }
  });

  // Scroll animate.
  $('.block-category__wrap > a').on('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(id).offset().top
    }, 800);
  });

  // Menu responsive.
  var openExpandedMenu = 'open',
    activeMenu = 'is-active',
    activeResponsiveIcon = 'active-icon',
    $header = $('.header'),
    navHeaderLeft = 'main-menu--left',
    navHeaderRight = 'main-menu--right';

  // Remove all classes which is into main-menu.
  var resetClassNavigation = function() {
    var $mainMenu = $('.main-menu');
    $('.'+openExpandedMenu, $mainMenu).removeClass(openExpandedMenu);
    $('.'+activeMenu, $mainMenu).removeClass(activeMenu);
  };

  // Remove all classes which is added into header.
  var resetClassHeader = function() {
    $('.'+openExpandedMenu,$header).removeClass(openExpandedMenu);
    $('.'+activeMenu,$header).removeClass(activeMenu);
    $('.'+activeResponsiveIcon,$header).removeClass(activeResponsiveIcon);
  };

  // Process when click responsive icon menu.
  // Show or hidden search, localization, menu on mobile.
  var jsActiveMobileMenu = function(e) {
    e.preventDefault();

    var $this = $(this),
      hrefThis = $this.attr('href'),
      $thisParent = $(this).parent('.js-responsive-icons');

    if ($this.hasClass(activeResponsiveIcon)) {
      $this.removeClass(activeResponsiveIcon);
      $(hrefThis).removeClass(activeMenu);
    } else {
      $('.'+activeResponsiveIcon, $thisParent).removeClass(activeResponsiveIcon);
      $('.'+activeMenu, $header).removeClass(activeMenu);
      $this.addClass(activeResponsiveIcon);
      $(hrefThis).addClass(activeMenu);
    }
    return false;
  };

  // Process when click js-expanded-menu.
  // Will show or hidden children of menu.
  var jsDropDownMenu = function(e) {
    e.preventDefault();
    var $this = $(this),
      $parentThis = $this.parent(),
      $grandParentThis = $parentThis.parent(),
      $childrenMenu = $parentThis.find('> ul');

    if ($this.hasClass(openExpandedMenu)) {
      $this.removeClass(openExpandedMenu);
      $parentThis.removeClass(activeMenu);
      $childrenMenu.removeClass(activeMenu);
    } else {
      if ($grandParentThis.hasClass(navHeaderRight) || $grandParentThis.hasClass(navHeaderLeft)) {
        // Detect when click to js-expanded-menu level 1.
        // Action is remove all classes added into main-menu, include main-menu in the left and in the main-menu right.
        // Then add classes to true place need to show.
        resetClassNavigation();
      }
      else {
        // Detect when click to js-expanded-menu level 2.
        // Action is remove all classes added into ul level 2.
        // Then add classes to true place need to show.
        $('.'+openExpandedMenu, $grandParentThis).removeClass(openExpandedMenu);
        $('.'+activeMenu, $grandParentThis).removeClass(activeMenu);
      }
      // Add classes to true place need to show.
      $this.addClass(openExpandedMenu);
      $parentThis.addClass(activeMenu);
      $childrenMenu.addClass(activeMenu);
    }
  };

  enquire.register(mobileOnly, {
    match: function () {
      resetClassHeader();
      $('.js-responsive-icons > a').on('click', jsActiveMobileMenu);
      $('.js-expanded-menu').on('click', jsDropDownMenu);
    },
    unmatch : function () {
      resetClassHeader();
      $('.js-responsive-icons > a').off('click', jsActiveMobileMenu);
      $('.js-expanded-menu').off('click', jsDropDownMenu);
    }
  });

  // Process when click responsive icon bar menu.
  // Show or hidden menu in the right on tablet only.
  var jsActiveTabletMenu = function(e) {
    var $this = $(this),
      $headerNavigation = $('.header__navigation__right');
      $this.toggleClass(activeResponsiveIcon);
      $headerNavigation.toggleClass(activeMenu);
  };

  enquire.register(tabletOnly, {
    match: function () {
      resetClassHeader();
      $('.js-responsive-icons > a').on('click', jsActiveTabletMenu);
    },
    unmatch : function () {
      resetClassHeader();
      $('.js-responsive-icons > a').off('click', jsActiveTabletMenu);
    }
  });

  // Year position calculations.
  var calcTimelineYearPosition = function() {
    var $this = $(this),
      maxHeight = 0,
      year_pos,
      $text_block = $('.timeline-block__event__text', $this),
      $year = $('.js-year-marker', $this);

    if($text_block.length) {
      $text_block.each(function() {
        maxHeight = maxHeight > $(this).innerHeight() ? maxHeight : $(this).innerHeight();
      });
      year_pos = ((maxHeight - $year.height()) / 2);
      $year.css('bottom', year_pos);
    }
  };

  var timelineDotsGeneration = function() {
    var $this = $(this),
      current_year = $this.data('year'),
      $year_wrapper = $this.parent(),
      $prev_year_wrapper = $year_wrapper.prev('.js-year-wrapper');

    if($prev_year_wrapper.length) {
      var $prev_year = $('.js-year-marker', $prev_year_wrapper),
        year_diff = current_year - $prev_year.data('year');

      // Make sure that we have some years skipped.
      if(year_diff > 1) {
        var total_dots = year_diff - 1,
          dot_space = 40,
          year_circle_height = $this.height(),
          start_pos = $prev_year.offset().top + 45,
          end_pos = $this.offset().top,
          dot_pos = start_pos,
          year_distance = end_pos - start_pos,
          dot_pos_step = year_distance / year_diff,
          total_dots_distance = total_dots * dot_pos_step;

        // Checking if length of all dots does will match
        // length between two years.
        // 30 - is used for ratio.
        if((year_distance - total_dots_distance) < 30) {
          dot_pos_step = (total_dots * dot_space) / year_diff;

          // Calculating and applying new top margins
          // in order to avoid event-blocks overlaps.
          if(!$year_wrapper.hasClass('year-single')) {
            $year_wrapper.css(
              'margin-top',
              year_circle_height + ((total_dots * dot_pos_step) - year_distance)
            );
          } else {
            var top_margin = $year_wrapper.css('margin-top');

            $year_wrapper.css(
              'margin-top',
              (year_circle_height + (total_dots_distance - year_distance)) + parseInt(top_margin)
            );
          }
        }

        // Generating dots with pre-calculated positions.
        for(var i = 0; i < total_dots; i++) {
          var new_dot = $('<div class="timeline-block__dot"></div>');
          dot_pos += dot_pos_step;
          $('.timeline-block__inner').append(new_dot);
          new_dot.offset({top: dot_pos});
        }
      }
    }
  };

  // Remove all styles and markup generated after
  // timeline processes.
  var clearTimelineDots = function() {
    $('.timeline-block__dot').remove();
    $('.js-year-wrapper').removeAttr('style');
  };

  if($('.page-timeline').length) {
    enquire.register(tablet, {
      match: function () {
        $(window).on('load resize', function() {
          clearTimelineDots();
          calcTimelineYearPosition();
          $('.js-year-wrapper').each(calcTimelineYearPosition);
          $('.js-year-marker').each(timelineDotsGeneration);
        });
      },
      unmatch : function () {
        $(window).off('resize');
        clearTimelineDots();
      }
    });
  }
}(this, this.document, this.jQuery));
