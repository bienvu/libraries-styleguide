<?php

define('FSI_IMAGE_STYLE_960x540', '960x540');

function fsi_preprocess_html(&$vars) {
  $current_classes = $vars['classes_array'];
  $dom = fsi_last_domain_lvl();
  array_push($current_classes, "domain-" . $dom);
  $node = _get_current_center_info();
  $node->language = LANGUAGE_NONE;

  $vars['classes_array'][] = 'subdomain-header-fixed';

  // Add readable body subdomain class.
  if ($subdomain_name = _fsi_common_get_subdomain_name($node)) {
    $subdomain_name = drupal_strtolower($subdomain_name);
    $vars['classes_array'][] = 'subdomain-' . $subdomain_name;
    // Add domain-specific CSS.
    drupal_add_css(drupal_get_path('theme', 'fsi') . '/css/subdomains/' . $subdomain_name . '.css', array(
      'group' => CSS_THEME,
      'weight' => 10,
    ));
    drupal_add_css(drupal_get_path('theme', 'fsi') . '/css/ie8.css', array(
      'group' => CSS_THEME,
      'weight' => 115,
      'browsers' => array('IE' => 'IE 8', '!IE' => FALSE))
    );
  }

  // Reattach media.css after subdomain css file.
  drupal_add_css(drupal_get_path('theme', 'fsi') . '/css/media.css', array(
    'group' => CSS_THEME,
    'weight' => 21,
  ));

  drupal_add_library('system', 'drupal.ajax');

  // Global text structure to display in the title bar of a visitor's web browser.
  $vars = _fsi_common_add_head_title($vars);

  // Add our custom CSS after all other CSS.
  drupal_add_css(drupal_get_path('theme', 'fsi') . '/source/css/styles.css', array(
    'group' => CSS_THEME,
    'weight' => 24,
  ));

  // Add our custom JS in footer, after all other JS.
  drupal_add_js(drupal_get_path('theme', 'fsi') . '/source/js/scripts.js', array(
    'scope' => 'footer',
    'weight' => 999,
    'preprocess' => FALSE,
  ));
}

/**
 * Implements template_preprocess_node()
 */
function fsi_preprocess_node(&$vars) {
  switch ($vars['view_mode']) {
    case 'fsi_teaser':
      $vars['display_submitted'] = FALSE;
      break;
    case 'fsi_acronym':
      $vars['title'] = NULL;
      break;
    // Suggest new template for search result nodes
    case 'search_result':
      switch ($vars['type']) {
        case 'publication':
				case 'news':
				case 'event':
				case 'research':
				case 'multimedia':
          $vars['theme_hook_suggestions'][] = 'node__' . $vars['type'] . '__search_result';
          break;
				default:
					$vars['theme_hook_suggestions'][] = 'node__search_result';
					break;
      }
      break;
  }
}

/**
 * Implements theme_preprocess_block().
 */
function fsi_preprocess_block(&$vars) {
  if ($vars['elements']['#block']->region == 'footer_center') {
    $vars['classes_array'][] = 'footer-panel__top__item';
  }
}

/**
 * Override template_date_display_range()
 * Returns HTML for a date element formatted as a range.
 * @param type $variables
 * @return type
 */
function fsi_date_display_range($variables) {
  $date1 = $variables['date1'];
  $date2 = $variables['date2'];
  $timezone = $variables['timezone'];
  $attributes_start = $variables['attributes_start'];
  $attributes_end = $variables['attributes_end'];

  // Wrap the result with the attributes.
  return t('!start-date<span class="separator"> - </span>!end-date', array(
    '!start-date' => '<span class="date-display-start"' . drupal_attributes($attributes_start) . '>' . $date1 . '</span>',
    '!end-date' => '<span class="date-display-end"' . drupal_attributes($attributes_end) . '>' . $date2 . $timezone . '</span>',
  ));
}

