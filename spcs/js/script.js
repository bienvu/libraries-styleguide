/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.
  // Show hidden function.
  var showHiddenFunction = function (btn, flag, clickOutside, dropDown, childSelector) {
    var $btn = btn,
        $parent = $btn.parent(),
        $childSelector = childSelector;
    dropDown = dropDown === true ? true : false;
    clickOutside = clickOutside === false ? false : true;
    $btn.off('click');
    $btn.on('click', function (e) {
      e.preventDefault();
      if (!$parent.hasClass(flag)) {
        $parent.addClass(flag);
        if (dropDown === true) {
          $childSelector.slideDown("slow");
        }
      }
      else {
        $parent.removeClass(flag);
        if (dropDown === true) {
          $childSelector.slideUp("slow");
        }
      }
    });
    if (clickOutside === true) {
      $(document).on('click', function (e) {
        if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
          $parent.removeClass(flag);
          if (dropDown === true) {
            $childSelector.slideUp("slow");
          }
        }
      });
    }
  };

  var faqAccordionFlag = 'show-faq',
      $jsFaqAccordion= $('.js-faq-accordion');
  $jsFaqAccordion.each(function(index, el) {
    var $this = $(this),
        $question = $('.faq-accordion__question', $this),
        $answer = $('.faq-accordion__answer', $this);
    showHiddenFunction($question, faqAccordionFlag, false, true, $answer);
  });

  // js-play-video
  var $jsPlayVideo = $('.js-play-video'),
      playVideo = function (e) {
    var $iframeVimeo = $(this).find('.vimeo-embed'),
        $iframeYoutube = $(this).find('.youtube-embed');
    $(this).addClass("play-video");
    if ($iframeVimeo.length) {
      var player = Froogaloop($iframeVimeo[0]);
      player.api('play');
    }
    if ($iframeYoutube.length) {
      $iframeYoutube[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }
  };
  if ($jsPlayVideo.length) {
    $jsPlayVideo.on('click', playVideo);
  }

  // Chosen
  var configChosen = {
      width: "auto",
      disable_search_threshold: 15,
      placeholder_text_multiple: ' '
    };

  Drupal.behaviors.selectChosen = {
    attach: function (context, settings) {
      $('select').chosen(configChosen);

      $('body').on('focus', '.chosen-container-single input', function () {
        if (!$(this).closest('.chosen-container').hasClass('chosen-container-active')) {
          $(this).closest('.chosen-container').prev().trigger('chosen:open');
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

  var $jsGridImage = $('.js-grid-image'),
      $gridImageGrid = $('.grid-image__grid', $jsGridImage),
      $gridImageBtnPrev = $('.js-block-slider-navigation .prev', $jsGridImage),
      $gridImageBtnNext = $('.js-block-slider-navigation .next', $jsGridImage),
      gridImageConfig = {
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        adaptiveHeight: true,
        prevArrow: "<a href='#' class='slick-prev invisible'>Prev</a>",
        nextArrow: "<a href='#' class='slick-next invisible'>Next</a>",
      };
  enquire.register(mobileOnly, {
    match: function () {
      $gridImageGrid.not('.slick-initialized').slick(gridImageConfig).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var $parent = $(this).closest('.js-grid-image'),
            $numberActive = $('.js-block-slider-navigation .number-active', $parent),
            numberActive = nextSlide + 1;
        $numberActive.text(numberActive);
      });

      $gridImageBtnPrev.click(function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.js-grid-image'),
            $caurosel = $('.grid-image__grid', $parent);
        $caurosel.slick('slickPrev');
      });

      $gridImageBtnNext.click(function(e) {
        e.preventDefault();
        var $parent = $(this).closest('.js-grid-image'),
            $caurosel = $('.grid-image__grid', $parent);
        $caurosel.slick('slickNext');
      });
    },
    unmatch: function () {
      if($gridImageGrid.hasClass('slick-initialized')) {
        $gridImageGrid.slick("unslick");

        $gridImageBtnPrev.off("click");
        $gridImageBtnNext.off("click");
      }
    },
  });

  // Js lightbox.
  $('.js-lightbox-gallery').lightGallery({
    selector: ".grid-image__item__inner"
  });

  // Navigation block.
  var $navBlockList = $('.js-navigation-block__list'),
      showDropdown = 'show-dropdown';

  $navBlockList.each(function(index, el) {
    var $this = $(this),
        $dropdownNavBlock = $('.js-navigation-block__dropdown a', $this),
        $menuNavBlock = $('.navigation-block__menu', $this),
        $linkMenuNavBlock = $('a', $menuNavBlock);

    showHiddenFunction($dropdownNavBlock, showDropdown, false, true, $menuNavBlock);

    $linkMenuNavBlock.on('click', function () {
      var textLink = $(this).text();
      $dropdownNavBlock.text(textLink);
      $menuNavBlock.removeAttr('style');
      $menuNavBlock.prev().removeClass(showDropdown);
    });
  });

  var $searchBox = $('.js-search-box'),
      $searchBoxGroup = $('.js-search-box-group', $searchBox),
      $searchBoxInner = $('.search-box__inner', $searchBox),
      showClass = 'show-search-box';
  $searchBoxGroup.on('click', function () {
    $(this).closest('.js-search-box').toggleClass(showClass);
  });

  $(document).on('click', function (e) {
    if ($searchBoxGroup.has(e.target).length === 0 && $searchBoxInner.has(e.target).length === 0) {
      $searchBox.removeClass(showClass);
    }
  });

  Drupal.behaviors.courseList = {
    attach: function (context, settings) {
      var filterFlag = 'show-filter',
          filterFlagMobile = 'show-filter-mobile',
          $jsBoxFilter= $('.js-box-filter__item');
      $jsBoxFilter.each(function(index, el) {
        var $this = $(this),
            $question = $('.box-filter__item__btn', $this),
            $answer = $('.box-filter__item__content', $this);

        enquire.register(mobileOnly, {
          match: function () {
            showHiddenFunction($question, filterFlagMobile, false, true, $answer);
            $(document).on('click', function (e) {
              if ($question.parent().parent().has(e.target).length === 0 && $question.parent().hasClass(filterFlagMobile)) {
                $question.parent().removeClass(filterFlagMobile);
                $answer.slideUp("slow");
              }
            });
          },
          unmatch: function () {}
        });

        enquire.register(tablet, {
          match: function () {
            showHiddenFunction($question, filterFlag, false, true, $answer);
          },
          unmatch: function () {}
        });
      });

      var $courseList = $('.course-list'),
        showPopup = 'show-popup',
        $jsBtnFilter = $('.js-course-list__btn-filter', $courseList);
        $jsBoxFilterClose = $('.js-box-filter__close', $courseList);

      // Reset form boxFilter.
      $jsBoxFilterClose.trigger("click");

      $jsBtnFilter.on('click', function () {
        $(this).closest('.course-list').addClass(showPopup);
        $(this).closest('.course-list').find('.box-filter__item__first .box-filter__item__btn').focus();
        $('body').addClass(showPopup);
      });

      $jsBoxFilterClose.on('click',function() {
        $(this).closest('.course-list').removeClass(showPopup);
        $('body').removeClass(showPopup);
      });
    }
  };

  var showNavFlag = 'show-nav',
      openedFlag = 'opened',
      $header = $('.js-header'),
      $header_top = $('.header-top', $header),
      $header_main = $('.header-main', $header),
      scrollHeaderFlag = 'header--scroll',
      $menuResponsiveBtn = $('.menu-toggle-wrap'),
      $expandedMenu = $('.js-expanded-menu'),
      $linkExpandedMenu = $('> ul > li.expanded-menu > a', $expandedMenu),
      menuResponsiveFunc = function (e) {
        e.preventDefault();
        if (!$header.hasClass(showNavFlag)) {
          $('body').addClass(showNavFlag);
          $header.addClass(showNavFlag);
        }
        else {
          $('body').removeClass(showNavFlag);
          $header.removeClass(showNavFlag);
        }
      },
      expandedMenuFunc = function (index, e) {
        var $this = $(this),
            $parent = $this.closest('.expanded-menu'),
            $childMenu = $parent.find('> .expanded-menu__menu-child');
        showHiddenFunction($this, openedFlag, true, true, $childMenu);
      };
  $menuResponsiveBtn.on('click', menuResponsiveFunc);
  $linkExpandedMenu.each(expandedMenuFunc);

  var menuPosition = function() {
    $expandedMenu.find('> .menu > li.expanded-menu').each(function() {
     $(this).supposition();
    });
  },
  lazyMenuPosition = _.debounce(function() {
    if ($(document).getWidth() >= 1024) {
      menuPosition();
    }
  }, 500);

  if ($(document).getWidth() >= 1024) {
    menuPosition();
  }
  $(window).resize(lazyMenuPosition);

  // Keydown main-menu.
  // Use keyboard (Enter, ArrowDown, ArrowUp, ...) to control main-menu.
  Drupal.behaviors.keydownMainMenu = {
    attach: function (context, settings) {
      $('.main-menu', context).once('keydownMainMenuOnce').each(function () {
        var $mainMenu = $(this);
        $mainMenu.find('> .menu > .menu-item:first-of-type > a').attr('tabindex', 0);
        $mainMenu.on('keydown', function(e) {
          var $this = $(this),
              event = e,
              $tabindex = $this.find('> .menu > .menu-item > a[tabindex="0"]'),
              $parentMenuItem = $tabindex.closest('.menu-item');
          switch (e.key) {
            case 'Enter':
              var checkFocusLink = $this.find('.menu > .menu-item > a:focus');
              if (checkFocusLink.parent().hasClass('lv-1')) {
                event.stopPropagation();
                event.preventDefault();
                $this.keydownMenuItem('ArrowDown');
              }
              break;
            case 'ArrowDown':
              event.stopPropagation();
              event.preventDefault();
              var checkFocusLink = $this.find('.menu > .menu-item > a:focus');
              if (checkFocusLink.parent().hasClass('lv-1')) {
                $parentMenuItem.find('.lv-2').removeClass('opened');
              }
              $this.keydownMenuItem('ArrowDown');
              break;
            case 'ArrowUp':
              event.stopPropagation();
              event.preventDefault();
              $this.keydownMenuItem('ArrowUp');
              break;
            case 'ArrowLeft':
              $this.keydownMenuItem('ArrowLeft');
              break;
            case 'ArrowRight':
              $this.keydownMenuItem('ArrowRight');
              break;
            case 'Escape':
              var checkFocusLink = $this.find('.menu > .menu-item > a:focus');
              if (checkFocusLink.closest('.opened').hasClass('lv-1')) {
                $tabindex.focus();
                $parentMenuItem.find('> .expanded-menu__menu-child').slideUp('slow');
                $parentMenuItem.removeClass('opened');
              }
              else if (checkFocusLink.closest('.opened').hasClass('lv-2')) {
                $this.keydownMenuItem('ArrowLeft');
              }
              break;
            case 'Shift' && 'Tab':
              if ($parentMenuItem.hasClass('opened')) {
                $parentMenuItem.find('> .expanded-menu__menu-child').slideUp('slow');
                $parentMenuItem.removeClass('opened');
              }
              break;
          }
        });
      });
    }
  };

  // Helpers of keydownMainMenu behaviors.
  $.fn.setFocusMenuItem = function(keydown) {
    var focusLink = $(this).find('.expanded-menu__menu-child > .menu > .menu-item > a:focus '),
        $parentMenuItemFocus = focusLink.closest('.menu-item'),
        $parentMenu = focusLink.closest('.menu');
    if (keydown == 'ArrowDown') {
      var $nextItemFocus = $parentMenuItemFocus.next().find('> a');
      if ($nextItemFocus.length) {
        focusLink.blur();
        $nextItemFocus.focus();
      }
      else {
        focusLink.blur();
        $parentMenu.find('> .menu-item:first-of-type > a').focus();
      }
    }
    else if (keydown == 'ArrowUp') {
      var $prevItemFocus = $parentMenuItemFocus.prev().find('> a');
      if ($prevItemFocus.length) {
        focusLink.blur();
        $prevItemFocus.focus();
      }
      else {
        focusLink.blur();
        $parentMenu.find('> .menu-item:last-of-type > a').focus();
      }
    }
  };

  $.fn.keydownMenuItem = function(keydown) {
    var $this = $(this),
        $tabindex = $this.find('> .menu > .menu-item > a[tabindex="0"]'),
        $parentMenu = $tabindex.closest('.menu'),
        $parentMenuItem = $tabindex.closest('.menu-item'),
        focusLink = $parentMenuItem.find('.expanded-menu__menu-child > .menu > .menu-item > a:focus'),
        $parentMenuItemLv2 = focusLink.closest('.lv-2');
    switch (keydown) {
      case 'Enter':
        break;
      case 'ArrowDown':
        var $firstLinkmenuChild = $parentMenuItem.find('> .expanded-menu__menu-child > .menu > .menu-item:first-of-type > a');
        if ($parentMenuItem.hasClass('expanded-menu')
            && !$parentMenuItem.hasClass('opened')) {
          $tabindex.trigger('click');
          $firstLinkmenuChild.focus();
        }
        else {
          $parentMenuItem.setFocusMenuItem('ArrowDown');
        }
        break;
      case 'ArrowUp':
        var $firstLinkmenuChild = $parentMenuItem.find('> .expanded-menu__menu-child > .menu > .menu-item:first-of-type > a');
        if ($parentMenuItem.hasClass('expanded-menu')
            && $parentMenuItem.hasClass('opened')) {
          $parentMenuItem.setFocusMenuItem('ArrowUp');
        }
        break;
      case 'ArrowLeft':
        var $prevTabIndex = $parentMenuItem.prev().find('> a').length ? $parentMenuItem.prev().find('> a')
                            : $parentMenu.find('> .menu-item:last-of-type > a');
        if (!$parentMenuItem.hasClass('opened')
            || !$parentMenuItemLv2.hasClass('opened')) {
          $tabindex.attr('tabindex', -1);
          $prevTabIndex.attr('tabindex', 0);
          $prevTabIndex.focus();
          if ($parentMenuItem.hasClass('opened')) {
            $tabindex.trigger('click');
          }
        }
        else {
          focusLink.blur();
          $parentMenuItemLv2.removeClass('opened');
          $parentMenuItemLv2.find('> a').focus();
        }
        break;
      case 'ArrowRight':
        var $nextTabIndex = $parentMenuItem.next().find('> a').length ? $parentMenuItem.next().find('> a')
                            : $parentMenu.find('> .menu-item:first-of-type > a');
        if (!$parentMenuItem.hasClass('opened')
          || !$parentMenuItemLv2.length
          || $parentMenuItemLv2.hasClass('opened')) {
          $tabindex.attr('tabindex', -1);
          $nextTabIndex.attr('tabindex', 0);
          $nextTabIndex.focus();
          if ($parentMenuItem.hasClass('opened')) {
            $tabindex.trigger('click');
            $parentMenuItem.find('.opened').removeClass('opened');
          }
        }
        else {
          var $parentMenuItemFocus = focusLink.closest('.menu-item');
              $firstLinkmenuChild = $parentMenuItemFocus.find('> .expanded-menu__menu-child > .menu > .menu-item:first-of-type > a');
          if ($parentMenuItemFocus.hasClass('expanded-menu')
            && !$parentMenuItemFocus.hasClass('opened')) {
            $parentMenuItemFocus.addClass('opened');
            $firstLinkmenuChild.focus();
          }
        }
        break;
    }
  };

  scrollHeader = function (e) {
    e.preventDefault();
    var $this = $(this),
      scrollTop = $this.scrollTop(),
      heightBeginEffect = 100;
    if (scrollTop > heightBeginEffect && !$header_main.hasClass(scrollHeaderFlag) ) {
      $header_main.addClass(scrollHeaderFlag);
      $header_top.addClass(scrollHeaderFlag);
    }
    else if (scrollTop < heightBeginEffect && $header_main.hasClass(scrollHeaderFlag)) {
      $header_main.removeClass(scrollHeaderFlag);
      $header_top.removeClass(scrollHeaderFlag);
    }
  };

  $(window).on('scroll', scrollHeader);

}(this, this.document, this.jQuery));
