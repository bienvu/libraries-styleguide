<?php

/**
 * @file
 * Theme the more link.
 *
 * - $view: The view object.
 * - $more_url: the url for the more link.
 * - $link_text: the text for the more link.
 *
 * @ingroup views_templates
 */
?>
<div class="block-news__link text--center">
  <a href="<?php print $more_url ?>" class="link--crimson text--uppercase">
    <?php print $link_text; ?>
  </a>
</div>
