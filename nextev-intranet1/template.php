<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

/**
 * Override or insert variables into the html template.
 */
function ffw_styleguide_preprocess_html(&$vars) {
  // Add our custom CSS after all other CSS.
  drupal_add_css(path_to_theme() . '/css/styles.css', array(
    'weight' => 999,
    'preprocess' => false,
  ));
  // Load modernizr.
  drupal_add_js(
    path_to_theme(). '/js/lib/modernizr.min.js',
    array(
      'group' => JS_LIBRARY,
      'every_page' => TRUE,
      'preprocess' => TRUE,
      'weight' => -1,
      'scope' => 'head_scripts',
    )
  );
  //Create header scope for js placement
  $vars['head_scripts'] = drupal_get_js('head_scripts');
  // Add our custom JS in footer, after all other JS.
  drupal_add_js(path_to_theme() . '/js/script.js', array(
    'scope' => 'footer',
    'weight' => 999,
    'preprocess' => false,
  ));
}

/**
 * Override or insert variables into the page template.
 */
function ffw_styleguide_preprocess_page(&$vars) {
  $vars['logo'] = '/' . path_to_theme() . '/logo.svg';
}
