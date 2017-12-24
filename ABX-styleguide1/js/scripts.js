/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  // Switchable headings
  var strings = ['Abaxis', 'Not Just Better Diagnostics', 'A Better Way'],
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
