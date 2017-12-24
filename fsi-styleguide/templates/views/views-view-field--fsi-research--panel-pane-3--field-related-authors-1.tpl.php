<?php

//Get the numeric ID for the field_related_authors field.
$authid = FALSE;
if (isset($row->_field_data['nid']['entity'])) {
  if (isset($row->field_data['nid']['entity']->field_related_authors)) {
  	$authid = $row->_field_data['nid']['entity']->field_related_authors[LANGUAGE_NONE][0]['value'];
  }
}

//Set initial output as being null.

$output = '';

//Access the field_author_organization value and override it such that, when the field is empty,
//nothing is displayed at all, and if there is a value, put a "- " in front of it.
//This is done due to the inabillity of the Entity View Modes module to fully hide the field if empty.
if ($authid && isset($row->field_field_related_authors_1[0]['rendered']['entity']['field_collection_item'][$authid])) {
  if (isset($row->field_field_related_authors_1[0]['rendered']['entity']['field_collection_item'][$authid]['field_author_organization']['#items'])) {
    $authorg = $row->field_field_related_authors_1[0]['rendered']['entity']['field_collection_item'][$authid]['field_author_organization']['#items'][0]['value'];
    $output = '- ' . $authorg;
    print $output;
  }
}