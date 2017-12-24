<?php
/**
 * @file
 * Proofpoint responsive theme.
 */

/**
 * Override or insert variables into the html template.
 */
function proofpoint_preprocess_html(&$vars) {
  // Add our custom CSS after all other CSS.
  drupal_add_css(path_to_theme() . '/css/styles.css', array(
    'weight' => 999,
    'preprocess' => FALSE,
  ));
  // Load modernizr.
  drupal_add_js(
    path_to_theme() . '/js/lib/modernizr.min.js',
    array(
      'group' => JS_LIBRARY,
      'every_page' => TRUE,
      'preprocess' => TRUE,
      'weight' => -1,
      'scope' => 'head_scripts',
    )
  );
  // Create header scope for js placement.
  $vars['head_scripts'] = drupal_get_js('head_scripts');
  // drupal_add_js('https://www.youtube.com/player_api', array(
  //   'type' => 'external',
  //   'scope' => 'footer',
  //   'weight' => 1,
  // ));
  // Add our custom JS in footer, after all other JS.
  drupal_add_js(path_to_theme() . '/js/script.js', array(
    'scope' => 'footer',
    'weight' => 999,
    'preprocess' => FALSE,
  ));
  if (isset($vars['page']['header'])) {
    $vars['classes_array'][] = 'has-header-panel';
  }
  if (panels_get_current_page_display()) {
    $vars['classes_array'][] = 'page-panel';
  }
  //adding marketo munchkin JS to all pages
  drupal_add_js('//munchkin.marketo.net/munchkin.js', array('type' => 'external', 'scope' => 'footer', 'weight' => 10)
    );
  $munchkin_code = variable_get('marketo_ma_munchkin_account_id', '309-RHV-619');
  drupal_add_js('document.write(unescape("%3Cscript src=\'//munchkin.marketo.net/munchkin.js\' type=\'text/javascript\'%3E%3C/script%3E")); </script> <script>Munchkin.init(\'' . $munchkin_code . '\');',
    array('type' => 'inline', 'scope' => 'footer', 'weight' => 20)
  );
}

/**
 * Override or insert variables into the page template.
 */
