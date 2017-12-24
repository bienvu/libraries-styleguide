<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('News two columns'),
  'category' => t('Columns: 2'),
  'theme' => 'newstwocol',
  'css' => 'newstwocol.css',
  'regions' => array(
    'left' => t('Left side'),
    'right' => t('Right side'),
    'bottom' => t('Bottom side')
  ),
);
