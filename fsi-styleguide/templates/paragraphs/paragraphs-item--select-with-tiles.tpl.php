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
<div class="fsird-tabs__content <?php print $content['#active_class']; ?>">
  <h3 class="vertical-tabs__title"><?php print render($content['field_select_heading']); ?></h3>
  <div class="vertical-tabs__body">
    <p>
      <?php print render($content['field_select_body']); ?>
    </p>
  </div>
  <div class="btn--responsive btn--uppercase"><?php print render($content['field_select_button']); ?></div>
  <div class="vertical-tabs__list">
    <?php foreach ($content['field_select_tiles']['#items'] as $delta => $item): ?>
      <div class="vertical-tabs__item <?php print $delta % 2 ? 'even' : 'odd'; ?>">
        <?php print render($content['field_select_tiles'][$delta])?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
