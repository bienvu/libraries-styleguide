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
<div class="block-bio__item">
  <div class="block-bio__image">
    <?php print render($content['field_bio_image'][0]); ?>
  </div>
  <div class="block-bio__content">
    <h3 class="block-bio__name">
      <?php print render($content['field_bio_name']); ?>
    </h3>
    <div class="block-bio__job">
      <?php print render($content['field_bio_job_title']); ?>
    </div>
    <span class="block-bio__academic">
    <?php print render($content['field_bio_academic_title']); ?>
  </span>
    <div class="block-bio__description">
      <p>
        <?php print render($content['field_bio_description']); ?>
        <span class="block-bio__quote">
        <?php print render($content['field_bio_publication']); ?>
      </span>
      </p>
    </div>
    <div class="block-bio__links">
      <?php if (!empty($content['field_bio_read_more_link']['#items'][0]['url'])): ?>
        <a class="block-bio__links__item link--charade"
           href="<?php print render($content['field_bio_read_more_link']); ?>">Read
          More</a>
      <?php endif; ?>
      <?php if (!empty($content['field_bio_full_bio_link']['#items'][0]['url'])): ?>
        <a class="block-bio__links__item link--charade"
           href="<?php print render($content['field_bio_full_bio_link']); ?>">Full
          Bio</a>
      <?php endif; ?>
    </div>
  </div>
</div>
