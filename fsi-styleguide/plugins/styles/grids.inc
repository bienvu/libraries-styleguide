<?php
/**
 * @file
 * Definition of the 'grids' panel style.
 */

// Plugin definition
$plugin = array(
  'title' => t('Grid Region'),
  'description' => t('Choose a grid for region'),
  'render region' => 'panels_grids_style_render_region',
  'settings form' => 'panels_grids_style_settings_form',
);

/**
 * Render callback.
 *
 * @ingroup themeable
 */
function theme_panels_grids_style_render_region($vars) {
  $panes = $vars['panes'];
  $settings = $vars['settings'];
  $additional_classes = '';
  $items = array();

  foreach ($panes as $pane_id => $item) {
    $items[] = $item;
  }  
  if (empty($settings['grid_qty'])) {
    $settings['grid_qty'] = '12';
  }
  if (isset($settings['grid_push']) && $settings['grid_push'] != '0') {
    $additional_classes .= ' offset' . $settings['grid_push'];
  }
  if (isset($settings['alpha']) && $settings['alpha'] != 0) {
    $additional_classes .= ' alpha';
  }
  if (isset($settings['omega']) && $settings['omega'] != 0) {
    $additional_classes .= ' omega';
  }
  $rendered_items = implode($items);
  $grid_class = 'span' . $settings['grid_qty'] . $additional_classes;

  if ($rendered_items) {
    return '<div class="' . $grid_class . '">' . $rendered_items . '</div>';  
  } else {
    return $rendered_items;  
  }  
}

/**
 * Settings form callback.
 */
function panels_grids_style_settings_form($style_settings) {

  $columns_array = array();
  for ($i = 1; $i <= 12; $i++) {
    $columns_array[$i] = $i . '  Columns';
  }
  
  $columns_push = array();
  $columns_push['0'] = 'No Push';
  for ($i = 1; $i <= 12; $i++) {
    $columns_push[$i] = $i . '  Columns';
  }

  $form['grid_qty'] = array(
    '#type' => 'select',
    '#title' => t('Grid Size'),
    '#options' => $columns_array,
    '#default_value' => (isset($style_settings['grid_qty'])) ? $style_settings['grid_qty'] : '12',
  );
  $form['alpha'] = array(
  '#type' =>'checkbox',
  '#title' => t('No left margin (alpha)'),
  '#default_value' => (isset($style_settings['alpha'])) ? $style_settings['alpha'] : 0,
  );
  $form['omega'] = array(
  '#type' =>'checkbox',
  '#title' => t('No right margin (omega)'),
  '#default_value' => (isset($style_settings['omega'])) ? $style_settings['omega'] : 0,
  );
  $form['grid_push'] = array(
    '#type' => 'select',
    '#title' => t('Grid Offset'),
    '#options' => $columns_push,
    '#default_value' => (isset($style_settings['grid_push'])) ? $style_settings['grid_push'] : '0',
  );

  return $form;
}

