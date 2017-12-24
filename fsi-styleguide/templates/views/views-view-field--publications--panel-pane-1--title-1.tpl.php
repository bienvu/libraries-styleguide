<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php

$reg_pattern = '/<p class="more-pub-author_link">([0-9]*)<\/p>/Usmi';
preg_match($reg_pattern, $output, $match);
$alias = drupal_lookup_path('alias', 'node/' . $match[1]);
$alias_arr = explode('/', $alias);
$people_name = $row->node_field_data_field_ref_user_title;
$out_link = '» More ' . l('publications from ' . $people_name, 'people/publications/' . $alias_arr[1]);
$out = preg_replace($reg_pattern, $out_link, $output);

print str_replace('<p class="desc-pub-author_text"> and ', '<p class="desc-pub-author_text">', $out)

?>