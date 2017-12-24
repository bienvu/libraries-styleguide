/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
    var mobileOnly = "screen and (max-width:47.9375em)", // 767px.
        mobileTabletOnly = "screen and (max-width:73.6875em)", // // max-width: 1179px
        tabletOnly = "screen and (max-width: 73.6875em) and (min-width: 48em)", // min-width: 768px and max-width: 1180px.
        mobileLandscape = "(min-width:30em)", // 480px.
        tablet = "(min-width:48em)"; // 768px.
        desktop = "(min-width:73.75em)"; // 1180px.

    $("select").chosen();

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

    var classMode = 'sticky',
    stickyFunctional = function () {
      if ($(window).scrollTop() > 0) {
        $header.addClass(classMode);
      } else {
        $header.removeClass(classMode);
      }
    };
    $(window).on('scroll', stickyFunctional).resize();

    enquire.register(mobileTabletOnly, {
        match: function () {
            resetClassHeader();
            $('.js-responsive-icons > a').on('click', jsActiveMobileMenu);
            $('.js-expanded-menu').on('click', jsDropDownMenu);
            $header.removeClass(classMode);
        },
        unmatch : function () {
            resetClassHeader();
            $('.js-responsive-icons > a').off('click', jsActiveMobileMenu);
            $('.js-expanded-menu').off('click', jsDropDownMenu);
            $(window).on('scroll', stickyFunctional).resize();
        }
    });

    $(document).on('touchstart click', function (e) {
      if (!$('.header').is(e.target) && $('.header').has(e.target).length === 0) {
        //$topSearchWrapper.removeClass(topSearchFlag);
        $('.header__navigation__right').removeClass('is-active');
        $('.expanded ul').removeClass('is-active');
        $('.expanded').removeClass('is-active');
        $('.js-expanded-menu').removeClass('open');
        $('.js-responsive-icons a').removeClass(activeResponsiveIcon);
      }
    });

    // Process when click responsive icon bar menu.
    // Show or hidden menu in the right on tablet only.
    var jsActiveTabletMenu = function(e) {
        var $this = $(this),
            $headerNavigation = $('.header__navigation__right');
        $headerNavigation.toggleClass(activeMenu);
        $('.expanded ul').removeClass('is-active');
        $('.expanded').removeClass('is-active');
        $('.js-expanded-menu').removeClass('open');

    };

    var jshideMenu = function(e) {
      $('.header__navigation__right').removeClass('is-active');
      $('.js-responsive-icons').removeClass('is-active');
      $('.js-responsive-icons a').removeClass(activeResponsiveIcon);
    };

    enquire.register(tabletOnly, {
        match: function () {
            resetClassHeader();
            $('.js-responsive-icons > a').on('click', jsActiveTabletMenu);
            $('.main-menu--left > .expanded .js-expanded-menu').on('click', jshideMenu);
        },
        unmatch : function () {
            resetClassHeader();
            $('.js-responsive-icons > a').off('click', jsActiveTabletMenu);
        }
    });


    // Switchable headings
    var strings = [Drupal.t("Inspired by you."), Drupal.t("Innovated by Abaxis"), Drupal.t("Abaxis Global Diagnostics")],
        $rotate_item = $(".js-switchable-headings h2");

    function rotateHeadings() {
        var ct = $rotate_item.data("string") || 0;

        $rotate_item.data("string",
            ct == strings.length -1 ? 0 : ct + 1)
            .text(strings[ct])
            .fadeIn().delay(4000).fadeOut(200, rotateHeadings);
    }

    rotateHeadings();

}(this, this.document, this.jQuery));
