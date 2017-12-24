<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('(4) Four Columns'),
  'category' => t('Columns'),
  'icon' => 'fourcolumn.png',
  'theme' => 'panels_fourcolumn',
  'css' => 'fourcolumn.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'two' => t('Column Two'),
  	'three' => t('Column Three'),
    'four' => t('Column Four')
  ),
);