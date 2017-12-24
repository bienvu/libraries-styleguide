<?php

// Plugin definition
$plugin = array(
  'title' => t('FSI Paragraphs views Two column'),
  'category' => t('Columns: 2'),
  'icon' => 'fsi-paragraph-views-twocol.png',
  'theme' => 'panels_fsi_paragraph_views_twocol',
  'css' => 'fsi-paragraph-views-twocol.css',
  'regions' => array(
    'left' => t('Left side'),
    'right' => t('Right side'),
  ),
);