function fsi_preprocess_panels_pane($vars) {
  if (!empty($vars['pane']->configuration['admin_title'])) {
    $pane_title = $vars['pane']->configuration['admin_title'];
    $filter = '![^abcdefghijklmnopqrstuvwxyz0-9-_]+!s';
    $string_clean = preg_replace($filter, '_', drupal_strtolower($pane_title));
    $vars['theme_hook_suggestions'][] = 'panels_pane__' . $string_clean;
  }

  $content = $vars['content'];
//  if ( (!empty($content['#entity_type']))
//    && ($content['#entity_type'] == 'fieldable_panels_pane')
//    && (!empty($content['#bundle']))) {
//    $vars['theme_hook_suggestions'][0] = 'panels_pane__' . $content['#entity_type'] . '__' . $content['#bundle'];
//    dpm($vars);
//  }
}

/**
 * Adding menu name class to menu items,
 * adding menu item depth ass class.
 */
function fsi_menu_link(array $variables) {
  $element = $variables['element'];
  $original_link = $element['#original_link'];
  $depth = 'depth-' . $original_link['depth'];
  $menu_name = 'item-' . $original_link['menu_name'];

  $variables['element']['#attributes']['class'][] = $depth;
  $variables['element']['#attributes']['class'][] = $menu_name;

  return theme_menu_link($variables);
}

/**
 * Template_menu_link_MENU_NAME()
 * @param type $variables
 * @return type
 */
function fsi_menu_link__menu_topic($variables) {
  // Override html class attribute
  $element = $variables['element'];
  if ($variables['element']['#original_link']['has_children'] == TRUE) {
    $variables['element']['#attributes']['class'] = array('group-title');
  }
  else {
    $variables['element']['#attributes']['class'] = array('simple-title');
  }
  return theme_menu_link($variables);
}

/**
 * Template_menu_link_MENU_NAME()
 * @param type $variables
 * @return type
 */
function fsi_menu_link__menu_fsi_header_all($variables) {
  // Override html class attribute.s
  if (isset($variables['element'])) {
    return theme_menu_link($variables);
  }
}

/**
 * Implements hook_js_alter().
 */
function fsi_js_alter(&$js) {
  // Unset OpenFramework jQuery 1.8
  unset($js['sites/all/themes/open_framework/js/jquery-1.8.2.min.js']);
  unset($js['sites/all/themes/open_framework/bootstrap/js/bootstrap.min.js']);
  unset($js['sites/all/themes/fsi/js/bootstrap-carousel.js']);
//  drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery-1.8.2.min.js', array(
//      'weight' => 150,
//    ));

  // Exclude JQuery 1.8 from a specific pages
  $path = drupal_get_path_alias();
  $pattern = variable_get('paths_exclude_jquery', '');
  if (drupal_match_path($path, $pattern)) {
    unset($js['sites/all/themes/fsi/js/jquery-1.8.2.min.js']);
  }
}

/**
 * Exclude all the unused core and modules css.
 */
function fsi_css_alter(&$css) {
  $exclude = array(
    'misc/vertical-tabs.css' => FALSE,
    'modules/aggregator/aggregator.css' => FALSE,
    'modules/block/block.css' => FALSE,
    'modules/book/book.css' => FALSE,
    'modules/comment/comment.css' => FALSE,
    'modules/dblog/dblog.css' => FALSE,
    'modules/file/file.css' => FALSE,
    'modules/filter/filter.css' => FALSE,
    'modules/forum/forum.css' => FALSE,
    'modules/help/help.css' => FALSE,
    'modules/menu/menu.css' => FALSE,
    'modules/node/node.css' => FALSE,
    'modules/openid/openid.css' => FALSE,
    'modules/poll/poll.css' => FALSE,
    'modules/profile/profile.css' => FALSE,
    'modules/search/search.css' => FALSE,
    'modules/statistics/statistics.css' => FALSE,
    'modules/syslog/syslog.css' => FALSE,
    'modules/system/admin.css' => FALSE,
    'modules/system/maintenance.css' => FALSE,
    'modules/system/system.css' => FALSE,
    'modules/system/system.admin.css' => FALSE,
    'modules/system/system.base.css' => FALSE,
    'modules/system/system.maintenance.css' => FALSE,
    'modules/system/system.menus.css' => FALSE,
    'modules/system/system.messages.css' => FALSE,
    'modules/system/system.theme.css' => FALSE,
    'modules/taxonomy/taxonomy.css' => FALSE,
    'modules/tracker/tracker.css' => FALSE,
    'modules/update/update.css' => FALSE,
    'modules/user/user.css' => FALSE,
    'sites/all/themes/open_framework/css/open_framework.css' => FALSE,

  );

  $css = array_diff_key($css, $exclude);
}

