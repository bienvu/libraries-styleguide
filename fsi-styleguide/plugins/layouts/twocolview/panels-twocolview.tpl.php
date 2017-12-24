<?php
/**
 * @file
 * Template for a 2 column panel layout.
 *
 * This template provides a very simple "one column" panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   $content['one']: First column
 *   $content['two']: Second column.
 */
?>
<div class="two-columns clearfix" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <?php if (isset($content['one']) && $content['one']): ?>
    <div class="left-side">
      <?php print $content['one']; ?>
    </div>
  <?php endif; ?>
  <?php if (isset($content['two']) && $content['two']): ?>
    <div class="right-side">
      <?php print $content['two']; ?>
    </div>
  <?php endif; ?>
</div>
