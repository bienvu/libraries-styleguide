(function (window, document, $) {

  Drupal.behaviors.aopen_framework = {
    attach: function(context, settings) {
      var dSettings = Drupal.settings;
      if (dSettings.aopen_framework != undefined) {
        x = (dSettings.aopen_framework != undefined) ? dSettings.aopen_framework.all_domains : '';
        if (x != '') {

          console.log(x);

        }
      }


      // expandable filter for country page
      $expandDiv = $(".region-topic-search-expandable-block");
      $($expandDiv).hide();
      $('.topic-search-expandable-block-button').click(function() {
        $($expandDiv).slideToggle("slow");
      });

      // Open all external links in a new tab apart from a domain.
      $("a[href^=http]").each(function() {

        // Excluded domains list.
        var excludes = [
          'fsi.fsi.wearepropeople.md', 'fsi.stanford.edu', 'fsi.wearepropeople.md',
          'aparc.fsi.wearepropeople.md', 'aparc.stanford.edu',
          'aparcfellows.fsi.wearepropeople.md', 'aparcfellows.stanford.edu',
          'corporateaffiliates.fsi.wearepropeople.md', 'corporateaffiliates.stanford.edu',
          'arabreform.fsi.wearepropeople.md', 'arabreform.stanford.edu',
          'asiahealthpolicy.fsi.wearepropeople.md', 'asiahealthpolicy.stanford.edu',
          'bcc.fsi.wearepropeople.md', 'bcc.stanford.edu',
          'cddrl.fsi.wearepropeople.md', 'cddrl.stanford.edu',
          'chinaprogram.fsi.wearepropeople.md', 'chinaprogram.stanford.edu',
          'cisac.fsi.wearepropeople.md', 'cisac.stanford.edu',
          'crimelab.fsi.wearepropeople.md', 'crimelab.stanford.edu',
          'dhsfp.fsi.wearepropeople.md', 'dhsfp.stanford.edu',
          'draperhills.fsi.wearepropeople.md', 'draperhills.stanford.edu',
          'summerfellows.fsi.wearepropeople.md', 'summerfellows.stanford.edu',
          'emf.fsi.wearepropeople.md', 'emf.stanford.edu',
          'europe.fsi.wearepropeople.md', 'europe.stanford.edu',
          'foodsecurity.fsi.wearepropeople.md', 'foodsecurity.stanford.edu',
          'fse.fsi.wearepropeople.md', 'fse.stanford.edu',
          'globaljustice.fsi.wearepropeople.md', 'globaljustice.stanford.edu',
          'globalunderdevelopment.fsi.wearepropeople.md', 'globalunderdevelopment.stanford.edu',
          'governance.fsi.wearepropeople.md', 'governance.stanford.edu',
          'governanceproject.fsi.wearepropeople.md', 'governanceproject.stanford.edu',
          'healthpolicy.fsi.wearepropeople.md', 'healthpolicy.stanford.edu',
          'humanrights.fsi.wearepropeople.md', 'humanrights.stanford.edu',
          'jsp.fsi.wearepropeople.md', 'jsp.stanford.edu',
          'japan.fsi.wearepropeople.md', 'japan.stanford.edu',
          'ksp.fsi.wearepropeople.md', 'ksp.stanford.edu',
          'liberationtechnology.fsi.wearepropeople.md', 'liberationtechnology.stanford.edu',
          'libtech.fsi.wearepropeople.md', 'libtech.stanford.edu',
          'pesd.fsi.wearepropeople.md', 'pesd.stanford.edu',
          'pgj.fsi.wearepropeople.md', 'pgj.stanford.edu',
          'povgov.fsi.wearepropeople.md', 'povgov.stanford.edu',
          'pse.fsi.wearepropeople.md', 'pse.stanford.edu',
          'reap.fsi.wearepropeople.md', 'reap.stanford.edu',
          'scpku.fsi.wearepropeople.md', 'scpku.stanford.edu',
          'seaf.fsi.wearepropeople.md', 'seaf.stanford.edu',
          'southeastasia.fsi.wearepropeople.md', 'southeastasia.stanford.edu',
          'shp.fsi.wearepropeople.md', 'shp.stanford.edu',
          'spice.fsi.wearepropeople.md', 'spice.stanford.edu',
          'sprie.fsi.wearepropeople.md', 'sprie.stanford.edu',
          'tec.fsi.wearepropeople.md', 'tec.stanford.edu'
        ];
        for (i = 0; i < excludes.length; i++) {
          if (this.href.indexOf(excludes[i]) != -1) {
            return true; // continue each() with next link
          }
        }

        if (this.href.indexOf(location.hostname) == -1) {
          // Attach a do-nothing event handler to ensure we can 'trigger' a click on this link.
          $(this).click(function() {
            return true;
          });

          // Added an exception for links from second red header.
          if (!$(this).hasClass('self_page')) {
            $(this).attr({
              target: "_blank"
                      // title: "Opens in a new window"
            });
          }

          $(this).click(); // trigger it
        }
      }); // End with opening of all external links in a new tab.

      // Wrap the second part of people titles (after comma) to be italic.
      $('.panel-col .views-row .views-field-field-text-multiple-3 li a, .panel-col .views-row .views-field-field-text-multiple-3-1 li a, .publication-item-page .views-row .views-field-field-text-multiple-3 li, .people-derictory-list .views-field-field-text-multiple-3 li, .people-derictory-list .views-field-field-short-title .field-content, .views-row .views-field-field-text-multiple-3-1 .field-content li a, #node_people_base_list_group_right_side .field-name-field-text-multiple-3 .field-items div, .field-name-field-text-multiple-4 .field-items div, .views-field-field-text-multiple-4 div li, .people-base-wrapper .field-name-field-short-title .field-item.even, .all-faculty-top .views-field-field-short-title .field-content a, .people-derictory-list .panel-col-last ul li, .views-field-field-short-title div.field-content').each(function() {
        title = $(this).html();
        var res = title.split(',');
        res[0] = '<span>' + res[0] + '</span>';
        /*res[1] = '<span class="italic">' + res[1] + '</span>';
         res[2] = '<span class="italic">' + res[2] + '</span>';
         res[3] = '<span class="italic">' + res[3] + '</span>';
         res[4] = '<span class="italic">' + res[4] + '</span>';*/
        $(this).html(res.join(','));
      });
      //$('.field-item span:empty').parent().remove();
    }
  }
  // Hide top landing slider if any filter is selected.
  //    Drupal.behaviors.hide_slider = {
  //      attach: function(context, settings) {
  //        $('.views-exposed-widget select').each(function(index) {
  //          // Check for dropdowns.
  //          var keys = $('.views-exposed-widget input[name="keyword"]').val();
  //          if ($(this).find(":selected").val() !== 'All' || keys) {
  //            $('.hidden-carousel-slider').hide();
  //          }
  //        });
  //
  //        $('.page-publications, .page-news, .page-events, .page-multimedia').find('[class*="views-exposed-form"] .form-submit').click(function() {
  //          if ($("#edit-keys").attr("value")) {
  //            $('.hidden-carousel-slider').hide();
  //          }
  //        });
  //      }
  //    }

Drupal.behaviors.flexslider = {
  attach: function(context, settings) {
    if (($('.bcc_frontpage').length > 0) || ($('.page-news').length > 0) || ($('.page-catalog').length > 0) || ($('.page-events-base').length > 0) || ($('.page-multimedia').length > 0) || ($('.subdomain-chppcor.front').length > 0) || ($('.subdomain-libtech.front').length > 0) || ($('.publications-page-base').length > 0))  {

      jQuery = jQuery.noConflict();

      $(window).load(function() {
        $('.flexslider').flexslider({
          animation: "slide",
          selector: ".slider-container > li.slide",
          directionNav: false,
          smoothHeight: false
        });
        $('.flexslider-carousel').flexslider({
          animation: "slide",
          selector: ".slider-container > li.slide",
          directionNav: true,
          smoothHeight: true,
          itemWidth: 240
        });
        $('.people-carousel').flexslider({
          animation: "slide",
          selector: ".slider-container > li.slide",
          directionNav: true,
          smoothHeight: false,
          itemWidth: 180,
          maxItems: 4,
          move: 1
        });
      });
    }
  }
}

  Drupal.behaviors.hide_people_filter = {
    attach: function(context, settings) {

      // Hide The filters when User hit to show results.
      var filters = $('.views-exposed-form');
      if ($('.pane-content .refine-view .view-content').length) {
        // Build "Refine Search button".
        $('.people-active-menu-title').parent().append('<div class="refine">' + Drupal.t('Refine Search') + '</div>');

        // Action on Refine link hit.
        filters.hide();
        $('.refine').click(function(e) {
          $(filters).slideToggle(200);
          e.preventDefault();
        });
      } else {
        // Hide refine link, and show filters (just in case).
        $('.refine').hide();
        filters.show();
      }
    }
  }

  Drupal.behaviors.menuDropDown = {
    attach: function(context, settings) {
      var isMenuInline;
      // expandable filter for country page
      //if ($(window).width() > /*767*/979) {
      var expandMenu = function(menu, dropdown) {
        var $mainMenu = menu,
                $mainDropdown = dropdown,
                $menuItems = $mainMenu.find('li.depth-1'),
                activeClass = 'is-active',
                isMenuInline = true;

        if (!$mainMenu.hasClass('dropdown-menu-processed')) {
          $mainMenu.addClass('dropdown-menu-processed');
          for (var i = 0, len = $menuItems.length; i < len; i++) {
            var $this = $($menuItems[i]);
            $this.attr('data-pane', i);

            if (isMenuInline) {
              $this.unbind('mouseenter').bind('mouseenter', function(e) {
                menufunc($(this), 1);
                e.preventDefault();
              });
              $this.bind('mouseleave', function(e) {
                menufunc($(this), 0);
                e.preventDefault();
              });
            }
          }

          $(window).resize(function() {
            if ($(window).width() > 760) {
              isMenuInline = true;
            } else {
              for (var i = 0, len = $menuItems.length; i < len; i++) {
                var $this = $($menuItems[i]);
                isMenuInline = false;
                $this.unbind('mouseenter');
                $this.unbind('mouseleave');
              }
            }
            if (isMenuInline) {
              for (var i = 0, len = $menuItems.length; i < len; i++) {
                var $this = $($menuItems[i]);
                $this.unbind('mouseenter').bind('mouseenter', function(e) {
                  menufunc($(this), 1);
                  e.preventDefault();
                });
                $this.unbind('mouseleave').bind('mouseleave', function(e) {
                  menufunc($(this), 0);
                  e.preventDefault();
                });
              }
            }
          });
        }

        var menufunc = function(ths, a) {
          var _this = ths,
                  currentId = +_this.attr('data-pane') + 1,
                  $currentDropdown = $mainDropdown.filter(function() {
                    return $(this).hasClass('menu-pane-' + currentId);
                  });
          _this.siblings().removeClass(activeClass);

          if (!a) {
            $mainDropdown.hide();
            //$currentDropdown.slideToggle(350);
            _this.removeClass(activeClass);
            return true;
          }

          _this.addClass(activeClass);
          if (_this.hasClass(activeClass)) {
            $mainDropdown.hide();
            $currentDropdown.slideToggle(250);
          } else {
            $currentDropdown.slideToggle(250);
          }
        }
      }

      if ($(window).width() > 760) {
        if ($('#main-menu').length) {
          expandMenu($('#main-menu').find('ul.menu'), $('.drop-content .drop-pane'));
        }
      }
    }
  }

  Drupal.behaviors.menuMobile = {
    attach: function(context, settings) {
      if (!$('body').hasClass('mobile-menu-processed')) {
        // Process only once.
        $('body').addClass('mobile-menu-processed');
        var $menuToggleButton = $('.btn.btn-navbar');
        var $menu = $('.nav-collapse ul.nav');
        var $dropDowns = $('section.drop-content .drop-pane');

        // Toggle menu on click(tap).
        $menuToggleButton.click(function() {
          $menu.slideToggle(function() {
            // ss start
            // Close all submenus
            $(this).children('.depth-1').each(function() {
              if ($(this).hasClass('is-active')) {
                $(this).removeClass('is-active');
                $(this).children('.content').hide().removeAttr('style');
              }
            });
          });
        });

        // Show menu if resize window && if menu isn't collapsed
        var menuToggleTimer;
        $(window).resize(function() {
          clearTimeout(menuToggleTimer);
          menuToggleTimer = setTimeout(function() {
            if ($(window).width() > 979) {
              $('.nav-collapse ul.nav').removeAttr('style');
            }
            if ($('body').hasClass('page-news')) {
              var maxHeight = -1;
              $('.views-slideshow-cycle-main-frame-row-item').each(function() {
                 maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
               });
              $('.views-slideshow-cycle-main-frame').height(maxHeight);
            }
          }, 500);
        });

        // Append dropdown menus to main menu.
        for (var i = 0, len = $menu.children('li').length; i < len; i++) {
          var nextPane = i + 1;
          var dropDownName = '.menu-pane-' + nextPane;
          var $dropDownSingle = $(dropDownName);
          if ($dropDownSingle.length) {
            var $menuItemAppend = $menu.children('li').eq(i);
            $menuItemAppend.prepend('<div class="mobile-menu-toggle"><b></b></div>');
            $dropDownSingle.find('.content').find('ul').addClass('secondary-menu-nav').removeClass('menu nav');
            $dropDownSingle.find('.block-menu').clone().appendTo($menuItemAppend);
          }
        }

        // Open submenu - event action only on toggle-button
        $('.mobile-menu-toggle').click(function() {
          var $this = $(this);
          $this.parent().siblings().removeClass('is-active');
          $this.parent().siblings().children('.block-menu').slideUp();
          $this.parent().toggleClass('is-active');
          $this.siblings('.block-menu').slideToggle();
          if ($this.parent().children('.shopping-cart').length) {
            $this.trigger('click');
          }
        });

      }
    }
  }

  Drupal.behaviors.carouselTheming = {
    attach: function(context, settings) {
      if ($('.carousel').length > 0) {
        $('.carousel').carousel({
          interval: 2000
        });
      }
    }
  }

  Drupal.behaviors.customizePlaceholders = {
    attach: function(context, settings) {
      $(".page-user.page-user-password #user-pass .form-item-name").prepend( "<label>Enter a valid email address or username and we will send you a link to reset your password. </label>" );
      $(".page-user.page-user-password #user-pass label[for='edit-name']").text('E-mail address').hide();
      var textInput = $('input, textarea');
      // Add placeholders if they are missing
      textInput.each(function() {
        var $this = $(this);
        if ($this.attr('placeholder') == '' || $this.attr('placeholder') == undefined) {
          // Search label for the element
          $this.attr('placeholder', $.trim($("label[for='" + $this.attr('id') + "']").text()));
        }
      });
      $("[placeholder]").textPlaceholder();
    }
  }

  jQuery.fn.textPlaceholder = function() {

    return this.each(function() {

      var that = this;

      if (that.placeholder && 'placeholder' in document.createElement(that.tagName))
        return;

      var placeholder = that.getAttribute('placeholder');
      var input = jQuery(that);

      if (that.value === '' || that.value == placeholder) {
        input.addClass('text-placeholder');
        that.value = placeholder;
      }

      input.focus(function() {
        if (input.hasClass('text-placeholder')) {
          this.value = '';
          input.removeClass('text-placeholder')
        }
      });

      input.blur(function() {
        if (this.value === '') {
          input.addClass('text-placeholder');
          this.value = placeholder;
        } else {
          input.removeClass('text-placeholder');
        }
      });

      that.form && jQuery(that.form).submit(function() {
        if (input.hasClass('text-placeholder')) {
          that.value = '';
        }
      });

    });

  };
  Drupal.behaviors.chosenSelect = {
    attach: function(context, settings) {
      var chosenSelects = {
        items: $(),
        // Replace spaces and dashes in items.
        // Returns true when finished.
        itemSearch: function() {
          var items = $(this.items);
          for (var i = 0, len = items.length; i < len; i++) {
            var $this = $(items[i]);
            $this.text(this.removeSpaces($this.text()));
          }
          return true;
        },
        // Remove spaces and dashes in the begining of string.
        // Returns trimed string.
        // @str - string where to replace symbols.
        removeSpaces: function(str) {
          var timestr = str;
          while (1) {
            if (timestr[0] == ' ' || timestr[0] == '-') {
              timestr = timestr.substring(1);
            } else {
              break;
            }
          }
          return timestr;
        },
        // chosenSelects initialization function.
        // @a - selector string
        // @b - callback function
        init: function(a, b) {
          this.items = $(a);
          if (this.itemSearch()) {
            return b();
          }
        }
      }

      var $exposedWhite = $('.exposed-white');
      if ($exposedWhite.find('.form-select').length && !$exposedWhite.hasClass('exposed-processed')) {
        $exposedWhite.addClass('exposed-processed');
        //        $exposedWhite.bind('change', 'form-select', function() {
        //          $(this).find('.form-submit').click();
        //        });
      }
    }
  }

  Drupal.behaviors.selectIntoTabs = {
    attach: function(context, settings) {
      var selectToTabs = {
        select: $(),
        container: $(),
        items: [],
        // Fill items with text from options.
        makeItems: function() {
          for (var i = 0, len = this.select.find('option').length; i < len; i++) {
            var $this = this.select.find('option').eq(i);
            this.items[this.items.length] = $this.text();
          }
        },
        // Create Tabs Slider;
        // Returns html string of slider.
        maketabs: function() {
          var str = '<div class="tabs-slider tabs-slider-processed">' +
                  '<span class="tabs-slider-left"></span>' +
                  '<span class="tabs-slider-right"></span>' +
                  '<div class="tabs-slider-container">';
          for (var i = 0, len = this.items.length; i < len; i++) {
            str += '<span class="tabs-slider-item" data-val="' +
                    this.select.find('option').eq(i).val() + '">' +
                    this.items[i] + '</span>';
          }
          str += '</div></div>';
          return str;
        },
        // Adding functionality to Tabs Slider.
        fn: function() {
          var $tabsSlider = this.container.find('.tabs-slider'),
                  $tabsSliderItems = $tabsSlider.find('.tabs-slider-item');
          $tabsSlider.attr('data-total', $tabsSliderItems.length);
          $tabsSlider.attr('data-index', 0);
          $tabsSlider.attr('data-visible', 5);

          $tabsSliderItems.eq(0).addClass('active');

          $tabsSliderItems.click(function() {
            var $this = $(this),
                    $container = $this.closest('.pane-content'),
                    $select = $container.find('select');
            $this.removeClass('active').addClass('active');
            $this.siblings().removeClass('active');

            $select.val($this.attr('data-val'));
            $container.find('.form-submit').click();
          });

          if ($tabsSliderItems.length > 6) {
            $tabsSlider.addClass('show-arrows');
          }
        },
        sliderArrows: function() {
          var $tabSliderMove = $('.show-arrows'),
                  $tabSliderMoveLeft = $tabSliderMove.find('.tabs-slider-left');
          $tabSliderMoveRight = $tabSliderMove.find('.tabs-slider-right');

          $tabSliderMove.addClass('disabled-left');

          for (var i = 0, len = $tabSliderMove.length; i < len; i++) {
            var $this = $($tabSliderMove[i]);
            $this.find('.tabs-slider-item').filter(function(a) {
              return a < 5;
            }).css('display', 'inline-block');
          }

          $tabSliderMoveLeft.click(function() {
            var $this = $(this),
                    $container = $this.parent(),
                    current = $container.attr('data-index') | 0, // 0
                    visible = $container.attr('data-visible') | 0 // 5
            if (current > 0) {
              $container.removeClass('disabled-right');
              var prev = current - 1,
                      last = current + visible - 1;
              $container.attr('data-index', current - 1);
              $container.find('.tabs-slider-item').eq(prev).css('display', 'inline-block');
              $container.find('.tabs-slider-item').eq(last).hide();
              if (prev == 0) {
                $container.addClass('disabled-left');
              }
            }
          });

          $tabSliderMoveRight.click(function() {
            var $this = $(this),
                    $container = $this.parent(),
                    total = $container.attr('data-total') | 0, // 19
                    current = $container.attr('data-index') | 0, // 0
                    visible = $container.attr('data-visible') | 0, // 5
                    cango = total - visible - 1; // 19-5-1 = 13
            if (current <= cango) {
              $container.removeClass('disabled-left');
              var prev = current,
                      last = current + visible;
              $container.attr('data-index', current + 1);
              $container.find('.tabs-slider-item').eq(prev).hide();
              $container.find('.tabs-slider-item').eq(last).css('display', 'inline-block');
              if (last + 1 == total) {
                $container.addClass('disabled-right');
              }
            }
          });
        },
        execute: function() {
          // Fill items with options from select.
          this.makeItems();
          // Create slider with items.
          this.container.prepend(this.maketabs());
          // Add slider functionallity.
          this.fn();
          return true;
        },
        init: function(a, b) {
          this.select = $(a);
          this.container = $(this.select).closest('.pane-content');
          this.items = [];
          if (this.execute()) {
            if (typeof b !== 'undefined') {
              return b();
            }
          }
        }
      }

      if (!$('.tabs-slider-processed, .page-multimedia').length) {
        selectToTabs.init('.view-display-id-people_recent_publications select');
        selectToTabs.init('.views-widget-filter-field_media_type_value select');
        //, selectToTabs.sliderArrows
      }

    }
  }

  Drupal.behaviors.researchColumns = {
    attach: function(context, settings) {
      var makeColumns = {
        items: $(),
        qty: 1,
        createColumn: function() {
          var itemsLength = this.items.length;
          if (itemsLength) {
            var itemsInColumn = Math.ceil(itemsLength / this.qty),
                    columnWrapper = ['span12', 'span6', 'span4', 'span3', 'spanfive', 'span2'],
                    spanClass = '<li class="' + columnWrapper[this.qty - 1] + '"></li>';
            for (var i = 0; i < itemsLength; i += itemsInColumn) {
              this.items.slice(i, i + itemsInColumn).wrapAll(spanClass);
            }
            return true;
          } else {
            return false;
          }
        },
        init: function(a, qty, b) {
          this.items = $(a);
          this.qty = qty ? qty : 1;
          if (this.createColumn()) {
            if (typeof b !== 'undefined') {
              return b();
            }
          }
        }
      }
      //makeColumns.init('.region-country-page li', 4);

      var regionCountryPage = $('.region-country-page .span3');
      for (var i = 0; i < regionCountryPage.length; i += 4) {
        regionCountryPage.slice(i, i + 4).wrapAll("<div class='wrapper-four-elements clearfix'></div>");
      }
    }
  }

  /**
   * Close beautytip and other calendar manipulation
   */
Drupal.behaviors.beautytipsClose = {
  attach: function(context, settings) {
    $('.tooltip-wrapper').bind('click', function() {
      $('.bt-content .close-button').unbind('click').bind('click', function() {
        $(this).closest('div.monthview').find('div.contents').trigger('click');
      });
    });
    if ($('.calendar-calendar').length > 0) {
      $( "body" ).click(function() {
        if ($('.beautytips-module-processed.bt-active').length > 0) {
          $('.month-view').addClass('with-tooltip');
        } else {
          $('.month-view').removeClass('with-tooltip');
        }
      });
      if ($('.calendar-calendar').length > 0) {
        $( "body" ).click(function() {
          if ($('.beautytips-module-processed.bt-active').length > 0) {
            $('.month-view').addClass('with-tooltip');
          } else {
            $('.month-view').removeClass('with-tooltip');
          }
        });
      }
    }
    $('.calendar-calendar .year-view > table > tbody > tr > td:nth-child(2)').addClass('middle-column');
  }
}

  Drupal.behaviors.serifHeaderSubstr = {
    attach: function(context, settings) {

      $('.not-front .serif-header p:empty').remove();

      $('.not-front .serif-header p:last-child').addClass('last');

      $('.not-front .serif-header .pane-content').collapser({
        mode: 'lines',
        truncate: 3,
        speed: 'medium',
        effect: 'fade',
        ellipsis: '...',
        showText: 'Show More',
        hideText: 'Read Less',
        showClass: 'collapser-show-class',
        hideClass: 'collapser-hide-class'
      });

      $('.not-front .views-serif-header .pane-content .view-content').collapser({
        mode: 'lines',
        truncate: 3,
        speed: 'medium',
        effect: 'fade',
        ellipsis: '...',
        showText: 'Show More',
        hideText: 'Read Less',
        showClass: 'collapser-show-class',
        hideClass: 'collapser-hide-class'
      });
    }
  }

  Drupal.behaviors.removeEmptyImageDiv = {
    attach: function(context, settings) {
      $('.view-display-id-research_projects_by_organization .view-content .views-row').each(function() {
        if ($(this).find('.left-side').length == 0) {
          $(this).find('.right-side').css('margin-left', '0');
        }
      });
    }
  }

  Drupal.behaviors.removeEmptyInfoBlock = {
    attach: function(context, settings) {
      $('.node-type-publication .information-block').find('.span9 .field-item:empty').end().css('border', 'none');
    }
  }

  Drupal.behaviors.addClassToParentMenu = {
    attach: function(context, settings) {

      $(document).ready(function() {
        var pathname = window.location.pathname;
        if (pathname.indexOf('faculty') > -1) {
          $('.subdomain-fse #block-fsi-custom-rewrites-fsi-domain-menu ul.menu li a:contains(People)').addClass('active').parent().addClass('active');
        }
        if (($('.publications-page-base').length > 0) || ($('.page-news').length > 0)) {
          var maxHeight = -1;
          $('.views-slideshow-cycle-main-frame-row-item').each(function() {
             maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
           });
          $('.views-slideshow-cycle-main-frame').height(maxHeight);
        }
      });

    }
  }

  Drupal.behaviors.removeEmptyResearchFooter = {
    attach: function(context, settings) {
      if ($('.node-type-research .research-footer .view-content .views-row-first').length && !$('.node-type-research .research-footer .view-content .views-row-first').html().trim()) {
        $('.node-type-research .research-footer').remove();
      }
    }
  }

  Drupal.behaviors.removeLine = {
    attach: function(context, settings) {
      if ($('.node-type-research .publication-list').length == 1) {
        $('.node-type-research .publication-list').removeClass('border-bottom-gray');
      }
    }
  }

  Drupal.behaviors.research = {
    attach: function(context, settings) {
      $('.view-display-id-panel_pane_18 .views-field-field-related-authors-1 span').each(function() {
        // Correct publications author theming from research page.
        if ($(this).text().trim().length != 0) {
          $(this).prepend('-');
        }
      });
    }
  }
  Drupal.behaviors.aaCssHelper = {
    attach: function(context, settings) {
      $(".views-row .views-field-nothing span:empty").closest('.views-row').remove();

      $('#user-pass input, #edit-name').attr("placeholder", "E-mail address");

      $('#fsi-join-spice-subscription-form #edit-name').attr("placeholder", "Name");

      $('#edit-pass').attr('placeholder', '·························');

      $('.transcript-description-content:empty').closest('div.transcript-description-wrapp').hide();

      // Chosen refresh and date selected fix.
      if ($('.views-exposed-widget .form-type-select > div > select ').length > 0) {
        $('.views-exposed-widget .form-type-select').change(function() {
          $('.views-exposed-widget .form-type-select select ').trigger("chosen:updated");
        });
      }
    }
  }
  Drupal.behaviors.ifElementExists = {
    attach: function(context, settings) {
      var headerMobile = $('#header .row-fluid .span8');
      if (headerMobile.children().length === 0) {
        headerMobile.remove();
      }
      if ($('body').hasClass('node-type-multimedia') && $('.node-type-multimedia .panel-col-first iframe').length < 1) {
        $('.field-type-text-with-summary').css('padding-top', '20px')
      }
      if ($('.footer-social-media .views-row a .event_maillist').length > 0) {
        $('.footer-social-media').addClass('social-media-five-elements');
      }
      if ($('.basic-page-layout .span12 .span3').length < 1) {
        $('.basic-page-layout .span9').css('width', '100%');
      }
      if ($('body').hasClass('center-faculty') && $('.center-filed-all_faculty').length > 0) {
        $('.all-faculty-top').addClass('has-description');
      }
      if ($('body').hasClass('publications-page-base') && $('.bef-select-as-links').length > 0){
        $('.views-exposed-widget.views-submit-button').addClass('has-bef-select');
        $('.publication-list .view-header').prependTo( ".bef-select-as-links" );
      }
      if ($('.node-type-impact').length > 0) {
        $(".page-node-217349").addClass('diplomacy');
        $(this).find('label').remove();
        $('.impact-audio-player').each(function() {
          var $transcription = $(this).find('.impact-audio-transcription');
          $(this).find('b').click(function() {
            $transcription.hide();
          });
          $(this).find('label').click(function() {
            $transcription.show();
          });
        });
      }
      if ($('.page-research.page-research-search').length > 0) {
        $('.views-exposed-form input[type=hidden]').closest('.views-widget-filter-field_topics_tid, .views-widget-filter-field_regions_tid').remove();
      }
      if ($('.node-type-page') && $('.people-sub-menu').length > 0) {
        $('body').addClass("has-people-sub-menu");
      }
      $('.frame .span12:not(:has(div))').addClass("hide");

      if ($('.research-areas').length > 0) {
        $('.views-row').each(function() {
          $(this).has('img').addClass( "with-image" );
        });
      }
      if ($('.footer-social .views-row  a').length == 0) {
        $('.footer-social').addClass('no-links');
      }

      var epsaCropImg = $('img.file-crop-epsa-crop');
      var epsaCropImgWidth = $('img.file-crop-epsa-crop').attr('width');
      if ($('body').hasClass('node-type-document') && epsaCropImg.length > 0 && epsaCropImg.is("[width]")) {
        epsaCropImg.each(function () {
            this.style.setProperty( 'width', epsaCropImgWidth + 'px', 'important' );
        });
      }
    }
  }

  Drupal.behaviors.addClassHelper = {
    attach: function(context, settings) {
      $('.four-columns .views-row:nth-child(4n+1), .events-one-row .views-row:nth-child(4n+1)').addClass("fourth-element");
      $('.three-columns .views-row:nth-child(3n+1)').addClass("three-column-fourth-element");
      $('.research-areas .views-row:nth-child(5n+0)').addClass("fifth-element");

      $('.second-block').children().each(function(i) {
        $(this).addClass("item-" + (i + 1));
      });

      $('.pane-bundle-slideshow-fpp .slider-block, .pane-bundle-slideshow-fpp .first-block').children().each(function(i) {
        $(this).addClass("item-" + (i + 1));
      });

      $('.slider-block .pair-slide-block, .second-block, .publications-page-base .views-field-field-related-authors, .people-derictory-list,.node-type-webform .form-type-checkbox').addClass('clearfix');

      $('.slider-block .pair-slide-block > div:last-child').addClass('last');

      $('.slider-block .pair-slide-block > div:first-child').addClass('first');

      $('.research-programs .span6').eq(-2).addClass('before-last');

      $('#block-menu-menu-fsi-header-top-menu').find('a[href*="twitter"]').addClass('twitter');
      if ($('body.page-forum-researchers').length > 0) {

        $('.pane-forum-ahpp-researchers .view-content').find('.views-row:nth-child(3n+1)').addClass('third-element');

        if (document.location.href.search('forum/researchers') > -1) {
          $('.page-forum .region-content .pane-menu-ahpp-forum li.first').find('a').addClass('active');
        }
      }
    }
  }

Drupal.theme.prototype.slideshowResizer = function (target){
  var slideheight = 0;
  $(target + ' .views-slideshow-cycle-main-frame-row').each(function(){
    slideheight = $(this).find('.views-slideshow-cycle-main-frame-row-item').innerHeight();
    if(slideheight != 0){
      $(target + ' .views-slideshow-cycle-main-frame').css('height',slideheight+'px');
      $(target + ' .views-slideshow-cycle-main-frame-row').css('height',slideheight+'px');
      return false;
    }
  });
};

Drupal.behaviors.slideshowResize = {
  attach: function (context, settings) {
    $('.custom-slideshow', context).once('processed', function () {
      Drupal.theme('slideshowResizer', '.custom-slideshow');
    });

    $(window).resize( function() {
      Drupal.theme('slideshowResizer', '.custom-slideshow');
    });
  }
};

  Drupal.behaviors.aCalculateDropdownPadding = {
    attach: function(context, settings) {
      function aMainMenuPadding() {
        var navWidth = $('#main-menu .nav-collapse').width();
        var navLi = $('#block-fsi-custom-rewrites-fsi-domain-menu .menu.nav.dropdown-menu-processed > li');
        var navLiaAndSp = navLi.find('a, span').not('.text, .product-nr');
        var navLiAandSpan = $('#main-menu #block-fsi-custom-rewrites-fsi-domain-menu .menu.nav.dropdown-menu-processed > li > a, #main-menu #block-fsi-custom-rewrites-fsi-domain-menu .menu.nav.dropdown-menu-processed > li > span');
        var navLiW = $('#block-fsi-custom-rewrites-fsi-domain-menu .menu.nav.dropdown-menu-processed > li').find('a').width();
        var totalWidthLi = 0;

        navLiAandSpan.each(function() {
          totalWidthLi += $(this).width();
        });

        var widthDiff = navWidth - totalWidthLi;
        var liNumber = navLi.length;
        var eachLiDif = Math.round(widthDiff / liNumber / 2);
        navLiaAndSp.css({'padding-left': eachLiDif, 'padding-right': eachLiDif});
        var resizeTimer;
        $(window).resize(function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            if ($(window).width() > 760) {
              aMainMenuPadding();
            } else {
              navLi.find('a, span').not('.text, .product-nr').removeAttr('style');
            }
          }, 1000);
        });
      }

        function calcpadding() {
          if ($('.site-menu .block-fsi-custom-rewrites > .content > .menu li').length > 0) {
            var $siteMenu = $('.site-menu .block-fsi-custom-rewrites > .content > .menu'),
                    $mainMenu = $siteMenu.children('li'),
                    siteMenuOffset = $mainMenu.eq(0).offset().left;
            for (var i = 0, len = $mainMenu.length; i < len; i++) {
              var $this = $mainMenu.eq(i),
                      thisOffset = $this.offset().left,
                      offsetDiff = thisOffset - siteMenuOffset,
                      dropdownItem = i + 1,
                      paddingLeft = 0;
              if (i > 0) {
                /*offsetDiff += parseInt($mainMenu.eq(0).css('margin-left')); thsi code is breaking dropcontent menu padding*/
                paddingLeft = parseInt($mainMenu.eq(0).find('a').css('padding-left'));
              } else {
                $this.css('margin-left', (-1) * parseInt($this.find('a, span').css('padding-left')));
              }
              $('.drop-pane.menu-pane-' + dropdownItem)
                      .find('.container-fluid')
                      .css({'padding-left': offsetDiff})
                      .find('.menu').css('padding-left', paddingLeft);
            }
          }

          var resizeTimer;
          $(window).resize(function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(calcpadding, 1000);
          });
        }

      aMainMenuPadding();
      calcpadding();
      $(window).load(function() {
        aMainMenuPadding();
        calcpadding();
      });
    }
  }

