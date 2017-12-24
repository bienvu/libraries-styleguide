<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Events Single page'),
  'category' => t('Stacks'),
  'icon' => 'eventssingle.png',
  'theme' => 'panels_eventssingle',
  'css' => 'eventssingle.css',
  'regions' => array(
  	'one' => t('Column One'),
  	'evleft' => t('Event Image'),
  	'evright' => t('Event description'),
  	'evother' => t('Related Events'),
  	'two' => t('Column Two')
  ),
);