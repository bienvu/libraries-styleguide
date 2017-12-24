(function (window, document, $) {
  $.getJSON("fonts/selection.json", function (data) {
    var items = [],
      icons;

    $.each(data.icons, function (key, value) {
      items.push('<li>' +
        '<i class="component-icons__icon icon-' + value.properties.name + '"></i>' +
        '<span class="component-icons__name">icon-' + value.properties.name + '</span>' +
        '</li>');
    });
    icons = '<ul class="">'+items.join("")+'</ul>';
    $('#component-icons').append(icons);
  });
}(this, this.document, this.jQuery));
