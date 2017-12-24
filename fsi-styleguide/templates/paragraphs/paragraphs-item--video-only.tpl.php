<?php

/**
 * @file
 * Default theme implementation for a single paragraph item.
 *
 * Available variables:
 * - $content: An array of content items. Use render($content) to print them
 *   all, or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity
 *   - entity-paragraphs-item
 *   - paragraphs-item-{bundle}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened into
 *   a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
?>
<div class="video-wrap js-play-video">
  <?php print render($content['field_video_embed']); ?>
  <div class="video-wrap__poster">
    <span class="video-wrap__icon icon-play"></span>
    <?php if (!empty($content['field_video_thumbnail'])): ?>
      <?php print render($content['field_video_thumbnail']); ?>
    <?php else: ?>
      <?php print render($content['video_thumbnail']); ?>
    <?php endif;?>
  </div>
</div>
<h2 class="small-title"><?php print render($content['field_video_title']); ?></h2>
<div class="box-feature__body">
  <p>
    <?php print render($content['field_video_description']); ?>
  </p>
</div>
