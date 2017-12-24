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
<div id="<?php print $sticky_nav_paragraph_id; ?>" class="block-bio distance-component col<?php print $content['#items_count']; ?> <?php print $content['#bg_collor']; ?>">
  <div class="container">
    <h2 class="block-bio__title font--biggest">
      <?php print render($content['field_bio_block_heading'][0]); ?>
    </h2>
    <div class="block-bio__body">
      <p>
        <?php print render($content['field_bio_block_description'][0]); ?>
      </p>
    </div>
    <?php print render($content['field_bio_block_bios']); ?>
    <?php if (!empty($content['field_bio_block_button']['#items'][0]['url'])): ?>
      <div class="block-bio__link btn--responsive btn--uppercase">
        <?php print render($content['field_bio_block_button']); ?>
      </div>
    <?php endif; ?>
  </div>
</div>
<?php if (!empty($content['field_scroll_down_nav'])): ?>
  <?php print render($content['field_scroll_down_nav'])?>
<?php endif; ?>
