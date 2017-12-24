/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width: 48em)", // max-width: 768px.
    mobileOnlySmall = "screen and (max-width: 30em)", // max-width: 480px.
    mobileLandscape = "(min-width: 30em) and (max-width:58.5em)", // min-width: 480px and max-width: 1024px.
    tabletOnly = "(max-width: 58.5em)"; // max-width: 1023px.
    desktop = "(min-width: 64em)"; // min-width: 1024px.
  // Add  functionality here.

  // Show hidden function.
  var showHiddenFunction = function (btn, flag, clickOutside, dropDown, childSelector) {
    var $btn = btn,
        $parent = $btn.parent(),
        $childSelector = childSelector;
    dropDown = dropDown === true ? true : false;
    clickOutside = clickOutside === false ? false : true;
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

  // Subdomain navigation for responsive
  var showNavFlag = 'show-nav-search'
      $subdomainNavSearch = $('.js-subdomain-nav-search'),
      $subdomainNavSearchBtn = $('.subdomain-nav-search__btn', $subdomainNavSearch);
      $subdomainNavSearchCloseBtn = $('.subdomain-nav-search__close-btn', $subdomainNavSearch);
  $subdomainNavSearchBtn.each(function(index, el) {
    var $this = $(this);
    showHiddenFunction($this, showNavFlag, true, false);
  });
  $subdomainNavSearchCloseBtn.on('click', function (e) {
    var $parent = $(this).closest('.js-subdomain-nav-search');
    $('.subdomain-nav-search__btn', $parent).trigger('click');
  });
  // Extended menu
  var showMainMenuFlag = 'show-child-menu',
      $jsExpandedMenu = $('.js-expanded-menu'),
      $jsExpandedMenuBtn = $('.expanded-menu__btn', $jsExpandedMenu);
  $jsExpandedMenuBtn.each(function(index, el) {
    var $this = $(this),
        $parent = $this.closest('.expanded-menu'),
        $childMenu = $parent.find('> .expanded-menu__menu-child');
    showHiddenFunction($this, showMainMenuFlag, true, true, $childMenu);
  });
  // Reset subdomain header when window resize
  var resetSudomainHeader = function () {
        var $expandedMenuMenuChild = $('.expanded-menu__menu-child', $subdomainNavSearch);
        $expandedMenuMenuChild.removeAttr('style');
      };
  enquire.register(desktop, {
    //Match this case
    match: function () {
      resetSudomainHeader();
    },
    unmatch: function () {
      resetSudomainHeader();
    },
  });
  // Subdomain navigation in responsive,
  // when resize screen or text right header is big,
  // Will reset padding top of page-wrapper.
  var $subdomainHeader = $('.subdomain-header'),
      $subdomainLogo = $('.subdomain-logo', $subdomainHeader),
      $subdomainLogoLeft = $('.subdomain-logo__left', $subdomainHeader),
      $subdomainLogoRight = $('.subdomain-logo__right', $subdomainHeader),
      $pageWrapper = $subdomainHeader.closest('.page-wrapper'),
      resetPageWrapper = function () {
        var screen = $(window).width(),
            heightHeader;
        if (screen > 1023) {
          $pageWrapper.removeAttr('style');
        }
        else {
          // 64 is hight of subdomain-logo__left when don't scroll, has css height: 64px;
          heightHeader = $subdomainLogoRight.outerHeight() + 64;
          $pageWrapper.css('padding-top', heightHeader + 'px');
        }
      };
  resetPageWrapper();

  // $('.block-search .form-item-search-block-form').before('<div class="search-icon"></div>');

  var $header = $('.js-header'),
  $header_top = $('.js-header__top'),
  $header_nav = $('.js-header__nav'),
  $push_menu = $('.js-push-menu'),
  $box_nav = $('.box-nav'),
  $back_top = $('.js-back-top'),
  bodyMenuFlag = 'show-menu',
  $body = $('body'),
  $scrollDown = $('.js-scroll-down'),
  scrollHeaderFlag = 'header--scroll',
  $searchIcon = $('.search-icon'),
  $searchBox = $('.search-box'),
  searchFlag = 'search-box--show',
  $searchBoxInput = $('.form-text', $searchBox),
  searchIconFlag = 'search-icon--active',

  scrollHeader = function (e) {
    e.preventDefault();
    var $this = $(this),
      scrollTop = $this.scrollTop(),
      heightBeginEffect = 100;
    if (scrollTop > heightBeginEffect && !$header.hasClass(scrollHeaderFlag) ) {
      $header.addClass(scrollHeaderFlag);
      $header_top.addClass(scrollHeaderFlag);
    }
    else if (scrollTop < heightBeginEffect && $header.hasClass(scrollHeaderFlag)) {
      $header.removeClass(scrollHeaderFlag);
      $header_top.removeClass(scrollHeaderFlag);
    }
  },

  showHidenMenu = function (e) {
    if (!$body.hasClass(bodyMenuFlag)) {
      $body.addClass(bodyMenuFlag);
    }
    else {
      $body.removeClass(bodyMenuFlag);
    }
  };

  backToTop = function (e) {
    $('body,html').animate({
      scrollTop: 0
    }, 1200);
  },

  scrollDown = function (e) {
    var thisTop = $(this).closest('.box-scroll--wrapper').offset().top;
    $('body,html').animate({
      scrollTop: thisTop - 50
    }, 500);
  };

  // Process close search form.

  $searchIcon.on('click', function (e) {
    $searchBox.toggleClass(searchFlag);
    $searchIcon.toggleClass(searchIconFlag);
  });

  $(document).on('touchstart click', function (e) {
    if ($searchBox.has(e.target).length === 0 && $searchIcon.has(e.target).length === 0) {
      $searchBoxInput.blur();
      $searchBox.removeClass(searchFlag);
      $searchIcon.removeClass(searchIconFlag);
    }
  });

  $(window).on('scroll', scrollHeader);

  // Scroll animate.
  var $subdomainHeaderSticky = $('.subdomain-header-sticky'),
      scrollAnimate = function () {
      var idActive = $(this).attr('href'),
          heightHeader,
          scrollTop;
      if ($subdomainHeader.length) {
        heightHeader = !$subdomainHeaderSticky.length
            ? $subdomainLogo.height()
            : ($subdomainLogo.height() + $subdomainHeaderSticky.height());
      } else {
        heightHeader = !$subdomainHeaderSticky.length
            ? $header_nav.height()
            : ($header_nav.height() + $subdomainHeaderSticky.height());
      }

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

  $('.js-stats-counter').counterUp({
    delay: 10,
    time: 1000
  });

  enquire.register(desktop, {
    //Match this case
    match: function () {
      var $carouselSlick = $('.js-stats-carousel');
      if($carouselSlick.hasClass('slick-initialized')) {
        $carouselSlick.slick("unslick");
      }
    },
    unmatch: function () {
    },
  });

  // Process click for menu hamburger button in responsive.
  $push_menu.on('click', showHidenMenu);

  // Process click for icon back to top icon in responsve.
  // $back_top.on('click', backToTop);

  $scrollDown.on('click', scrollDown);

  // Sliders default options.
  var streamSlickOptions = {
    infinite: true,
    speed: 1200,
    slidesToShow: 2,
    centerMode: true,
    variableWidth: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
          dots: true,
        }
      }
    ]
  };

    // Config caurousel slick for block grid mosaic.
  $('.js-block-mosaic__carousel').slick(streamSlickOptions);

  function func_resize(){
    var width = window.innerWidth || document.documentElement.clientWidth,
    boxedText = $('.boxed-text'),
    $carouselSlick = $('.js-stats-carousel'),
    $verticalListItem = $('.vertical-tabs__text');

    $('.js-boxed-text__item').removeAttr('style');

    // Tabs Js
    if(width > 1023) {
      boxedText.each(function () {
        $(this).find('.js-boxed-text__item').equalHeights();
      });

      if($carouselSlick.hasClass('slick-initialized')) {
        $carouselSlick.slick("unslick");
      }
    }
    else {
      $carouselSlick.not('.slick-initialized').slick({
        arrows: true,
        dots: false,
        infinite: false,
        mobileFirst: true,
        slidesToScroll: 2,
        slidesToShow: 2,
        speed: 300,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }
        ]
      });
    }

    if (width < 768) {
      $verticalListItem.removeAttr('style');
    }
    else {
      $('.vertical-tabs__list').each(function() {
        $(this).find('.vertical-tabs__text').matchHeight();
      });
    }
  }

  func_resize();

  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      func_resize();
      resetPageWrapper();
    }, 250);
  });

  // Js for fsird tabs.
  var jsfsirdTabs = function (e) {
    e.preventDefault();
    var $this = $(this),
      $fsirdTabs = $this.parents('.fsird-tabs'),
      $fsirdListItem = $('.fsird-tabs__list__item', $fsirdTabs),
      $fsirdList = $('.fsird-tabs__list__dropdown', $fsirdTabs),
      $fsirdSectionItem = $('.fsird-tabs__content', $fsirdTabs),
      $fsirdText = $('.fsird-tabs__dropdown__text', $fsirdTabs),
      tabIndex = $(this).data("index");

    $fsirdListItem.removeClass('active');
    $fsirdText.removeClass('active');
    $fsirdSectionItem.removeClass('active');
    $fsirdListItem.eq(tabIndex).addClass('active');
    $fsirdSectionItem.eq(tabIndex).addClass('active');
    $fsirdSectionItem.eq(tabIndex).find('.vertical-tabs__text').matchHeight();
    $fsirdList.removeClass('active');
    $fsirdText.text(function() {
      return $this.text();
    });
  };
  $('.js-fsird-tabs__list__item').on('click', jsfsirdTabs);

  var tabsDropDown = function (e) {
    e.preventDefault();
    var $this = $(this),
    $fsirdTabs = $this.parents('.fsird-tabs'),
    $fsirdList = $('.fsird-tabs__list__dropdown', $fsirdTabs),
    $fsirdText = $('.fsird-tabs__dropdown__text', $fsirdTabs);
    $fsirdList.toggleClass('active');
    $(this).toggleClass('active');
  };
  $('.js-fsird-tabs__dropdown').on('click', tabsDropDown);

  // Carousel Banner
  var carouselBanner = $('.js-carousel-banner');
  carouselBanner.not('.slick-initialized').slick({
    arrows: true,
    dots: false,
    infinite: false,
  });

  // js-play-video
  var $jsPlayVideo = $('.js-play-video'),
      playVideo = function (e) {
    var $iframeVimeo = $(this).find('.vimeo-video'),
        $iframeYoutube = $(this).find('.youtube-video');
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
    $jsPlayVideo.find('.youtube-video').each(function () {
      var srcYoutube = $(this).attr('src');
      if (srcYoutube.indexOf('enablejsapi=1') < 0) {
        srcYoutube = srcYoutube + '&enablejsapi=1';
        $(this).attr('src',srcYoutube);
      }
    });
    $jsPlayVideo.on('click', playVideo);
  }

  // Dropdown function
  var dropDownText = 'show-dropdown-filter',
    $dropDownText = $('.js-dropdown-filter__text');
    $dropDownText.each(function(index, el) {
      var $this = $(this);
      showHiddenFunction($this, dropDownText, true, false);
    });

  var dropDownSelect = function (e) {
    e.preventDefault();
    var $dropDownList = $(this).parents(''),
      $dropDownText = $dropDownList.prev('.dropdown-filter__text');
    $dropDownList.removeClass('show-dropdown-filter');
    $dropDownText.text($(this).text());
  };
  $('.js-dropdown-filter__item').on('click', dropDownSelect);

  Drupal.behaviors.scrollToTop = {
    attach: function(context, settings) {
      $('a.back-to-top').click(function(e) {
        $('html,body').stop().animate({
          scrollTop: 0
        }, 800);
        e.preventDefault();
      });
    }
  };

}(this, this.document, this.jQuery));
