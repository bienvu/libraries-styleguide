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
<div class="demo-scroll-inner box-scroll--wrapper <?php print $content['#scroll_has_icon_class']; ?>">
  <div class="box-scroll">
    <div class="box-scroll__top <?php print $content['#scroll_top_class']; ?>">
      <?php if ($content['#scroll_has_icon']): ?>
        <div class="scroll__icon js-scroll-down">
          <div class="mouse"><div class="wheel"></div></div>
          <div>
            <span class="unu"></span>
            <span class="doi"></span>
          </div>
        </div>
      <?php endif; ?>
      <div class="scroll__content">
        <?php if (!empty($content['field_scroll_label_top'])): ?>
          <div class="scroll__title">
            <?php print render($content['field_scroll_label_top']); ?>
          </div>
        <?php endif; ?>
        <div class="scroll__sub">
          <?php print render($content['field_scroll_heading']); ?>
        </div>
      </div>
      <div class="box-scroll__line"></div>
    </div>
    <?php if (!empty($content['field_scroll_label_bottom'])): ?>
      <div class="box-scroll__bottom">
        <h2 class="scroll__heading">
          <?php print render($content['field_scroll_label_bottom']); ?>
        </h2>
      </div>
    <?php endif; ?>
  </div>
</div>
