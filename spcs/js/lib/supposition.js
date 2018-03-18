/**
 * @file
 * Supposition menu.
 */

(function (window, document, $) {
  $.fn.getWidth = function () {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return x;
  }

  $.fn.supposition = function () {
    var w = $(document).getWidth(),
    $this = $(this),
    $menuChild = $this.closest('.menu').find('.expanded-menu__menu-child');
    $menuChild.removeClass('right');
    $menuChild.addClass('show');
    $child = $this.children('.expanded-menu__menu-child');
    var $total = $child.outerWidth(true) + $child.offset().left;

    if ($total > w) {
      $child.addClass('right');
    }
    else {
      $child.removeClass('right');

      $child.find('> .menu > .expanded-menu').each(function () {
        $(this).supposition();
      });
    }

    $menuChild.removeClass('show');
  };
}(this, this.document, this.jQuery));