/**
 * Display the view as an HTML list element.
 * Adding item number as class.
 */
function fsi_preprocess_views_view_list(&$vars) {
  if (isset($vars['wrapper_class']) AND $vars['wrapper_class'] != '') {
    $vars['wrapper_prefix'] = '<div class="' . $vars['wrapper_class'] . ' item-' . $vars['id'] . '">';
    $vars['wrapper_suffix'] = '</div>';
  }
}

/**
 * Render callback.
 *
 * @ingroup themeable
 */
function fsi_panels_default_style_render_region($vars) {
  $output = implode('', $vars['panes']);
  return $output;
}

/**
 * Rewrite the output of Panel Stack Frames.
 */
function fsi_panels_frame_stack($vars) {
  $output = '';
  $frame_counter = 0;
  foreach ($vars['frames'] as $name => $content) {
    $output .= '<div class="frame clearfix frame-' . $name . ' frame-item-' . $frame_counter . '">' . $content . '</div>';
    $frame_counter++;
  }
  return '<div' . $vars['attributes'] . '>' . $output . '</div>';
}

/**
 * Add parent name as cass for textfield,
 * and add the label as data-label attribute for IE placeholder fallback.
 */
function fsi_textfield($variables) {
  // Check if textfield has parents.
  if (!empty($variables['element']['#parents'])) {
    // Add class attribute if it does not exist.
    if (!isset($variables['element']['#attributes']['class'])) {
      $variables['element']['#attributes']['class'] = array();
    }
    // Add parent name as textfield class.
    $variables['element']['#attributes']['class'][] = 'feild-' . $variables['element']['#parents'][0] . '-textfield';
  }
  // Add label to data-label attribute for input.
  if (isset($variables['element']['#title'])) {
    $variables['element']['#attributes']['data-label'] = $variables['element']['#title'];
  }
  // Send updated $variables to theme function.
  return theme_textfield($variables);
}

function fsi_preprocess_views_view(&$vars) {
  $view = $vars['view'];
  // Title for link pager
  $pager_titles = array(
    'news' => t('More News'),
    'publication' => t('More Publications'),
    'event' => t('More Events'),
    'multimedia' => t('More Multimedia'),
    'research' => t('More Projects'),
  );

  if($view->name == 'fsi_event_node') {
     drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/masonry.pkgd.min.js', array('weight' => '200'));
  }

  if($view->name == 'fsi_news') {
    drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
  }

  switch ($view->name) {
    case 'fsi_content_by_tid':
      switch ($view->current_display) {
        case 'content_by_ct_exposed_filter': //
        case 'researches_by_ct_exposed_filter': // Change Pager link for Researches by content type
          // Alter Pager link by input argument in views
          if (!empty($vars['view']->args[0]) && array_key_exists($vars['view']->args[0], $pager_titles)) {
            $pager_text = $pager_titles[$vars['view']->args[0]];
            // Render pager
            $pager_theme = views_theme_functions('views_load_more_pager', $view, $view->current_display);

            $pager_args = array(
              'parameters' => $view->exposed_raw_input,
              'element' => 0,
              'more_button_text' => $pager_text . ' >',
            );

            // Change default pager HTML with new rendered pager that has changed title
            $vars['pager'] = theme($pager_theme, $pager_args);
          }
          break;
      }
      break;
    case 'publications':
      switch ($view->current_display) {
        case 'panel_pane_2':
          drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
          break;
      }
      break;
    case 'fsi_events_page':
      switch ($view->current_display) {
        case 'panel_pane_10':
          drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
          break;
      }
      break;
    case 'fsi_media':
      switch ($view->current_display) {
        case 'media_top_slider':
          drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
          break;
      }
      break;
    case 'fsi_center_slider':
      switch ($view->current_display) {
        case 'panel_pane_26':
        case 'panel_pane_14':
        case 'panel_pane_17':
          drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
          break;
      }
      break;
    case 'spice_catalog':
      switch ($view->current_display) {
        case 'spice_catalog_slider':
          drupal_add_js(drupal_get_path('theme', 'fsi') . '/js/jquery.flexslider-min.js', array('weight' => '200'));
          break;
      }
      break;
  }
}

