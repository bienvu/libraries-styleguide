/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Show hide menu.
  var showHiddenFunction = function(show, hide, direction) {
    var $show = show,
        $hide = hide,
        $direction = direction;
    $show.on('click', function () {
      $direction.addClass('is-active');
      $(this).parents('body').addClass('overlay');
    });
    $hide.on('click', function () {
      $direction.removeClass('is-active');
      $(this).parents('body').removeClass('overlay');
    });
  };

  var $jsShow = $('.js-open-nav'),
      $jsHide = $('.js-close-nav');
      $jsDirection = $('.js-header-nav');
  showHiddenFunction($jsShow, $jsHide, $jsDirection);

  $(document).on('touchstart click', function (e) {
    if (!$('.js-header-nav').is(e.target) && $('.js-header-nav').has(e.target).length === 0 && !$('.js-open-nav').is(e.target) && $('.js-open-nav').has(e.target).length === 0) {
      $('.js-header-nav').removeClass('is-active');
      $('body').removeClass('overlay');
    }
  });

  // Js slide
  var $profileSlide = $(".js-profile-slide"),
      $profileSlideNav = $(".js-profile-slide-nav"),
      $photoSlide = $(".js-slide"),
      $lightBox = $(".js-lightbox"),
      $lightBoxOnlyMobile = $(".js-lightbox-onlyMobile"),
      $profileSlideConfig = {
        arrows: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2500,
        variableWidth: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: '.js-profile-slide-nav',
        centerMode: true,
      },
      $profileSlideNavConfig = {
        arrows: true,
        slidesToShow: 11,
        slidesToScroll: 11,
        asNavFor: '.js-profile-slide',
        focusOnSelect: true
      },
      $photoSlideConfig = {
        arrows: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2500,
        variableWidth: true,
        slidesToShow: 4,
        slidesToScroll: 1
      },
      photoLightboxConfig = {
       src: 'src',
       itemSelector: 'img'
     };

  $photoSlide.slick($photoSlideConfig);
  $profileSlide.slick($profileSlideConfig);
  $profileSlideNav.slick($profileSlideNavConfig);
  $lightBox.slickLightbox(photoLightboxConfig);

  enquire.register(mobileOnly, {
    match: function () {
      $profileSlide.slick('unslick');
      $profileSlideNav.slick('unslick');
      $lightBoxOnlyMobile.slickLightbox(photoLightboxConfig);
    },
    unmatch : function () {
      $profileSlide.slick($profileSlideConfig);
      $profileSlideNav.slick($profileSlideNavConfig);
      $lightBoxOnlyMobile.unslickLightbox(photoLightboxConfig);
    }
  });

  // Js back to top.
  var $scrollTop = $('.js-scroll-top'),
      $scrollTopLink = $('.js-scroll-top a');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $scrollTop.fadeIn();
    } else {
      $scrollTop.fadeOut();
    }
  });

  // Scroll to top.
  $scrollTopLink.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  //js accordion
  var accordionFunction = function(classItem, childSelector) {
    var $item = classItem;
    $item.on('click', function () {
      var $this = $(this);
          $childSelector = $this.find(childSelector);
      if (!$this.hasClass('is-active')) {
        $this.addClass('is-active');
        $childSelector.addClass('is-active');
        $childSelector.slideDown("slow");
      }
      else {
        $this.removeClass('is-active');
        $childSelector.removeClass('is-active');
        $childSelector.slideUp("slow");
      }
    });
  };

  var $classItem = $('.js-slideToggle'),
      $childSelector = $('.js-slideToggle-child');
  accordionFunction($classItem,$childSelector);

}(this, this.document, this.jQuery));
