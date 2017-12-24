<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('(3) Three Columns'),
  'category' => t('Columns'),
  'icon' => 'threecolumn.png',
  'theme' => 'panels_threecolumn',
  'css' => 'threecolumn.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'two' => t('Column Two'),
  	'three' => t('Column Three')
  ),
);