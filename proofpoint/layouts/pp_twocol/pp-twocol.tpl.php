<?php
/**
 * @file
 * Template for a 2 column panel layout.
 *
 * This template provides a two column panel display layout, with
 * additional areas for the top and the bottom.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   - $content['top']: Content in the top row.
 *   - $content['left']: Content in the left column.
 *   - $content['right']: Content in the right column.
 *   - $content['bottom']: Content in the bottom row.
 */
?>
<div class="panel-display clearfix">
  <?php if ($content['top-region']): ?>
    <div class="top-region panel-panel">
      <div class="inside"><?php print $content['top-region']; ?></div>
    </div>
  <?php endif; ?>

  <div class="main-region container">
    <div class="left-side panel-panel">
      <div class="inside"><?php print $content['content']; ?></div>
    </div>
    <div class="right-side panel-panel">
      <div class="inside"><?php print $content['sidebar']; ?></div>
    </div>
  </div>

  <?php if ($content['bottom-region']): ?>
    <div class="bottom-region panel-panel">
      <div class="inside"><?php print $content['bottom-region']; ?></div>
    </div>
  <?php endif; ?>
</div>