/**
 * Preprocess the calendar date box callback.
 */
function fsi_preprocess_calendar_datebox(&$vars) {
  $date = $vars['date'];
  $view = $vars['view'];
  $day_path = calendar_granularity_path($view, 'day');
  if ($vars['granularity'] == 'year') {
    // Get date of cell
    // Exclude day number from date
    $date = $vars['date'];
    $year_month = date('Y-m', strtotime($date));

    // Get views path
    $views_path = $vars['view']->query->pager->display->display_options['path'];

    // replace year with month
    if (!empty($views_path)) {
      $path = explode('/', $views_path);
      foreach ($path as $key => $value) {
        if ($value == 'year') {
          $path[$key] = 'month';
        }
      }
    }
    // Append date to views page path
    $url = implode('/', $path);
    $url .= '/' . $year_month;

    // Set day cell link
    $vars['link'] = l($vars['day'], $url);
  }
  switch ($vars['view']->name) {
    case 'fsi_calendar':
      $vars['url'] = 'events/' . $date;
      $vars['link'] = !empty($day_path) ?l($vars['day'],$vars['url']):$vars['day'];
      break;
  }
}

/**
 * Implements theme_form_alter()
 */
function fsi_form_alter(&$form, &$form_state, $form_id) {
  // Added placeholder to search block form.
  if ($form_id == 'search_block_form') {
    // Get info of current domain.
    $current_domain = domain_get_domain();
    $center_info = _fsi_common_get_center_info_by_domain($current_domain['domain_id']);

    if (!isset($center_info['acronym'])) {
      $acronym = $current_domain['sitename'];
    }
    else {
      $acronym = $center_info['acronym'];
    }
    // Set placeholder.
    $form['search_block_form']['#attributes']['placeholder'] = t('Search') . ' ' . $acronym;
    $form['search_block_form']['#title'] = '';
  }
  // Added placeholder attribute to exposed filter.
  if ($form_id == 'views_exposed_form') {
    $form['title']['#attributes']['placeholder'] = t('Keyword');
  }
  if (isset($form['submit']) && $form['submit']['#value'] == 'Add to cart') {
    $form['submit']['#attributes']['class'] = array('cart-button cart-icon');
    $product_node = menu_get_object();
    if (!empty($product_node) && $product_node->type == 'spice_book_product') {
      $form['submit']['#attributes']['class'][] = 'no-bg item-page-cart-button';
    }
  }
  // Remove language settings from user edit profile.
  if ($form_id == 'user_profile_form') {
    $form['locale']['#access'] = FALSE;
  }
  if ($form['#id'] == 'views-exposed-form-events-events-by-date') {
    $form['centers_target_id']['#options']['All'] = 'All Centers';
  }
}

/**
 * Rewrite theme_mediaelement_audio().
 */
function fsi_mediaelement_audio($variables) {

  // Try to rewrite local media source to remote one (fsi-media).
  if ($node = menu_get_object()) {
    $variables = _fsi_multimedia_get_remote_media_src($variables, $node, 'audio');
  }

  $output = '<div class="mediaelement-audio">';
  $output .= '<audio ' . drupal_attributes($variables['attributes']) . ' ></audio>';
  if ($variables['settings']['download_link']) {
    $output .= '<div class="mediaelement-download-link"><a href="' . $variables['attributes']['src'] . '">' . filter_xss_admin($variables['settings']['download_text']) . '</a></div>';
  }
  $output .= '</div>';
  return $output;
}

/**
 * Rewrite theme_mediaelement_video().
 */