Drupal.behaviors.masonry = {
  attach: function(context, settings) {
    var $containerSmall = $('.speakers-list .view-content');
    // initialize
    if ($('.node-type-event .speakers-list .view-content .views-row').length > 0) {
      $(window).load(function(){
       $containerSmall.masonry({
            itemSelector: '.views-row'
          });
       });
      $('.view-group-wrapp').masonry({
        itemSelector: '.views-row'
      });
    }
  }
}

Drupal.behaviors.regexComma = {
  attach: function(context, settings) {

    $(window).load(function() {
      // Add space class for event landing page date format to avoid date format rewriting in php.
      $('.custom-slideshow .views-field-field-period-event-s .date-display-start, .custom-slideshow .views-field-field-period-event-s .date-display-end, .custom-slideshow .views-field-field-period-event-s .date-display-single').each(function(index) {
        var str = $(this).html();

        if (str.length > 0 && !$(this).hasClass('processed')) {
          var strArray = str.split(','),
                  strArrayLenght = strArray.length,
                  res = '';

          if (strArrayLenght > 2) {
            for (var i = 0; i < strArrayLenght; i++) {
              if (i === 0)
                res += strArray[i] + ','; // Exclude first one.
              else if (i !== strArrayLenght - 1)
                res += strArray[i] + ',<span class="space"></span>';
              else
                res += strArray[i];
            }
            $(this).html(res).addClass('processed');
          }
        }
      });
    });
  }
}

