<?php

// Plugin definition
$plugin = array(
  'title' => t('PP Two Columns'),
  'category' => t('PP Layouts'),
  'icon' => 'pp_twocol.png',
  'theme' => 'pp_twocol', 
  'theme arguments' => array('id', 'content'),
  'css' => 'pp-twocol.css',
  'regions' => array(
    'top-region' => t('Top region'),
    'content' => t('Left Side'),
    'sidebar' => t('Right Side'),
    'bottom-region' => t('Bottom Region'),
  )
);
