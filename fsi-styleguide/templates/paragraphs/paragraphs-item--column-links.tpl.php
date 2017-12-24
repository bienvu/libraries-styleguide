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
<div class="block-two-links__half bg--overlay block-two-links__left js-block-two-links__half">
  <div class="block-two-links__image">
    <?php print render($content['field_column_bg_image']); ?>
  </div>
  <div class="block-two-links__content">
    <h2 class="block-two-links__content__title font--biggest"><?php print render($content['field_column_heading']); ?></h2>
    <div class="block-two-links__content__body">
      <p>
        <?php print render($content['field_column_subheading']); ?>
      </p>
    </div>
    <?php print render($content['field_column_links']); ?>
    <div class="block-two-links__content__link btn--responsive btn--capitalize">
      <?php print render($content['field_column_button']); ?>
    </div>
  </div>
</div>

