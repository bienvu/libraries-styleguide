<?php
/**
 * @file
 * Definition of the 'grids' panel style.
 */

// Plugin definition
$plugin = array(
  'title' => t('Grey panes'),
  'description' => t('Give all panes grey background'),
  'render region' => 'panels_greyblocks_style_render_region',
  'settings form' => 'panels_greyblocks_style_settings_form',
);

/**
 * Render callback.
 *
 * @ingroup themeable
 */
function theme_panels_greyblocks_style_render_region($vars) {
  $panes = $vars['panes'];
  $settings = $vars['settings'];
  $items = array();

  foreach ($panes as $pane_id => $item) {
    $items[] = $item;
  }
  
  $rendered_items = implode('</div><div class="grey-block-pane">', $items);

  if (empty($settings['grid_qty'])) {
    $gridqty = '12';
  }else{
    $gridqty = $settings['grid_qty'];
  }
  $region_class = 'grey-block-region span' . $gridqty;

  if ($rendered_items) {
    $rendered_items = '<div class="grey-block-pane">' . $rendered_items . '</div>';
    return '<div class="' . $region_class . '">' . $rendered_items . '</div>';  
  } else {
    return '<div class="empty-panes">' . $rendered_items . '</div>';  
  }
}

/**
 * Settings form callback.
 */
function panels_greyblocks_style_settings_form($style_settings) {

  $columns_array = array();
  for ($i = 1; $i <= 12; $i++) {
    $columns_array[$i] = $i . '  Columns';
  }

  $form['grid_qty'] = array(
    '#type' => 'select',
    '#title' => t('Grid Size'),
    '#options' => $columns_array,
    '#default_value' => (isset($style_settings['grid_qty'])) ? $style_settings['grid_qty'] : '12',
  );

  return $form;
}
