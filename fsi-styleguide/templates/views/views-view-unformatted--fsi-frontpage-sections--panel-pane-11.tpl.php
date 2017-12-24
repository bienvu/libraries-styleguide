<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php if (isset($rows[0])): ?>
<div class="span8">
  <?php print $rows[0]; ?>
</div>
<?php endif; ?>
<?php if (isset($rows[1])): ?>
<div class="span4">
  <?php print $rows[1]; ?>
</div>
<?php endif; ?>
<?php if (isset($rows[2])): ?>
<div class="span4 last">
  <?php print $rows[2]; ?>
</div>
<?php endif; ?>
