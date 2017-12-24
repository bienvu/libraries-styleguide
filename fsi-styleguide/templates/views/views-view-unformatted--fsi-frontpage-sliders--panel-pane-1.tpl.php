<?php

/**
 * @file
 * Template for Frontpage Carousel output
 *
 * @ingroup views_templates
 */
?>
<div id="myCarousel" class="carousel slide">
  <ol class="carousel-indicators">
    <?php foreach ($rows as $id => $row): ?>
      <li data-target="#myCarousel" data-slide-to="<?php print $id ?>"></li>
    <?php endforeach; ?>
  </ol>
  <div class="carousel-inner">
    <?php foreach ($rows as $id => $row): ?>
      <div class="item">
        <?php print $row; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
