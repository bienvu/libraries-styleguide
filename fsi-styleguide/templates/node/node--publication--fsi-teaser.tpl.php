<div class="research-fsi-teaser clearfix">
<?php if (isset($content['field_image_media_single'])): ?>
  <?php $bodyclass = 'span9'; ?>
  <div class="span3">
   <?php print render($content['field_image_media_single']); ?>
  </div>
<?php else: ?>
  <?php $bodyclass = 'span12'; ?>
<?php endif; ?>
<?php if (isset($content['body'])): ?>
  <div class="<?php print $bodyclass; ?>">
   <?php print render($content['body']); ?>
  </div>
<?php endif; ?>
</div>
