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
<div id="<?php print $sticky_nav_paragraph_id; ?>" class="block-box__html block-stats js-scroll <?php print $content['#bg_collor']; ?>">
  <div class="container">
    <div class="block-stats__content">
      <div class="block-stats__inner">
        <?php print render($content['field_html_box_body']); ?>
      </div>
    </div>
  </div>
</div>
<?php if (!empty($content['field_scroll_down_nav'])): ?>
  <?php print render($content['field_scroll_down_nav'])?>
<?php endif; ?>
