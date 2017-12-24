<?php
/**
 * @file
 * Template to display a column
 *
 * - $item: The item to render within a td element.
 */
$id = (isset($item['id'])) ? 'id="' . $item['id'] . '" ' : '';
$date = (isset($item['date'])) ? ' data-date="' . $item['date'] . '" ' : '';
$day = (isset($item['day_of_month'])) ? ' data-day-of-month="' . $item['day_of_month'] . '" ' : '';
$headers = (isset($item['header_id'])) ? ' headers="'. $item['header_id'] .'" ' : '';
$item['class'] = str_replace("date-box", "calenadr-date-box", $item['class']);$item_id = $item['id'];
$pattern_confirm = '/\<div class=\"Confirm"\>Confirm\<\/div\>/i';
$pattern_hold = '/\<div class=\"Hold\"\>Hold\<\/div\>/i';
$pattern_single_day = '/single-day/i';
$confirmed = '';
// Add pending class if any
if (preg_match($pattern_hold, $item['entry'])):
  $div_plus = '<div class="plus-item-container-yellow">+</div>';
endif;
// Add confirmed class if any
if (preg_match($pattern_confirm, $item['entry'])):
  $div_plus = '<div class="plus-item-container-red">+</div>';
endif;
// Add pending class if any
$new_output = '';
if (preg_match($pattern_single_day, $item['class'])):
  $single_day = $item['date'];
  $dt = new DateTime($item['date']);
  $single_day = date_format($dt, 'j');
  $new_output = '<div class="month day has-items"> ' . $single_day . ' </div>';
endif;
$now = date_create(date('Y-m-d'));
$diff=date_diff($now,date_create($item['date']));
$diff_num = $diff->format("%R%a");
$plus_class = '';
if ($diff_num > 4) {
  // Put + icon only if at least 4 days in the future.
  $plus_class = 'plus-item';
  $item['class'] .= ' ' . $plus_class;
  if (!isset($div_plus)) {
    $div_plus = '<div class="plus-item-container">+</div>';
  }
}
else {
  $div_plus = '';
}
?>
<td <?php print $id?>class="<?php print $item['class'] ?>" colspan="<?php print $item['colspan'] ?>" rowspan="<?php print $item['rowspan'] ?>"<?php print $date . $headers . $day; ?>>
  <?php print $div_plus ?>
  <div class="inner">
    <?php print $item['entry'] ?>
    <?php print $new_output ?>
  </div>
</td>
