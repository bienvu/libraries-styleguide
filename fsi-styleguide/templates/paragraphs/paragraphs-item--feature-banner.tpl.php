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
<div id="<?php print $sticky_nav_paragraph_id; ?>" class="feature-banner bg--overlay">
  <div class="feature-banner__image">
    <?php print render($content['field_fbanner_bg_image'])?>
  </div>
  <div class="container">
    <div class="feature-banner__content text--<?php print $content['field_fbanner_align'][0]['#markup'] ?>">
      <h1 class="feature-banner__title"><?php print render($content['field_fbanner_heading'])?></h1>
      <div class="feature-banner__body">
        <p>
          <?php print render($content['field_fbanner_subheading'])?>
        </p>
      </div>
    </div>
  </div>
</div>
<?php if (!empty($content['field_scroll_down_nav'])): ?>
  <?php print render($content['field_scroll_down_nav'])?>
<?php endif; ?>