function fsi_mediaelement_video($variables) {

  // Try to rewrite local media source to remote one (fsi-media).
  if ($node = menu_get_object()) {
    $variables = _fsi_multimedia_get_remote_media_src($variables, $node, 'video');
  }

  $output = '<div class="mediaelement-video">';
  $output .= '<video ' . drupal_attributes($variables['attributes']) . ' ></video>';
  if ($variables['settings']['download_link']) {
    $output .= '<div class="mediaelement-download-link"><a href="' . $variables['attributes']['src'] . '">' . filter_xss_admin($variables['settings']['download_text']) . '</a></div>';
  }
  $output .= '</div>';
  return $output;
}

/*
 * Adding menu name to menu attributes.
 */
function fsi_theme_registry_alter(&$theme_registry) {
  if (isset($theme_registry['menu_tree'])) {
    // Add custom preprocess function
    $theme_registry['menu_tree']['preprocess functions'][0] = '_fsi_template_preprocess_menu_tree';
  }
}

/*
 * Add menu name to menu tree
 */
function _fsi_template_preprocess_menu_tree(&$variables) {
  // Custom function
  $variables['menu_name'] = '';
  foreach($variables['tree'] as $item) {
    if (isset($item['#original_link'])) {
      if (isset($item['#original_link']['menu_name'])) {
        $variables['menu_name'] = $item['#original_link']['menu_name'];
        break;
      }
    }
  }
  $variables['tree'] = $variables['tree']['#children'];
}

/*
 * Set custom_class to menu tree
 */
function fsi_menu_tree($variables) {
  $custom_class = 'menu nav';
  if (isset($variables['custom_class'])) {
    $custom_class .= ' ' . $variables['custom_class'];
  }
  return '<ul class="' . $custom_class . '">' . $variables['tree'] . '</ul>';
}

/**
 * Adds custom menu class.
 */
function fsi_preprocess_menu_tree(&$variables) {
  $menu_array = array('menu-cddrl-programs', 'menu-cddrl-topics', 'menu-cddrl-projects', 'menu-cddrl-regions');
  // Add custom class to certains menus
  if (in_array($variables['menu_name'], $menu_array)) {
    $variables['custom_class'] = 'menu-column';
  }
}

/**
 * Reorder the dates to d/m/y not m/d/y
 */
function fsi_webform_date($variables) {
  $element = $variables['element'];

  //Save the data from the array into variables.
  $month = $element['month'];
  $year = $element['year'];

  // Override months with full month name.
  $month['#options'] = array(t('Month')) + date_month_names_untranslated();

  //Remove these keys from the array.
  unset($element['day']);
  unset($element['month']);
  unset($element['year']);

  //Re-add the data to the array in the correct order.
  $element['month'] = $month;

  $element['year'] = $year;

  $element['year']['#attributes']['class'] = array('year');
  $element['month']['#attributes']['class'] = array('month');
  $element['day']['#attributes']['class'] = array('day');

  // Add error classes to all items within the element.
  if (form_get_error($element)) {
    $element['year']['#attributes']['class'][] = 'error';
    $element['month']['#attributes']['class'][] = 'error';
    $element['day']['#attributes']['class'][] = 'error';
  }

  $class = array('webform-container-inline');

  // Add the JavaScript calendar if available (provided by Date module package).
  if (!empty($element['#datepicker'])) {
    $class[] = 'webform-datepicker';
    $calendar_class = array('webform-calendar');
    if ($element['#start_date']) {
      $calendar_class[] = 'webform-calendar-start-' . $element['#start_date'];
    }
    if ($element['#end_date']) {
      $calendar_class[] = 'webform-calendar-end-' . $element['#end_date'];
    }
    $calendar_class[] ='webform-calendar-day-' . variable_get('date_first_day', 0);

    $calendar = theme('webform_calendar', array('component' => $element['#webform_component'], 'calendar_classes' => $calendar_class));
  }

  $output = '';
  $output .= '<div class="' . implode(' ', $class) . '">';
  $output .= drupal_render_children($element);
  $output .= isset($calendar) ? $calendar : '';
  $output .= '</div>';

  return $output;
}
/*
 * Alter commerce_email order line items
 *
 * Implements theme_commerce_email_order_items()
 */
