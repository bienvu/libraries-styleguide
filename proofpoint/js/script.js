// Mute youtube video.
var tag = document.createElement('script'),
    players,
    player,
    firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function onYouTubeIframeAPIReady() {
  players = document.querySelectorAll('.media-youtube-player-mute > .media-youtube-player');
  for (var i = 0; i < players.length; i++) {
    var idVideo = players[i].id;
    player = new YT.Player(idVideo, {
      events: {
        'onReady': function(event) {
          event.target.mute();
        }
      }
    });
  }
}

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var mobileOnly = "screen and (max-width:47.9375em)", // 767px.
      mobileTabletOnly = "screen and (max-width:63.9375em)"; // 1023px.
      tablet = "screen and (min-width:48em)"; // 768px.

  // Search on header.
  var $searchBox = $('.js-search-box'),
      searchFlag = 'show-search-box',
      $searchBoxBtn = $('.form-submit', $searchBox),
      $searchBoxBtnClose = $('.search-box__close-button', $searchBox),
      $searchBoxInput = $('.form-text', $searchBox);
  // Process open search form when click search icon.
  $searchBoxBtn.on('click', function (e) {
    if (!$searchBox.hasClass(searchFlag)) {
      e.preventDefault();
      $searchBox.addClass(searchFlag);
      // When search-box displayed fully, form-text will been focused.
      setTimeout(function (){
        $searchBoxInput.focus();
      }, 800);
    }
  });
  // Process close search form.
  $searchBoxBtnClose.on('click', function () {
    if ($searchBox.hasClass(searchFlag)) {
      $searchBox.removeClass(searchFlag);
    }
  });
  $(document).on('touchstart  click', function (e) {
    if ($searchBox.has(e.target).length === 0 && $searchBox.hasClass(searchFlag)) {
      $searchBoxInput.blur();
      $searchBox.removeClass(searchFlag);
    }
  });

  // Show hidden function for js-short-nav__button, js-short-nav__button--login.
  var showHiddenFunction = function (btn, flag) {
    var $btn = btn,
        $parent = $btn.parent();
    $btn.on('click', function () {
      if (!$parent.hasClass(flag)) {
        $parent.addClass(flag);
      }
      else {
        $parent.removeClass(flag);
      }
    });
    $(document).on('click', function (e) {
      if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
        $parent.removeClass(flag);
      }
    });
  };
  // Show hidden short-nav.
  var shortNavFlag = 'show-short-nav',
      $shortNavBtn = $('.js-short-nav__button'),
      $shortLoginBtn = $('.js-short-nav__login-button');
  showHiddenFunction($shortNavBtn, shortNavFlag);
  // Show hidden login.
  showHiddenFunction($shortLoginBtn, shortNavFlag);

  // Header responsive.
  var $header = $('.js-header'),
      $headerPanel = $('.header__panel', $header),
      $headerInner = $('.header__inner', $header),
      $headerGroup = $('.header__group', $header),
      $headerNav = $('.header__nav', $header),
      $headerStickyNav = $('.header__sticky-nav', $header),
      $body = $('body'),
      $pageWrapper = $('#page-wrapper'),
      headerMenuFlag = 'show-menu',
      $headerMenuBtn = $('.header__menu-button', $header),
      $mainMenu = $('.js-main-menu'),
      $expandedMenuFlag = 'expanded-menu--active',
      $expandedMenuBtn = $('.js-expanded-menu__button'),
      $megaMenu = $('.mega-menu'),
      addPaddingHeader = function () {
        var screen = $(window).width(),
            heightHeader = !(screen >= 1024)
              ? $header.height()
              : ($headerPanel.height() + $headerGroup.outerHeight(true) + $headerNav.outerHeight()) + parseInt($headerNav.css('margin-bottom'));
        $pageWrapper.css("paddingTop", heightHeader + "px");
      },
      resetHeader = function () {
        $mainMenu.find('.expanded-menu__menu-child').removeAttr('style');
        $mainMenu.find('.' + $expandedMenuFlag).removeClass($expandedMenuFlag);
        $headerInner.removeAttr('style');
        $header.removeClass(headerMenuFlag);
        $body.removeClass(headerMenuFlag);
      },
      showHidenMenu = function () {
        if (!$header.hasClass(headerMenuFlag)) {
          $header.addClass(headerMenuFlag);
          $body.addClass(headerMenuFlag);
          $headerInner.slideDown("slow");
        }
        else {
          $header.removeClass(headerMenuFlag);
          $body.removeClass(headerMenuFlag);
          $headerInner.slideUp("slow");
        }
      },
      dropDownEpMenu = function () {
        var $this = $(this),
            $parentThis = $this.parent(),
            $grandParentThis = $parentThis.parent(),
            $childrenMenu = $parentThis.children('.expanded-menu__menu-child');

        if (!$parentThis.hasClass($expandedMenuFlag)) {
          // Reset markup
          $grandParentThis.children().removeClass($expandedMenuFlag);
          $grandParentThis.find('> li > .expanded-menu__menu-child').slideUp("slow");
          $megaMenu.find('.expanded-menu--active .expanded-menu__menu-child').slideUp("slow");
          $megaMenu.find('.expanded-menu--active').removeClass($expandedMenuFlag);
          // Show children menu
          $parentThis.addClass($expandedMenuFlag);
          $childrenMenu.slideDown("slow");
        }
        else {
          $grandParentThis.children().removeClass($expandedMenuFlag);
          $childrenMenu.slideUp("slow");
        }
      };
  // Create distance for header.
  addPaddingHeader();
  // Reset markup when screen is been change.
  // Then will enable or disable dropDownEpMenu and showHidenMenu functions on different devices.
  var resizeTimer,
      widthScreen = $(window).width();
  $(window).on('resize', function() {
    // Just when width screen resized.
    if(widthScreen != $(window).width()) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        resetHeader();
        addPaddingHeader();
        widthScreen = $(window).width();
      }, 250);
    }
  });
  // Process click for menu hamburger button in responsive.
  // Enable or disable showHidenMenu function on different devices.
  enquire.register(mobileOnly, {
    match: function () {
      $headerMenuBtn.on('click', showHidenMenu);
    },
    unmatch : function () {
      $headerMenuBtn.off('click', showHidenMenu);
    }
  });
  // Show hidden main menu on tablet.
  showHiddenFunction($('.header__nav__button', $headerNav), headerMenuFlag);
  // Prevent a link from opening the URL for level 1 link of main-menu
  $expandedMenuBtn.on('click', function (e) {
    e.preventDefault();
  });
  // Menu responsive.
  // When click js-expanded-menu.
  // Will show or hidden menu children.
  // Enable or disable dropDownEpMenu function on different devices.
  enquire.register(mobileTabletOnly, {
    match: function () {
      $expandedMenuBtn.on('click', dropDownEpMenu);
    },
    unmatch : function () {
      $expandedMenuBtn.off('click', dropDownEpMenu);
    }
  });

  // Scroll header.
  var scrollHeaderFlag = 'scroll-header',
      scrollHeader = function (e) {
        e.preventDefault();
        var $this = $(this),
            scrollTop = $this.scrollTop(),
            heightBeginEffect = 100;
        if (scrollTop > heightBeginEffect && !$header.hasClass(scrollHeaderFlag)) {
          $header.addClass(scrollHeaderFlag);
        }
        else if (scrollTop < heightBeginEffect && $header.hasClass(scrollHeaderFlag)) {
          $header.removeClass(scrollHeaderFlag);
        }
      };
  $(window).on('scroll', scrollHeader);

  // Process to remove for block-announcement.
  var $jsBlockAnnouncementClose = $('.js-block-announcement__close');
  $jsBlockAnnouncementClose.on('click', function () {
    var $parent = $(this).parent();
    $parent.remove();
    addPaddingHeader();
  });

  // Scroll animate.
  var scrollAnimate = function () {
      var idActive = $(this).attr('href'),
          heightHeader = !$headerStickyNav.length
            ? $header.height()
            : ($header.height() + $headerStickyNav.height()),
          scrollTop;
      if ($(idActive).length) {
        scrollTop = $(idActive).offset().top - heightHeader;
        $('html, body').animate({
          scrollTop: scrollTop
        }, 900);
      }
      return false;
    };
  if ($('.js-scroll-animate').length) {
    $('.js-scroll-animate').on('click', scrollAnimate);
  }

  $(document).ready(function($) {
    $('.js-stats-counter').counterUp({
      delay: 10,
      time: 500
    });
  });

  // Js for ppoint tabs.
  var jsPpointTabs = function (e) {
    e.preventDefault();
    var $this = $(this),
        $ppointTabs = $this.parents('.ppoint-tabs'),
        $ppointListItem = $('.ppoint-tabs__list__item', $ppointTabs),
        $ppointSectionItem = $('.ppoint-tabs__content', $ppointTabs),
        tabIndex = $(this).data("index");
    $ppointListItem.removeClass('active');
    $ppointSectionItem.removeClass('active');
    $ppointListItem.eq(tabIndex).addClass('active');
    $ppointSectionItem.eq(tabIndex).addClass('active');
  };
  $('.js-ppoint-tabs__list__item').on('click', jsPpointTabs);

  // Js for icon carousel.
  var defaultSlickOptions = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      },
      boxQuoteSlideConfig = {
        dots: true,
        infinite: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              adaptiveHeight: true
            }
          }
        ]
      },
      carouselAnnouncement = {
        dots: true,
        infinite: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      };

  if ($().slick) {
    $('.js-icon-carousel').slick(defaultSlickOptions);
    $('.js-box-quote-slide').slick(boxQuoteSlideConfig);
    $('.js-carousel-announcement-slide').slick(carouselAnnouncement);
  }

  // Carousel Banner
  var carouselBanner = $('.js-block-carousel');
  carouselBanner.not('.slick-initialized').slick({
    arrows: true,
    dots: false,
    infinite: true,
    fade: true,
  });

  // AddThis
  var $addThis = $('.block-addthis');
      showHideAddThis = function () {
        var flagAddThis = 'show-block-addthis',
            $contentAddThis = $addThis.find('> .content'),
            $showBtnAddThis,
            $hideBtnAddThis,
            markup = '<span class="block-addthis__show-btn"></span><span class="block-addthis__hide-btn"></span>';
        $contentAddThis.append(markup);
        $showBtnAddThis = $(('.block-addthis__show-btn'), $addThis);
        $hideBtnAddThis = $(('.block-addthis__hide-btn'), $addThis);
        $addThis.addClass(flagAddThis);
        $showBtnAddThis.on('click', function() {
          $addThis.addClass(flagAddThis);
        });
        $hideBtnAddThis.on('click', function() {
          $addThis.removeClass(flagAddThis);
        });
      };
  if ($addThis.length) {
    setTimeout(function () {
      showHideAddThis();
    }, 2000);
  }

  // Show answers function
  var showAnswer = function(e) {
    e.preventDefault();
    var $parents = $(this).closest('.block-faq__item'),
        $answer = $('.block-faq__answer', $parents);
    $parents.toggleClass('active');
    $answer.slideToggle();
  }
  $('.js-show-answer').on('click', showAnswer);

  Drupal.behaviors.attachBlock = {
    attach: function (context, settings) {
      var $subMenu = $('.js-main-menu .attached-block', context);
      $subMenu.each(function () {
        if ($(this).parent('span').length) {
          $(this).unwrap();
        }
      });
    }
  };

  // Table responsive
  Drupal.behaviors.tableResponsive = {
    attach: function (context, settings) {
      var $table = $('table', context);
      if ($table.length &&
          !$table.parent().hasClass('table-responsive')) {
        $table.not($table.find('table')).wrap('<div class="table-responsive"></div>');
      }
    }
  };

  // Bootstrap select
  var buildSelectBT = function (selector) {
    var $select = selector;
    if ($select.css('display') !== 'none') {
      $select.once('bootstrapSelectOnce', function () {
        $(this).selectpicker({
          size : false
        });
        var $parent = $(this).parent(),
            btSelectFlag = 'show-select',
            btSelectBtn = $parent.children('.btn');
        showHiddenFunction(btSelectBtn, btSelectFlag);
        $('.dropdown-menu a', $parent).on('click', function () {
          $parent.removeClass(btSelectFlag);
        });
      });
    }
  };

  Drupal.behaviors.bootstrapSelect = {
    attach: function (context, settings) {
      var $select = $('select', context);
      buildSelectBT($select);
    }
  };

  // Marketo
  if (typeof MktoForms2 === 'object') {
    MktoForms2.whenRendered(function (form) {
      var $mktoForm = $('.mktoForm'),
          $formText = $('input[type="text"], input[type="url"], input[type="email"], input[type="tel"],input[type="number"], input[type="date"]', $mktoForm),
          $formSelect = $('select', $mktoForm);
      // Remove styling of Marketo.
      $('#mktoForms2BaseStyle').remove();
      $('#mktoForms2ThemeStyle').remove();
      $mktoForm.removeAttr('style');
      $('input, textarea, select, label, div, .mktoButtonWrap', $mktoForm).removeAttr('style');
      $('style', $mktoForm).remove();
      $('.mktoCheckboxList').parent().addClass('mkto-form-checkbox');
      $mktoForm.addClass('show-mktoForm');
      // Placehoder for input form text Marketo.
      $($formText).each(function() {
        var $this = $(this),
            $parent = $this.parent(),
            $label = $parent.children('label'),
            textLabel = $label.text(),
            placeholder = ($this.attr('placeholder') === 'undefined') ? $this.attr('placeholder') : textLabel;
        placeholder = placeholder.replace('*', '').replace(':', '');
        if ($parent.hasClass('mktoRequiredField')) {
          placeholder = placeholder + ' *';
        }
        $label.addClass('element-invisible');
        $this.attr('placeholder', Drupal.t(placeholder));
      });
      // Bootstrap select.
      $($formSelect).each(function() {
        var $this = $(this),
            $parent = $this.parent();
        if (!$parent.hasClass('bootstrap-select')) {
          var $label = $parent.children('label'),
              optionFirst = $('option:first-child', $this),
              textLabel = $label.text().length > 1 ? $label.text() : optionFirst.text();
          textLabel = textLabel.replace('*', '').replace(':', '');
          if ($parent.hasClass('mktoRequiredField')) {
            textLabel = textLabel + ' *';
          }
          optionFirst.text(textLabel);
          $label.addClass('element-invisible');
          buildSelectBT($this);
        }
      });
    });
  }

}(this, this.document, this.jQuery));
