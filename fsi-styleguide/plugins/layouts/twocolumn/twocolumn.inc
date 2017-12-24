<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('(2) Two Columns'),
  'category' => t('Columns'),
  'icon' => 'twocolumn.png',
  'theme' => 'panels_twocolumn',
  'css' => 'twocolumn.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'two' => t('Column Two')
  ),
);