function fsi_commerce_email_order_items($variables) {
  $view_name = 'test';
  $display_id = 'commerce_email_line_items';
  // Get order wrapper.
  $order_wrapper = $variables['commerce_order_wrapper'];
  // Get rendered view.
  $view = views_embed_view($view_name, $display_id, $order_wrapper->getIdentifier());
  $string = '<div class="contextual-links-wrapper"><ul class="contextual-links"><li class="views-ui-edit first last">';
  $view = str_replace($string, '', $view);
  $view = str_replace('Edit view', '', $view);
  $view = str_replace('</li>', '', $view);
  $view = str_replace('</ul>', '', $view);
  return $view;
}

function fsi_preprocess_fieldable_panels_pane(&$vars) {
  switch($vars['elements']['#bundle']) {
    case 'video':
      unset($vars['content']['title']);
      break;
    case 'image_multiple_links':
      if (!empty($vars['elements']['#view_mode'])
        && $vars['elements']['#view_mode'] == 'image_and_links_270x220') {
        unset($vars['content']['title']);
      }
    break;
  }
}

/**
 * Implements hook_html_head_alter().
 */
function fsi_html_head_alter(&$head_elements) {
  if (empty($head_elements['metatag_description_0'])) {
    $node = _get_current_center_info();
    $node->language = LANGUAGE_NONE;

    // Add meta description per domain.
    if (!empty($node->field_meta_description[$node->language][0]['value'])) {
      $head_elements['metatag_description_0'] = array(
        '#type' => 'html_tag',
        '#theme' => 'metatag',
        '#tag' => 'meta',
        '#id' => 'metatag_description_0',
        '#name' => 'description',
        '#value' => $node->field_meta_description[$node->language][0]['value'],
      );
    }
  }
}

/**
 * Implements template_preprocess_entity().
 */
