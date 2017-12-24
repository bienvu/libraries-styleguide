// Config tabs.
var jsTabs = function(e) {
 e.preventDefault();

  var $this = jQuery(this);
  $tab_index = $this.index();
  $content_item = jQuery( '.js-tabs__content > div' );
  $js_tabs = jQuery( '.js-tabs a' );

  $js_tabs.removeClass('is-active');
  $this.children().addClass('is-active');
  $content_item.removeClass('is-active');
  $content_item.eq( $tab_index ).addClass('is-active');
};

jQuery('.js-tabs li').on('click', jsTabs);