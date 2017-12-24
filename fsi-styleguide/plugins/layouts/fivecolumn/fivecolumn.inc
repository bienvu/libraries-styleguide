<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('(5) Five Columns'),
  'category' => t('Columns'),
  'icon' => 'fivecolumn.png',
  'theme' => 'panels_fivecolumn',
  'css' => 'fivecolumn.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'two' => t('Column Two'),
  	'three' => t('Column Three'),
    'four' => t('Column Four'),
    'five' => t('Column Five')
  ),
);