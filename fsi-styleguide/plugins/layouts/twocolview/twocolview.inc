<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('2 Columns'),
  'category' => t('Panel fields'),
  'icon' => 'twocolview.png',
  'theme' => 'panels_twocolview',
  'css' => 'twocolview.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'two' => t('Column Two')
  ),
);