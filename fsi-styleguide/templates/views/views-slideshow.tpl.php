<?php

/**
 * @file
 * Default views template for displaying a slideshow.
 *
 * - $view: The View object.
 * - $options: Settings for the active style.
 * - $rows: The rows output from the View.
 * - $title: The title of this group of rows. May be empty.
 *
 * @ingroup views_templates
 */
?>
<?php $skin_styles = ''; ?>
<?php  if (!empty($options['slideshow_skin_slides'])):
    $skin_styles .= ' ' . $options['slideshow_skin_slides'];
  endif; ?>

<?php if (!empty($options['slideshow_skin_variation'])):
    $skin_styles .= ' ' . $options['slideshow_skin_variation'];
  endif; ?>

  <style>
    .skin-<?php print str_replace(' ','.',$skin); ?> .views-slideshow-cycle-main-frame {
      <?php if (!empty($options['slideshow_margin_above'])): ?>
      margin-top: <?php print $options['slideshow_margin_above'] ?>px;
      <?php endif; ?>
      <?php if (!empty($options['slideshow_margin_below'])): ?>
      margin-bottom: <?php print $options['slideshow_margin_below'] ?>px;
      <?php endif; ?>
    }
  </style>

<div class="skin-<?php print $skin . ' ' . $skin_styles ?>">
  <?php if (!empty($top_widget_rendered)): ?>
    <div class="views-slideshow-controls-top clearfix">
      <?php print $top_widget_rendered; ?>
    </div>
  <?php endif; ?>

  <?php print $slideshow; ?>

  <?php if (!empty($bottom_widget_rendered)): ?>
    <div class="views-slideshow-controls-bottom clearfix">
      <?php print $bottom_widget_rendered; ?>
    </div>
  <?php endif; ?>
</div>
