<?php

/**
 * implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title' => t('Support two columns'),
  'category' => t('Columns: 2'),
  'theme' => 'supporttwocol',
  'css' => 'supporttwocol.css',
  'regions' => array(
    'top' => t('Top side'),
    'contact_form' => t('Contact Form'),
    'veterinary_faq' => t('Veterinary FAQ'),
    'medical_faq' => t('Medical FAQ'),
    'right' => t('Right side'),
  ),
);
