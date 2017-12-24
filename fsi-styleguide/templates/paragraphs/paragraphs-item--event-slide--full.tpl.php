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
<div class="carousel-banner__item bg--overlay">
  <div class="block-stats__image">
    <?php print render($content['field_slide_bg_image']); ?>
  </div>
  <div class="container">
    <div class="block-stats__content">
      <div class="small--title">
        <?php print render($content['field_slide_heading']); ?>
      </div>
      <h3 class="carousel-banner__title">
        <?php print render($content['field_slide_event_title']); ?>
      </h3>
      <div class="carousel-banner__body">
        <span class="carousel-banner__datetime">
          <?php print render($content['field_slide_event_date']); ?>
        </span>
        <span class="carousel-banner__speaker">
          <?php print render($content['field_slide_event_speaker']); ?>
        </span>
      </div>
    </div>
  </div>
</div>