Drupal.behaviors.swipe = {
  attach: function(context, settings) {
    $(function() {
      //Enable swiping...
      $(".views_slideshow_cycle_main.viewsSlideshowCycle-processed").swipe({
        //Generic swipe handler for all directions
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
          $(".views-slideshow-controls-text-next").click();
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
          $(".views-slideshow-controls-text-previous").click();
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 0
      });
    });
  }
}

  // Run this behavior after all other behaviors.
  Drupal.behaviors.zGeneralLastBehavior = {
    attach: function(context, settings) {
      $('a.close').click(function() {
        $('#console').hide();
      });

      $('.alert a.close').click(function() {
        $(this).closest('.alert-block').slideToggle(180);
      });
      // Add active class for any main menu chosen children (that have active class).
      var currentPathName = window.location.pathname,
              currentFullPathName = window.location.href;
      var currentFullPathName = currentFullPathName.replace(window.location.origin, "");

      $activeTrails = $('#block-fsi-custom-rewrites-fsi-domain-menu .depth-1 a.active-trail, #block-fsi-custom-rewrites-fsi-domain-menu .depth-1 a.active')
              .not("[href='/']");
      var activeTrailsNr = $activeTrails.length;
      // If we dont have any active trails.
      if (activeTrailsNr === 0) {
        $activeTrails
                .parent().parents('li').addClass('active-trail active')
                .find('span, a').eq(0).addClass('active');
      }
      // If we have more that 1 active trails, let's choose one with priority (full path match).
      else if (activeTrailsNr > 1) {
        $activeTrails.each(function(index) {
          if ($(this).attr('href') == currentFullPathName) {
            // Remove All active links if match find.
            $('#block-fsi-custom-rewrites-fsi-domain-menu')
                    .find('li.active-trail, li.active, a.active-trail, a.active, span.active, span.active-trail')
                    .removeClass('active active-trail')
            // Add the active classes.
            $(this).parent().parents('li').addClass('active-trail active')
                    .find('span, a').eq(0).addClass('active');
          }
        });
      }

      // Case 2. full path match add active classes.
      $('#block-fsi-custom-rewrites-fsi-domain-menu .depth-1 a[href!="/"]').each(function(index) {
        $this = $(this);
        $linkPath = $this.attr('href');

        if ($linkPath == currentPathName || $linkPath == currentFullPathName) {
          $this.parent().parents('li').addClass('active-trail active')
                  .find('span, a').eq(0).addClass('active');
          // Exit after activation the first one.
          return false;
        }
      });
      $('#main .chosen-container .chosen-results li').remove();

      var buttons = $('.page-forum-researchers .pane-custom.pane-1 ul a');
      $('.page-forum-researchers .pane-custom.pane-1 ul a').first().addClass('active');
      buttons.click(function() {
        buttons.removeClass('active');
        $(this).addClass('active');
      });
    }
  }

  Drupal.behaviors.webformFSI = {
    attach: function(context, settings) {
      $('.node-webform .webform-component--enter-link input[type=text]').hide();
      $('.node-webform .upload-webform-file .enter-link').click(function() {
        $('.node-webform .webform-component--enter-link input[type=text]').toggle();
      });
    }
  }

  Drupal.behaviors.ieBrowsers = {
    attach: function(context, settings) {
      $(document).keypress(function(e) {
        if (e.which == 13) { // Checks for the enter key
          $('.exposed-white form').submit();
        }
      });
    }
  }
  Drupal.behaviors.scrollToTop = {
    attach: function(context, settings) {
      $('a.back-to-top').click(function(event) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').stop().animate({
            scrollTop: target.offset().top
          }, 800);
          event.preventDefault();
          return false;
        }
      });
    }
  };

