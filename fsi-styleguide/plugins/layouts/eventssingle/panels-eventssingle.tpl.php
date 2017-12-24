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
<div class="panel-two-column panel-events clearfix container-fluid" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
  <div class="row-fluid">
    <div class="span12">
      <div class="span8">
        <?php if (isset($content['one']) && $content['one']): ?>
          <?php print $content['one']; ?>
        <?php endif; ?>
        <div class="clearfix">
          <?php if (isset($content['evleft']) && $content['evleft']): ?>
            <?php print $content['evleft']; ?>
          <?php endif; ?>
          <?php if (isset($content['evright']) && $content['evright']): ?>
            <?php print $content['evright']; ?>
          <?php endif; ?>
        </div>
        <div class="clearfix">
          <?php if (isset($content['evother']) && $content['evother']): ?>
            <?php print $content['evother']; ?>
          <?php endif; ?>
        </div>
      </div>
      <div class="span3 offset1">
        <?php if (isset($content['two']) && $content['two']): ?>
          <?php print $content['two']; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
