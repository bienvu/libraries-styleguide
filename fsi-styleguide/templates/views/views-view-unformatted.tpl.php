<?php
/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php
$query_comments = explode('|', $view->query->options['query_comment']);
//$fourth_column_class = (in_array('fourth_column_class', $query_comments)) ? TRUE : FALSE;
$fourth_column_class = (in_array($view->current_display, array('search_api_mediaguide', 'search_api_people_directory', 'panel_pane_1')) ||
  in_array('fourth_column_class', $query_comments)) ? TRUE : FALSE;

foreach ($rows as $id => $row):
  $third_row_class = ($fourth_column_class && ($id % 3 == 0) && ($id != 0)) ? ' three-columns-fourth-element' : '';
  ?>
  <div<?php
  if ($classes_array[$id]) {
    print ' class="' . $classes_array[$id] . $third_row_class . '"';
  }
  ?>>
  <?php print $row; ?>
  </div>
<?php endforeach; ?>