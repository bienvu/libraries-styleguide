<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Single column'),
  'category' => t('Columns: 1'),
  'theme' => 'onecol',
  'icon' => 'onecol.png',
  'css' => 'onecol.css',
  'regions' => array(
    'middle' => t('Middle column'),
  ),
);
