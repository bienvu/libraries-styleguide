/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.
  // Show hide function.
  var showhideFunction = function (btn, flag) {
      var $btn = btn,
        $parent = $btn.parents('.header');

      $(document).on('touchstart click', function (e) {
        if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
          $parent.removeClass(flag);
          $('body').removeClass(flag);
        }
      });

      $btn.on('click', function () {
        if (!$parent.hasClass(flag)) {
          $parent.addClass(flag);
          $('body').addClass(flag);
        }
        else {
          $parent.removeClass(flag);
          $('body').removeClass(flag);
        }
      });
    };
    var openFlag = 'is-active',
      $open = $('.js-toggle-menu');
    showhideFunction($open, openFlag);

  // Config slider slick for feature slider.
  var jsSlider = $(".js-slider"),
      itemSlider = $(".js-slider-items", jsSlider),
      jsSlideOption = {
        dots: false,
        arrows: true,
        prevArrow: "<a href='#' class='btn slick-prev'>Prev</a>",
        nextArrow: "<a href='#' class='btn slick-next'>Next</a>"
      };
  itemSlider.slick(jsSlideOption);

  // Config slider slick for feature image 5.
  var jsSliderPhoto = $(".js-slider-photo"),
      jsSliderQuote = $(".js-slide-quote"),
      jslightBox = $(".js-lightbox"),
      jsSliderPhotoOption = {
        draggable: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: "<a href='#' class='btn slick-prev'>Prev</a>",
        nextArrow: "<a href='#' class='btn slick-next'>Next</a>",
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              draggable: true,
              arrows: false
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
        adaptiveHeight: true
      },
      photoLightboxConfig = {
       src: 'data-src',
       itemSelector: '.image-data'
     };

  jsSliderPhoto.slick(jsSliderPhotoOption);
  jsSliderQuote.slick(boxQuoteSlideConfig);
  jslightBox.slickLightbox(photoLightboxConfig);


  // Handle to mute video embed.
  var $jsMuteVideo = $('.js-mute-video');
      $iframeYoutubeEmbedMute = $('.youtube-embed', $jsMuteVideo);
      $iframeVimeoEmbedMute = $('.vimeo-embed', $jsMuteVideo);
  // API youtube embed is ready
  var onYouTubeIframeAPIReady = function() {
    var url = '//www.youtube.com/iframe_api?ver=8.2.1';
    $.getScript( url, function() {
      $iframeYoutubeEmbedMute.each(function(){
        var $this = $(this),
            player = new YT.Player($this[0], {
              events: {
                onReady: function(){
                  player.mute();
                  if ($this.is(':appeared')) {
                    $this[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
                  }
                }
              }
            });
      });
    });
  };
  onYouTubeIframeAPIReady();
  // API vimeo embed is ready
  var onVimeoIframeAPIReady = function() {
    var player = new Froogaloop($iframeVimeoEmbedMute[0]);

    player.addEvent('ready', function() {
      $iframeVimeoEmbedMute.each(function () {
        var $this = $(this);
        if ($this.is(':appeared')) {
          var playerAppearedVimeo = new Froogaloop($this[0]);
          playerAppearedVimeo.api('play');
          playerAppearedVimeo.api('setVolume', 0);
        }
      });
    });
  };
  onVimeoIframeAPIReady();
  // Scroll If youtube and vimeo appear, will play them.
  // If don't appear, will pause them.
  var scrollPlayVideoEmbed = function () {
    $iframeYoutubeEmbedMute.each(function () {
      var $this = $(this);
      if ($this.is(':appeared')) {
        $this[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
      }
      else {
        $this[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    });
    $iframeVimeoEmbedMute.each(function () {
      var $this = $(this),
          player = Froogaloop($this[0]);;
      if ($this.is(':appeared')) {
        player.api('play');
        player.api('setVolume', 0);
      }
      else {
        player.api('pause');
      }
    });
  };
  $(window).scroll(function () {
    scrollPlayVideoEmbed();
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

  // Js lightbox.
  $('.js-lightbox-gallery').lightGallery();

  // Scroll bar and height title
  var $jsContentGridImage = $(".js-content"),
      $hasContent = $(".has-content"),
      $jsHeading = $('.js-heading'),

    heightTitlePosition = function () {
      $jsHeading.each(function(){
        var $heightHeading = $(this).height() + 18;
        $(this).parents('.js-content').css({
          "marginBottom": $heightHeading
        });
      });
    }
  if($hasContent.length) {
    $hasContent.mCustomScrollbar({
      theme:"dark-thin",
      autoHideScrollbar:true
    });
  }

  var lazyHeight = _.debounce(function() {
    heightTitlePosition();
  }, 100);
  $(window).load(lazyHeight);
  $(window).resize(lazyHeight);

  // Grid masonry.
  var $gridMasonry = $('.js-grid-masonry'),
    gridMasonry = function() {
      $gridMasonry.imagesLoaded(function(){
        $gridMasonry.masonry({
          itemSelector: '.js-item',
          isAnimated: !Modernizr.csstransitions,
          resize: true,
          horizontalOrder: true
        });
      });
    }

  $( window ).load(function() {
    gridMasonry();
  });

  // Scroll appear
  var scrollAppear = function () {
    $('.js-scroll-appear').each(function (i) {
      var $this = $(this),
          animatedClasses = 'animated ' + $this.data('scroll-appear');

      if ($this.is(':appeared')) {
        $this.addClass(animatedClasses);

        _.debounce(function() {
          $this.removeClass('js-scroll-appear ' + animatedClasses);
        }, 800);
      }
    });
  };
  scrollAppear();
  $(window).scroll(function () {
    scrollAppear();
  });

  // Config slider slick for feature slider.
  var $jsFeaturedSlider1 = $(".js-featured-slider-1"),
      featuredSlider1Option = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: "<a href='#' class='btn slick-prev'>Prev</a>",
        nextArrow: "<a href='#' class='btn slick-next'>Next</a>"
      };
  $jsFeaturedSlider1.slick(featuredSlider1Option);

  // Iframe youtube
  var videoEmbedIframe = function (source) {
      var $source = source;

    $source.each(function() {
      var $parentIframe = $(this).parent();

      if (!$parentIframe.hasClass('video-wrap')) {
        $(this).wrap("<div class='video-wrap is-iframe-embed'></div>");
      }
    });
  };

  var $youtubeSource = $('iframe[src*="youtube.com"]'),
    $tubeSource = $('iframe[src*="youtu.be"]'),
    $vimeoSource = $('iframe[src*="vimeo.com"]');
  videoEmbedIframe($youtubeSource);
  videoEmbedIframe($tubeSource);
  videoEmbedIframe($vimeoSource);
}(this, this.document, this.jQuery));