Drupal.behaviors.ImgDescr = {
    attach: function(context) {
        var $this=$('.node-impact .pp-image-style-description');
        $this.each(function(){
            if( $(this)){
                var imgWidth = $(this).find('img').attr('width');
                if(imgWidth > 0) {
                    $(this).css('width', imgWidth)
                }
            }
        })
    }
}

Drupal.behaviors.impactGov = {
  attach: function(context, settings) {
    if ($('.page-impact-governance').length > 0) {
      $('.field-name-title-field .field-item').append( "<b></b>" );
      /*$( '.pane-bundle-video' ).each(function() {
        var fieldVideo = $( this ).find( '.field-name-field-video .field-item' );
          $( this ).find( 'img' ).appendTo(fieldVideo);
      });  */
    }
  }
}

Drupal.behaviors.misc = {
  attach: function(context, settings) {
    if ($('body').hasClass('node-type-news')) {
      $('.pane-node-read-online ul li a').append( "<span></span>" );
    }
  }
}

Drupal.behaviors.ExpertToggle = {
    attach: function(context) {
        var $this=$('.node-impact .field-name-field-rel-people-multiple');
        $('<div></div>',{
            text: 'FSI Experts on Global Health',
            class: 'impact-toggled-link'
        }).insertBefore($this);
        $this.addClass('hide');
        $('.impact-toggled-link').click(function(){
            $(this).next('.field-name-field-rel-people-multiple')
                     .toggleClass('hide');
        })
    }
}

    function getDomainDirectoryURL(currentURL) {
        var url = '';
        if (Drupal.settings.domain_directory.directory.length > 0 )  {
            url = '/' + Drupal.settings.domain_directory.directory + '/' + currentURL;
        }
        else {
            url = '/' + currentURL;
        }
        return url;
    }

    Drupal.settings.getDomainDirectoryURL = getDomainDirectoryURL;

  $( document ).ready(function() {
    var backToTop = function (e) {
      $('body,html').animate({
        scrollTop: 0
      }, 1200);
    },
    $back_top = $('.js-back-top');
    $back_top.on('click', backToTop);
  });

  Drupal.behaviors.triggerCalendar = {
    attach: function () {
      $('#edit-field-featured-value-1').on('change', function() {
        var $input = $('#edit-field-featured-value-calendar-1');
        var input_status = !$input.is(':checked');

        $input
          .prop('checked', input_status)
          .closest('form')
          .find('.ctools-auto-submit-click')
          .click();
      })
    }
  }

}(this, this.document, this.jQuery));
