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
<div id="<?php print $sticky_nav_paragraph_id; ?>" class="block-two-column-views distance-component <?php print $content['#bg_color']; ?>">
  <div class="container">
    <h2 class="block-two-column-views__title text-center hidden-on-tablet font--biggest"><?php print $content['#mobile_text']; ?></h2>
    <div class="fsird-tabs fsird-tabs--horizontal">
      <ul class="fsird-tabs__list hidden-on-tablet">
        <li class="fsird-tabs__list__item js-fsird-tabs__list__item active" data-index="0"><?php print $content['#col1_view_name'];?></li>
        <li class="fsird-tabs__list__item js-fsird-tabs__list__item" data-index="1"><?php print $content['#col2_view_name'];?></li>
      </ul>
      <div class="fsird-tabs__section">
        <div class="fsird-tabs__content active">
          <?php print render($content['field_column_one']); ?>
        </div>
        <div class="fsird-tabs__content">
          <?php print render($content['field_column_2']); ?>
        </div>
      </div>
    </div>
  </div>
</div>
<?php if (!empty($content['field_scroll_down_nav'])): ?>
  <?php print render($content['field_scroll_down_nav'])?>
<?php endif; ?>
