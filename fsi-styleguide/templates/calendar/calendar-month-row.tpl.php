<?php
/**
 * @file
 * Template to display a row
 * 
 * - $inner: The rendered string of the row's contents.
 */
$attrs = ($class) ? 'class="' . $class . '"': '';
$attrs .= ($iehint > 0) ? ' iehint="' . $iehint . '"' : '';
?>
<?php
  if ($attrs != ''): ?>
  <tr class="calendar-date-row">
  <?php else: ?>
  <tr>
  <?php endif;?>
    <?php print $inner ?>
  </tr>
