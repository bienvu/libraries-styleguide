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
<?php if (!empty($content['field_text_block_bg_image'])): ?>
  <div id="<?php print $sticky_nav_paragraph_id; ?>" class="text-block text-block--has-image">
    <div class="text-block__image">
      <?php print render($content['field_text_block_bg_image'])?>
    </div>
<?php else: ?>
  <div id="<?php print $sticky_nav_paragraph_id; ?>" class="text-block">
<?php endif; ?>
  <div class="text-block__content container bg--white">
    <h2 class="big-title"><?php print render($content['field_text_block_title'])?></h2>
    <div class="text-block__body">
      <?php print render($content['field_text_block_textarea'])?>
    </div>
  </div>
</div>
