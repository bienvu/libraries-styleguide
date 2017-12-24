<?php

// Plugin definition
$plugin = array(
  'title' => t('FSI Frontpage'),
  'category' => t('Columns: 2'),
  'icon' => 'frontpage.png',
  'theme' => 'panels_frontpage',
  'css' => 'frontpage.css',
  'regions' => array(
    'top' => t('Top'),
    'middle' => t('Left column'),
    'right' => t('Right column'),
    'bottom' => t('Bottom'),
  ),
);
