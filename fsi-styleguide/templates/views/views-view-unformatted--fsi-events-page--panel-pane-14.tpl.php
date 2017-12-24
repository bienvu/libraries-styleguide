<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<div class="events-dates-in-flex-slider">
  <div class="flexslider">
    <ul class="slides">
      <?php foreach ($rows as $id => $row): ?>
          <?php print $row; ?>
      <?php endforeach; ?>
    </ul>
  </div>
</div>