function fsi_preprocess_entity(&$variables) {
  $variables['content']['#items_count'] = 0;
  $bg_collor_name = [
    '#FFFFFF' => 'bg--white',
    '#8C1515' => 'bg--cardinal',
    '#F2F1EB' => 'bg--stanford-beige10',
    '#C2CAD3' => 'bg--loblolly',
    '#4D4F53' => 'bg--stanford-cgray',
    '#2E2D29' => 'bg--stanford-black',
    '#E5E4E2' => 'bg--platinum',
    '#0098DB' => 'bg--blue',
  ];
  if (!empty($variables['content']['field_bio_block_bios']['#items'])) {
    $variables['content']['#items_count'] = count($variables['content']['field_bio_block_bios']['#items']);
  }

  if ($variables['elements']['#entity_type'] == 'paragraphs_item') {
    $variables['sticky_nav_paragraph_id'] = $variables['paragraphs_item']->bundle . '_' . $variables['paragraphs_item']->item_id;
    switch ($variables['elements']['#bundle']) {
      case 'scroll_down':
        if (!empty($variables['field_scroll_text_collor'][0]['value'])) {
          switch ($variables['field_scroll_text_collor'][0]['value']) {
            case 'darker':
              $variables['content']['#scroll_top_class'] = $variables['field_scroll_text_collor'][0]['value'];
              break;
            default:
              $variables['content']['#scroll_top_class'] = '';
              break;
          }
        }

        if (!empty($variables['field_scroll_show_icon'][0]['value']) && $variables['field_scroll_show_icon'][0]['value'] == 1) {
          $variables['content']['#scroll_has_icon_class'] = 'has--icon';
          $variables['content']['#scroll_has_icon'] = TRUE;
        }
        else {
          $variables['content']['#scroll_has_icon_class'] = '';
          $variables['content']['#scroll_has_icon'] = FALSE;
        }

        if (!empty($variables['field_scroll_label_bottom'][0]['value'])) {
          $variables['content']['#scroll_has_icon_class'] .= ' has--label-bottom';
        }
        break;
      case 'grid_mosaic':
        $items = $variables['elements']['field_mosaic']['#items'];
        unset($items['custom_view_mode']);
        // Grouped array of items.
        $group_limit = 2;
        $i = 0;
        $group_arr = [];
        foreach ($items as $key => $item) {
          if ($i <= $group_limit) {
            $group_arr[] = $key;
            $i++;
            if ($i == $group_limit) {
              $variables['content']['#group_items'][] = $group_arr;
              $group_arr = [];
              $i = 0;
            }
          }
        }

        break;
      case 'two_column_views':
        $col_id1 = $variables['field_column_one'][0]['value'];
        $col_id2 = $variables['field_column_2'][0]['value'];
        $variables['content']['#col1_view_name'] = !empty($variables['content']['field_column_one'][0]['entity']['paragraphs_item'][$col_id1]['field_view_display'][0]['#markup'])
          ? $variables['content']['field_column_one'][0]['entity']['paragraphs_item'][$col_id1]['field_view_display'][0]['#markup'] : '';
        unset($variables['content']['field_column_one'][0]['entity']['paragraphs_item'][$col_id1]['field_view_display']);
        unset($variables['content']['field_column_one'][0]['entity']['paragraphs_item'][$col_id1]['field_view']);
        $variables['content']['#col2_view_name'] = !empty($variables['content']['field_column_2'][0]['entity']['paragraphs_item'][$col_id2]['field_view_display'][0]['#markup'])
          ? $variables['content']['field_column_2'][0]['entity']['paragraphs_item'][$col_id2]['field_view_display'][0]['#markup'] : '';
        unset($variables['content']['field_column_2'][0]['entity']['paragraphs_item'][$col_id2]['field_view_display']);
        unset($variables['content']['field_column_2'][0]['entity']['paragraphs_item'][$col_id2]['field_view']);
        $variables['content']['#mobile_text'] = $variables['content']['#col1_view_name'] . ' & ' . $variables['content']['#col2_view_name'];

        // Get background color class.
        if (!empty($variables['field_two_col_views_bg_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_two_col_views_bg_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
      case 'vertical_select':
        $items = $variables['elements']['field_select_block']['#items'];
        if (count($items) >=1) {
          $variables['content']['field_select_block'][0]['entity']['paragraphs_item'][$items[0]['value']]['#is_active'] = TRUE;
        }
        if (!empty($variables['field_vselect_bg_collor'][0]['rgb'])) {
          $collor = strtoupper($variables['field_vselect_bg_collor'][0]['rgb']);
          $variables['content']['#bg_collor'] = $bg_collor_name[$collor];
        }
        break;
      case 'select_with_text':
      case 'select_with_links':
      case 'select_with_tiles':
        if (!empty($variables['elements']['#is_active']) && $variables['elements']['#is_active']) {
          $variables['content']['#active_class'] = 'active';
        }
        else {
          $variables['content']['#active_class'] = '';
        }
        break;
      case 'carousel_banner':
        if (!empty($variables['field_banner_view_type'][0]['value'])) {
          switch ($variables['field_banner_view_type'][0]['value']) {
            case 'carousel_banner_half':
              $variables['content']['#carousel_class'] = 'half-carousel-banner';
              break;
            default:
              $variables['content']['#carousel_class'] = '';
              break;
          }
        }
        break;
      case 'group_boxes':
        if (!empty($variables['field_boxes'])) {
          $variables['content']['#items_count'] = count($variables['field_boxes']);
        }
        if (!empty($variables['field_boxes_bg_collor'][0]['rgb'])) {
          $collor = strtoupper($variables['field_boxes_bg_collor'][0]['rgb']);
          $variables['content']['#bg_collor'] = $bg_collor_name[$collor];
        }
        break;
      case 'biography_block':
        if (!empty($variables['field_bio_bg_collor'][0]['rgb'])) {
          $collor = strtoupper($variables['field_bio_bg_collor'][0]['rgb']);
          $variables['content']['#bg_collor'] = $bg_collor_name[$collor];
        }
        break;
      case 'html_box':
        if (!empty($variables['field_html_box_bg_collor'][0]['rgb'])) {
          $collor = strtoupper($variables['field_html_box_bg_collor'][0]['rgb']);
          $variables['content']['#bg_collor'] = $bg_collor_name[$collor];
        }
        break;
      case 'block_quote':
        if (!empty($variables['field_bq_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_bq_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
      case 'page_title':
        if (!empty($variables['field_page_title_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_page_title_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
      case 'highlight_text':
        if (!empty($variables['field_hl_bg_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_hl_bg_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }

        $variables['content']['#hl_text_container_class'] = 'highlight-text__contents';
        if (count($variables['content']['field_hl_text_item_paragraph']['#items']) >= 2) {
          $variables['content']['#hl_text_container_class'] .= ' highlight-text__contents--2cols';
        }
        break;
      case '50_50_component':
        if (!empty($variables['field_50_50_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_50_50_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        if (!empty($variables['field_50_50_position'][0]['value'])
          && ($variables['field_50_50_position'][0]['value'] == 'image_left_text_right')) {
          $variables['content']['#position'] = 'image-texts--content-left';
        }
        else {
          $variables['content']['#position'] = '';
        }
        break;
      case 'video_text':
        if (!empty($variables['field_video_text_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_video_text_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        if (!empty($variables['field_video_text_position'][0]['value'])
          && ($variables['field_video_text_position'][0]['value'] == 'text_left_video_right')) {
          $variables['content']['#position'] = 'box-feature--bigleft';
          $variables['content']['#left'] = $variables['content']['field_p_text'];
          $variables['content']['#right'] = $variables['content']['field_p_video'];
        }
        else {
          $variables['content']['#position'] = 'box-feature--bigright';
          $variables['content']['#left'] = $variables['content']['field_p_video'];
          $variables['content']['#right'] = $variables['content']['field_p_text'];
        }
        break;
      case 'video_only':
        // Added video thumbnail into template.
        if (!empty($variables['field_video_embed'][0]['thumbnail_path'])) {
          $variables['content']['video_thumbnail'] = array(
            '#theme' => 'image_formatter',
            '#item' => array('uri' => $variables['field_video_embed'][0]['thumbnail_path'], 'alt' => $variables['field_video_title'][0]['value']),
            '#image_style' => FSI_IMAGE_STYLE_960x540,
          );
        }
        break;
      case 'grid_video':
        if (!empty($variables['field_grid_video_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_grid_video_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
      case 'cards_block':
        if (!empty($variables['field_cards_block_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_cards_block_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }

        // Group cards in groups by 3 items.
        $items = $variables['field_cards_block_items'];
        $group_limit = 3;
        $i = 0;
        $group_arr = [];
        foreach ($items as $key => $item) {
          if ($i <= $group_limit) {
            $group_arr[] = $key;
            $i++;
            if ($i == $group_limit) {
              $variables['content']['#group_items'][] = $group_arr;
              $group_arr = [];
              $i = 0;
            }
          }
        }
        if (!empty($group_arr)) {
          $variables['content']['#group_items'][] = $group_arr;
        }

        break;
      case 'gallery_block':
        if (!empty($variables['field_gallery_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_gallery_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
      case 'text_columns':
        if (!empty($variables['field_text_col_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_text_col_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }

        if (!empty($variables['content']['field_text_col_items']['#items'])) {
          $variables['content']['#items_count'] = 'block-text-cols--' . count($variables['content']['field_text_col_items']['#items']) . 'cols';
        }
        else {
          $variables['content']['#items_count'] = '';
        }
        break;
      case 'colored_tile':
        if (!empty($variables['field_tile_bg_color'][0]['rgb'])) {
          $color = strtoupper($variables['field_tile_bg_color'][0]['rgb']);
          $variables['content']['#bg_color'] = $bg_collor_name[$color];
        }
        break;
    }
  }
}

function fsi_preprocess_calendar_mini(&$vars) {
  switch ($vars['view']->name) {
    case 'fsi_calendar':
      $today = date_format(date_now(date_default_timezone()), DATE_FORMAT_DATE);
      $arg = arg(1);
      foreach ($vars['rows'] as $key => $row) {
        foreach ($row as $item => $cell) {
          if (!empty($arg) && (strlen($arg) == 10)) {
            if ($cell['id'] == $vars['view']->name . '-' . arg(1)) {
              $vars['rows'][$key][$item]['class'] .= ' day-selected';
            }
          }
          elseif ($cell['id'] == $vars['view']->name . '-' . $today) {
            $vars['rows'][$key][$item]['class'] .= ' today-bg';
          }
        }
      }
      break;
  }
}
