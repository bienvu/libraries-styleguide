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

<div class="box-grid__item__inner bg--stanford-beige10">
  <div class="box-grid__image">
    <?php print render($content['field_tile_bg_image']); ?>
  </div>
  <div class="box-grid__group">
    <div class="box-grid__type type type--research">Research</div>
    <h3 class="box-grid__title">
      <a href='<?php print render($content['field_tile_link'][0]['#element']['url']); ?>'>
        <?php print render($content['field_tile_title']); ?>
      </a>
    </h3>
    <div class="box-grid__body">
      <p>
        <?php print render($content['field_tile_hover_text']); ?>
      </p>
    </div>
  </div>
</div>
