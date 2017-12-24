<?php

/**
 * @file
 * Default theme implementation to display image block content.
 *
 * Available variables:
 * - $image: Block image.
 * - $content: Block content.
 * - $block: Block object.
 *
 * @see template_preprocess()
 * @see template_preprocess_imageblock_content()
 */
?>
<?php if ($image): ?>
  <div class="footer-global__logo">
    <?php print $image ?>
  </div>
<?php endif; ?>

<?php if ($content): ?>
  <?php print $content ?>
<?php endif; ?>
