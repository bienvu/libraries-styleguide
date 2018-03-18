/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.
  // Toggle mobile menu.

  $( document ).ready(function() {
    //Show hidden menu-info.
    var toggleFunction = function (btn, flag) {
      var $btn = btn,
        $parent = $btn.parent();

      // Disable hide left panel by click body
      // $(document).on('touchstart click', function (e) {
      //   if ($parent.has(e.target).length === 0 && $parent.hasClass(flag)) {
      //     $parent.removeClass(flag);
      //     $('html').removeClass(flag);
      //   }
      // });

      $btn.on('click', function () {
        if (!$parent.hasClass(flag)) {
          $parent.addClass(flag);
          $('html').addClass(flag);
        }
        else {
          $parent.removeClass(flag);
          $('html').removeClass(flag);
        }
      });
    };
    var openFlag = 'is-active',
      $open = $('.js-show-hide');
    toggleFunction($open, openFlag);


    // Save color to cookiess
    // Update style of color and font
    var updateStyle = function() {
      var $colorInput = $('.js-color-picker'),
        $fontInput = $('.js-font-input'),
        $currentBody = $('body'),
        styleCode = '';

      $colorInput.each(function(){
        var thisName = $(this).attr("name"),
          thisValue = $(this).val();

        // Conver Name of input into css Variable name
        var cssVar = thisName.replace(/([A-Z])/g, '-$1').trim().toLowerCase();
        styleCode += '--' + cssVar + ': ' + thisValue + ';';
        styleCode += '--' + cssVar + '-code: "Code: ' + thisValue + '";';
      });

      $fontInput.each(function(){
        var thisName = $(this).attr("name"),
          thisValue = $(this).val().replace('-', ' ');

        // Conver Name of input into css Variable name
        var cssVar = thisName.replace(/([A-Z])/g, '-$1').trim().toLowerCase();
        styleCode += '--' + cssVar + ': ' + thisValue + ';';
      });

      console.log(styleCode);
      $currentBody.attr('style', styleCode);
    };

    // Set color set to custom when custom color
    var setToCustom = function(setName) {
      $colorSet = $('.js-color-set');
      $fontSet = $('.js-font-set');
      switch(setName) {
        case 'color':
          $colorSet.val('userCustom');
          break;
        case 'font':
          $fontSet.val('userCustom');
          break;
        default:
      }
    };

    //Change picker color.
    var changeColorPicker = function($colorPicker) {
      $colorPicker.on("change",function(){
        var $parent = $(this).parents(".panel-switch__item__inner"),
            $input = $parent.find('.js-color-input'),
            colorVal = $(this).val();
        // Change color for input
        $input.val(colorVal);

        // Reset color set to custom
        setToCustom('color');
        // Change color for css variable
        updateStyle();
      });
    };

    var $colorPicker = $(".js-color-picker");
    changeColorPicker($colorPicker);

    //Change input color.
    var changeColorInput = function($colorInput) {
      $colorInput.keyup(function(){
        var $parent = $(this).parents(".panel-switch__item__inner"),
            $picker = $parent.find('.js-color-picker'),
            colorVal = $(this).val();
        // Change color for input
        $picker.val(colorVal);

        // Reset color set to custom
        setToCustom('color');
        // Change color for css variable
        updateStyle();
      });
    };

    var $colorInput = $(".js-color-input");
    changeColorInput($colorInput);

    // Color set.
    var selectboxColorSet = $(".js-color-set");
    var objectColorSet = {
      default: {
        primary: "#0D28FF",
        secondary: "#FF2869",
        text: "#112146"
      },
      FSIColor: {
        primary: "#8C1515",
        secondary: "#2E2D29",
        text: "#403f3f"
      },
      colorSet1: {
        primary: "#b20729",
        secondary: "#e5a542",
        text: "#333333"
      },
      colorSet2: {
        primary: "#009fb8",
        secondary: "#ce480a",
        text: "#000000"
      },
      colorSet3: {
        primary: "#add75c",
        secondary: "#c2e185",
        text: "#04141d"
      }
    };

    selectboxColorSet.change(function() {
      var colorSet = $(this).val(),
        $colorPalette = $(this).parents('.panel-switch__color'),
        $primaryInput = $colorPalette.find('.primary-color'),
        $secondaryInput = $colorPalette.find('.secondary-color'),
        $textInput = $colorPalette.find('.text-color');

      if(colorSet != 'userCustom') {
        $primaryInput.val(objectColorSet[colorSet]["primary"]);
        $secondaryInput.val(objectColorSet[colorSet]["secondary"]);
        $textInput.val(objectColorSet[colorSet]["text"]);
          // Change color for css variable
        updateStyle();
      }
    });

    //Font set.
    var selectboxFontSet = $(".js-font-set");
    var objectFontSet = {
      default: {
        heading: "MarkWebProMedium",
        body: "MarkWebPro",
      },
      FSIFont: {
        heading: "CrimsontextRoman",
        body: "SourceSansPro",
      },
      StanfordFont: {
        heading: "SourceSansProBold",
        body: "SourceSansPro",
      },
      CypressFont: {
        heading: "OpensansBold",
        body: "Opensans",
      },
      fontSet1: {
        heading: "Roboto",
        body: "Josefin-Sans",
      },
      fontSet2: {
        heading: "Josefin-Sans",
        body: "Lobster",
      },
      fontSet3: {
        heading: "Baloo-Bhaina",
        body: "Josefin-Sans",
      }
    };

    selectboxFontSet.change(function() {
      var fontSet = $(this).val(),
        $fontPalette = $(this).parents('.panel-switch__font-face'),
        $fontHeading = $fontPalette.find('.font-heading'),
        $fontBody = $fontPalette.find('.font-body');

      if(fontSet != 'userCustom') {
        $fontHeading.val(objectFontSet[fontSet]["heading"]);
        $fontBody.val(objectFontSet[fontSet]["body"]);
        // Change color for css variable
        updateStyle();
      }
    });

    //Change input Font.
    var changeFontInput = function($fontInput) {
      $fontInput.change(function(){
        // Reset color set to custom
        setToCustom('font');
        // Change color for css variable
        updateStyle();
      });
    };

    var $fontInput = $(".js-font-input");
    changeFontInput($fontInput);


    // Chang Button style.
    var changeButtonStyle = function ($buttonInput) {

      var $thisName = $buttonInput.attr("name"),
         $thisClass = $buttonInput.attr("class"),
        // Choose button without default
        $currentButton = $('.link-btn-wrap:not(.default)'),
        $thisValue = $('input[name='+ $thisName +']:checked').val();
      if ($thisClass === 'js-button-input') {
        if($thisValue != 'default') {
          $currentButton.removeClass('btn--background');
          $currentButton.removeClass('btn--outline');
          $currentButton.addClass('btn--' + $thisValue);
        } else {
          $currentButton.removeClass('btn--background');
          $currentButton.removeClass('btn--outline');
        }
      };
      if ($thisClass === 'js-radius-input')  {
        if($thisValue != 'default') {
          $currentButton.removeClass('btn--radius-5');
          $currentButton.removeClass('btn--radius-10');
          $currentButton.removeClass('btn--radius-20');
          $currentButton.addClass('btn--' + $thisValue);
        } else {
          $currentButton.removeClass('btn--radius-5');
          $currentButton.removeClass('btn--radius-10');
          $currentButton.removeClass('btn--radius-20');
        }
      }
    };

    var $buttonChange = $('.js-button-input, .js-radius-input');
    $buttonChange.change(function() {
      changeButtonStyle($(this));
    });



    // Save action
    // Save configs via Json, readmore here: https://github.com/js-cookie/js-cookie
    var saveConfig = function() {
      var configs = {
        // Get color values
        colorSet: $('.js-color-set').val(),
        primaryColor: $('.primary-color').val(),
        secondaryColor: $('.secondary-color').val(),
        textColor: $('.text-color').val(),
        // Get font values
        fontSet: $('.js-font-set').val(),
        bodyFont: $('.font-body').val(),
        headingFont: $('.font-heading').val(),

        // // Get button values
        buttonStyle: $('input[name=buttonStyle]:checked').val(),
        buttonRadius: $('input[name=buttonRadius]:checked').val()
      };
      Cookies.set('configs', configs );
    };

    // Click button save
    $('.js-save').click(function(){
      saveConfig();
      $(this).addClass('is-active');
      setTimeout(function(){
        $('.js-save').removeClass('is-active')
      }, 1000);
    });

    var loadCurrentConfig = function() {
      // Get cookies
      var configsSaved = Cookies.getJSON('configs');
      console.log(configsSaved);
      if (!!configsSaved) {
        $.each( configsSaved, function( key, value ) {
          if(key == 'buttonStyle' || key == 'buttonRadius') {
            $("[name='" + key + "'][value='" + value + "']").prop("checked", true);
          }
          else {
            $("[name='" + key + "']").val(value);
          }
        });

        // Update style for font and color
        updateStyle();

        // Update style for button
        //changeButtonStyle($buttonChange);
        var $buttonInput = $('.js-button-input'),
          $radiusInput = $('.js-radius-input');
        changeButtonStyle($buttonInput);
        changeButtonStyle($radiusInput);
      }
    }

    loadCurrentConfig();

    // Click button cancel
    $('.js-cancel').click(function(){
      $(this).addClass('is-active');
    });

    // Click button Confirm cancel
    var $jsConfirm = $('.js-confirm');
    $jsConfirm.click(function(){
      $jsConfirm.removeClass('is-active');
      $jsConfirm.removeClass('hide');

      if ($(this).hasClass('approve')) {
        $(this).addClass('is-active');
        $(this).next().addClass('hide');
        // Load current config variable
        loadCurrentConfig();
      } else {
        $(this).addClass('is-active');
        $(this).prev().addClass('hide');
      }
      setTimeout(function(){
        $('.js-cancel').removeClass('is-active');
      }, 1000);
      setTimeout(function(){
        $jsConfirm.removeClass('is-active');
        $jsConfirm.removeClass('hide');
      }, 1500);
    });

    // Scroll bar
    var $panelContent = $(".panel-switch__content");
    $panelContent.mCustomScrollbar({
      theme:"light-thin",
      autoHideScrollbar:true
    });
    // $panelContent.niceScroll({cursorborder:"",cursorcolor:"#999",boxzoom:true});

  });
}(this, this.document, this.jQuery));