function proofpoint_preprocess_page(&$vars) {
  $vars['logo'] = '/' . path_to_theme() . '/logo.svg';
  //Snapengage
  if (isset($vars['node']) && !empty($vars['node'])) {
    $node = $vars['node'];
    if ($node->type == 'paragraphs_page') {
      $widget_id = 'b8822ede-9d41-4608-9784-f95edab792c4';
      $inline_script = "
        (function() {
          var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
          se.src = '//storage.googleapis.com/code.snapengage.com/js/{$widget_id}.js';
          var done = false;
          se.onload = se.onreadystatechange = function() {
            if (!done&&(!this.readyState||this.readyState === 'loaded'||this.readyState === 'complete')) {
              done = true;
            }
          };
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
        })()";

      drupal_add_js($inline_script, array(
        'type' => 'inline',
        'scope' => 'footer',
      ));
    }
    //Add addthis on node page
    if (!in_array($node->type, array('customer_story', 'blog', 'corporate_blog_article', 'article'))) {
      unset($vars['page']['content']['addthis_addthis_block']);
    }
  }else {
    //Add addthis specific pages: /threat-insight, /corporate-blog
    $current_path = current_path();
    if (!in_array($current_path, array('threat-insight', 'corporate-blog'))) {
      unset($vars['page']['content']['addthis_addthis_block']);
    }
  }
  if ($vars['main_menu']) {
    $main_menu = $vars['main_menu'];
    if ($vars['secondary_menu']) {
      $secondary_menu = $vars['secondary_menu'];
      $secondary_menu_mobile = l(t('About Us'), '', array(
        'fragment' => 'main',
        'attributes' => array('class' => array('attached-block expanded-menu__button js-expanded-menu__button')),
      ));

      $secondary_menu_mobile .= '<div class="menu-attach-block-wrapper mega-menu expanded-menu__menu-child mega-menu__inner">';
      $secondary_menu_mobile .= theme('links__system_secondary_mobile_menu', array(
        'links' => $secondary_menu,
        'attributes' => array(
          'id' => 'secondary-mobile-menu-links',
          'class' => array('mega-menu__nav'),
        ),
        'heading' => array(
          'text' => t('Secondary mobile menu'),
          'level' => 'h2',
          'class' => array('element-invisible'),
        ),
      ));

      $secondary_menu_mobile .= '</div>';

      $main_menu['menu-mobile attached-block hidden-on-desktop'] = array(
        'alter' => TRUE,
        'html' => TRUE,
        'title' => $secondary_menu_mobile,
      );
    }

    $vars['main_menu'] = theme('links__system_main_menu', array(
      'links' => $main_menu,
      'attributes' => array(
        'id' => 'main-menu-links',
        'class' => array('main-menu', 'js-main-menu'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }
  if ($vars['secondary_menu']) {
    $secondary_menu = $vars['secondary_menu'];

    $vars['secondary_menu'] = theme('links__system_secondary_menu', array(
      'links' => $secondary_menu,
      'attributes' => array(
        'id' => 'secondary-menu-links',
        'class' => array('short-nav__content__item'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  //Custom logic hide/show main menu for node page paragraph
  if (isset($node)) {
    if ($node->type == 'paragraphs_page') {
      $wrap_node = entity_metadata_wrapper('node', $node);
      if (isset($wrap_node->field_menu_selecting)
        && isset($wrap_node->field_menu_options)) {
        $option_menu = $wrap_node->field_menu_options->value();
        $selecting_menu = $wrap_node->field_menu_selecting->value();
        switch ($option_menu) {
          case 'display_menu_custom':
            $menu_name = !empty($selecting_menu) ? $selecting_menu : 'main-menu';
            //Level 1
            $menu_tree = menu_navigation_links($menu_name);
            $vars['main_menu'] = theme('links__system_main_menu', array(
              'links' => $menu_tree,
              'attributes' => array(
                'id' => 'main-menu-links',
                'class' => array('main-menu', 'js-main-menu'),
              ),
              'heading' => array(
                'text' => t('Main menu'),
                'level' => 'h2',
                'class' => array('element-invisible'),
              ),
            ));
            break;
          case 'hide_menu':
            $vars['main_menu'] = '';
            break;
          default:
            break;
        }
      }
    }
  }
  $placeholder = array(
    '@year' => date('Y', REQUEST_TIME),
    '@site_name' => variable_get('site_name', 'Proofpoint'),
    '@link' => $vars['front_page'],
  );

  $vars['copyright'] = t('&copy; @year @site_name. All rights reserved. <a href="@link">Privacy Policy.</a>', $placeholder);

  $vars['content_classes'] = array('clearfix', 'main-content', 'container');

  if (panels_get_current_page_display()) {
    $vars['content_classes'] = array_diff($vars['content_classes'], array('main-content', 'container'));
  }

  $vars['content_classes'] = implode(' ', $vars['content_classes']);

}

/**
 * Processes variables for menu_attach_block.tpl.php.
 */
function proofpoint_preprocess_menu_attach_block_wrapper(&$vars) {
  array_push($vars['classes_array'], 'mega-menu', 'expanded-menu__menu-child');
  $vars['content'] = '<div class="mega-menu__inner">' . $vars['content'] . '</div>';
}

/**
* hook_form_FORM_ID_alter
*/
function proofpoint_form_search_block_form_alter(&$form, &$form_state, $form_id) {
  $form['search_block_form']['#attributes']['placeholder'] = t('Search');
}

/**
 * Implements hook_preprocess_block()
 */
function proofpoint_preprocess_block(&$vars) {
  $vars['title_attributes_array']['class'][] = 'block__title';
  $module_id = $vars['block_html_id'];
  switch ($module_id) {
    case 'block-search-form':
      /* Add class into block search */
      array_push($vars['classes_array'], 'header__search', 'search-box', 'js-search-box');
      break;
    case 'block-system-user-menu':
      /* Add class into user menu */
      array_push($vars['classes_array'], 'header__short-login', 'short-nav', 'short-nav--login');
      $vars['content'] = '<span class="short-nav__login-button js-short-nav__login-button">' . t('Login'). '</span><div class="short-nav__content">' . $vars['content'] . '</div>';
      break;

    case 'block-menu-menu-header-menu':
      /* Add class into user menu */
      array_push($vars['classes_array'], 'header__menu');
      break;

    case 'block-menu-menu-about-menu':
      /* Add class into about menu */
      $vars['content'] = '<div class="nav-footer">' . $vars['content'] . '</div>';
      break;

    case 'block-menu-menu-quick-links':
      /* Add class into quick links */
      $vars['content'] = '<div class="nav-footer">' . $vars['content'] . '</div>';
      break;

    case 'block-menu-menu-connect-menu':
      /* Add class into contect menu links */
      $vars['content'] = '<div class="list-social">' . $vars['content'] . '</div>';
      break;

    case 'block-menu-menu-menu-regions':
      /* Add class into menu regions */
      $vars['content'] = '<div class="list-region">' . $vars['content'] . '</div>';
      break;
  }
}

/**
 * Implements hook_preprocess_block()
 */
function proofpoint_menu_tree__user_menu($vars) {
  return '<ul class="short-nav__content__item">' . $vars['tree'] . '</ul>';
}

/**
 * Implements theme_links().
 * Render main menu support contrib menu_attach_block and menu attributes.
 */
function proofpoint_links__system_main_menu(&$vars) {
  $new_links = array();
  foreach ($vars['links'] as $key => $link) {
    if (array_key_exists('menu_attach_block', $link) && empty($link['menu_attach_block']['name']) == FALSE) {
      array_push($link['attributes']['class'], 'expanded-menu__button', 'js-expanded-menu__button');
    }

    if (array_key_exists('item_attributes', $link) && empty($link['item_attributes']['class']) == FALSE) {
      $key .= ' ' . $link['item_attributes']['class'];
    }

    $new_links[$key] = $link;
  }

  $vars['links'] = $new_links;

  return theme_links($vars);
}


/**
 * Implements hook_preprocess_field().
 */
function proofpoint_preprocess_field(&$variables) {
  $element = $variables['element'];
  $is_field_belong_node_article = ($element['#bundle'] == 'article' && $element['#entity_type'] == 'node') ? TRUE : FALSE;
  $view_mode = $element['#view_mode'];
  if ($element['#field_name'] == 'field_type' && $is_field_belong_node_article && $view_mode == 'teaser') {
    $node = $element['#object'];
    $node_wrap =  entity_metadata_wrapper('node', $node);
    //Render markup field type on article link to page /news with querystring
    $article_type_keys = $node_wrap->field_type->value();
    //Support multiple value future
    if (!is_array($article_type_keys)) {
      $article_type_keys = array($article_type_keys);
    }
    if (!empty($article_type_keys)) {
      foreach ($variables['items'] as $key => &$item) {
        $item['#markup'] = l($item['#markup'], 'news', array('query' => array('type' => $article_type_keys[$key])));
      }
    }
  }
}


/**
 * Implements hook_preprocess_node().
 */
function proofpoint_preprocess_node(&$variables) {
  $node = $variables['node'];
  if ($node->type == 'resource_item') {
    $variables['resource_type_icon'] = '';
    $variables['resource_item_url'] = '';
    $node_wrap = entity_metadata_wrapper('node', $node);
    $resource_type = $node_wrap->field_resource_type->value();
    if (is_object($resource_type)) {
      $resource_type_wrap = entity_metadata_wrapper('taxonomy_term', $resource_type);
      $resource_type_icon = $resource_type_wrap->field_fontawesome_icon->value();
      $variables['resource_type_icon'] = $resource_type_icon;
    }
    //Resource file or Resource link
    $resource_fields = array(
      'field_resource_link',
      'field_resource_file',
    );
    foreach ($resource_fields as $field_name) {
      if ($resoure = $node_wrap->{$field_name}->value()) {
        //If resource is file
        if (isset($resoure['fid'])) {
          $variables['resource_item_url'] = file_create_url($resoure['uri']);
        }else {
          //Is link
          $variables['resource_item_url'] = $resoure['url'];
        }
      }
    }
  }
  //We hide Links language on some node types
  $node_types_need_hide_links_language_switch = array(
    'article',
    'blog',
    'corporate_blog_article',
    'customer_story',
  );
  if (in_array($node->type, $node_types_need_hide_links_language_switch)) {
    unset($variables['content']['links']['translation']);
  }
}

/**
 * Implements hook_css_alter().
 */
function proofpoint_css_alter(&$css) {
  $exclude = array(
    '//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css' => FALSE,
  );
  $css = array_diff_key($css, $exclude);
}


/**
 * Implements hook_css_alter().
 * see template_preprocess_search_api_page_result();
 */
function proofpoint_preprocess_search_api_page_result(&$variables) {
  $index = $variables['index'];
  $variables['id'] = $variables['result']['id'];
  $item = $variables['item'];

  $wrapper = $index->entityWrapper($item, FALSE);
  $variables['image'] = array();
  if ($index->machine_name == 'content_index') {
    switch ($item->type) {
      case 'corporate_blog_article':
        $field_image = 'field_images';
        break;
      case 'customer_story':
        $field_image = 'field_image';
        break;
      case 'article':
        $field_image = 'field_image';
        break;
      case 'blog':
        $field_image = 'field_image';
        break;
      default:
        $field_image = '';
        break;
    }
    if (!empty($field_image)) {
      if (isset($wrapper->{$field_image})) {
        $image_data = $wrapper->{$field_image}->value();
        if (!empty($image_data)) {
          $variables['image'] = array(
            '#theme' => 'image_formatter',
            '#item' => isset($image_data[0]) ? $image_data[0]: $image_data, //Support multiple field
            '#image_style' => 'medium',
            '#path' => entity_uri('node', $item),
          );
        }
      }
    }
  }
}

/**
 * Implements template_preprocess_panels_pane()
 */
function proofpoint_preprocess_panels_pane(&$vars) {
  $pane = $vars['pane'];
  if ($pane->subtype == 'views--exp-search_index-panel_pane_1') {
    $vars['title_attributes_array']['class'][] = 'form-banner__title';
    $form_search = $vars['content'];
    $pane_title = $vars['title'];
    $vars['title'] = '';
    $advanced_search = '<div class="form-banner__content bg--slate-grey">
      <div class="container">
        <p>Nulla et lacus vitae dui faucibus posuere vel in est. Curabitur ut ullamcorper tortor. Vivamus sagittis nibh vitae enim varius, ac porttitor metus rutrum. Pellentesque pharetra lorem iaculis risus blandit, et lacinia magna iaculis</p>
      </div>
    </div>';
    $vars['content'] = array();
    $vars['content'] = array(
      'basic_search' => array(
        '#theme_wrappers' => array('container'),
        '#attributes' => array(
         'class' => array('box-hero__content text--center')
        ),
        'title' => array(
          '#markup' => '<h1 class="form-banner__title">' . $pane_title . '</h1>',
        ),
        'form' => array(
          '#markup' => $form_search,
        ),
        '#prefix' => '<div class="container">',
        '#suffix' => '</div>',
      ),
      'advanced_search' => array(
        '#markup' => $advanced_search
      ),
    );
  }
}

/**
 * Implements template_preprocess_views_exposed_form()
 */
function proofpoint_preprocess_views_exposed_form(&$vars) {
  $form = $vars['form'];
  if ($form['#id'] == 'views-exposed-form-search-index-panel-pane-1') {
    //Custom text advanced collaped
    $actions_advanced = new stdClass();
    $actions_advanced->widget = '<div class="actions__advanced">
          <span class="js-actions__advanced">Advanced</span></div>';
    $actions_advanced->id = 'actions-advanced';
    $actions_advanced->label = NULL;
    $actions_advanced->operator = '';
    $actions_advanced->description = NULL;

    $vars['widgets']['actions_advanced'] = $actions_advanced;
  }
}

/**
 *
 */
function proofpoint_preprocess_views_view_unformatted(&$vars) {
  $view = $vars['view'];
  if ($view->name == 'search_index' && $view->current_display == 'panel_pane_1') {
    foreach ($vars['classes'] as $key => $value) {
      $value[] = 'search-results__item';
      if (isset($vars['classes_array'][$key])) {
        $vars['classes_array'][$key] = implode(' ', $value);
      }
    }
  }
}

/**
 *
 */
function proofpoint_preprocess_views_view(&$vars) {
  $view = $vars['view'];
  if ($view->name == 'search_index' && $view->current_display == 'panel_pane_1') {
    $vars['header'] = '<h3 class="search-results__counter">' . t('Showing @total result(s)', array('@total' => $view->total_rows)). '</h3>';
  }
}
