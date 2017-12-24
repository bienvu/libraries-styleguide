<?php

/**
 * @file
 * Default theme implementation for a group of paragraph items.
 *
 * Available variables:
 * - $content: Rendered HTML of content items.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - paragraphs-items
 *   - paragraphs-items-{field_name}
 *   - paragraphs-items-{field_name}-{view_mode}
 *   - paragraphs-items-{view_mode}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_paragraphs_items()
 * @see template_process()
 */
?>
<ul class="fsird-tabs__list">
  <?php
    $delta = reset(array_keys($element['#items']));
    $first_item = $element['#items'][$delta];
    $first_item_heading = $element[$delta]['entity']['paragraphs_item'][$first_item['value']]['field_select_heading'];
  ?>
  <div class="fsird-tabs__dropdown__text js-fsird-tabs__dropdown"><?php print render($first_item_heading); ?></div>
  <div class="fsird-tabs__list__dropdown">
    <?php foreach ($element['#items'] as $delta => $item): ?>
      <?php if ($delta == 0): ?>
        <?php $is_active = 'active'; ?>
        <?php else:?>
        <?php $is_active = ''; ?>
      <?php endif; ?>
      <li class="fsird-tabs__list__item js-fsird-tabs__list__item <?php print $is_active; ?>" data-index="<?php print $delta; ?>"><span>
        <?php print render($element[$delta]['entity']['paragraphs_item'][$item['value']]['field_select_heading']); ?></span>
      </li>
    <?php endforeach; ?>
  </div>
</ul>
<div class="fsird-tabs__section">
  <?php print render($content); ?>
</div>
