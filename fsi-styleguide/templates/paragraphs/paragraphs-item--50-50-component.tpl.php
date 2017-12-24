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
<div id="<?php print $sticky_nav_paragraph_id; ?>" class="image-texts <?php print $content['#position']; ?> <?php print $content['#bg_color']; ?>">
  <div class="image-texts__image">
    <?php print render($content['field_50_50_bg_image'])?>
  </div>
    <div class="container">
      <div class="image-texts__content-wrap">
        <div class="image-texts__content">
          <h2 class="big-title"><?php print render($content['field_50_50_heading'])?></h2>
          <div class="image-texts__body">
            <p>
              <?php print render($content['field_50_50_subheading'])?>
            </p>
          </div>
          <div class="link-more-wrap">
            <?php print render($content['field_50_50_link'])?>
          </div>
        </div>
      </div>
    </div>
</div>
<?php if (!empty($content['field_scroll_down_nav'])): ?>
  <?php print render($content['field_scroll_down_nav'])?>
<?php endif; ?>
