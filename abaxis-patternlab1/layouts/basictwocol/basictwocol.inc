<?php

// Plugin definition
$plugin = array(
  'title' => t('Basic two column'),
  'category' => t('Columns: 2'),
  'icon' => 'basictwocol.png',
  'theme' => 'panels_basictwocol',
  'css' => 'basictwocol.css',
  'regions' => array(
    'top' => t('Top content'),
    'left' => t('Left content'),
    'right' => t('Right content'),
    'bottom' => t('Bottom content'),
  ),
);
