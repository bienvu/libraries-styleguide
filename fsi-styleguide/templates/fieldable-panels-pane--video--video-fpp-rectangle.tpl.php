<div class="<?php print $classes; ?>"<?php print $attributes; ?>>
	<?php print render($title_suffix); ?>
	<?php if (!empty($variables['content']['field_video'])): ?>
		<a href="<?php print $variables['content']['field_video'][0]['#path']; ?>"
			 title=""
			 class="media-colorbox video-fpp init-media-colorbox-processed cboxElement"
			 style=""
			 rel=""
			 data-mediacolorboxfixedwidth="<?php print $variables['content']['field_video'][0]['#display_settings']['fixed_width']; ?>"
			 data-mediacolorboxfixedheight="<?php print $variables['content']['field_video'][0]['#display_settings']['fixed_height']; ?>"
			 data-mediacolorboxaudioplaylist="<?php print $variables['content']['field_video'][0]['#display_settings']['audio_playlist']; ?>">
		</a>
	<?php endif; ?>
	<?php print render($content); ?>
</div>