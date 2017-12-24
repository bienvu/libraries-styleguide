<?php
/**
 * @file
 * Rewrite default simple view template to display a group of summary lines.
 * Based on http://drupal.org/node/403012
 */
// Define variables.
$current_domain = domain_get_domain();
$domain_id = $current_domain['domain_id'];
$group_letters = array('A-B-C', 'D-E-F-G', 'H-I-J-K-L', 'M-N-O-P', 'Q-R-S', 'T-U-V-W-X-Y-Z');
$center_options = _get_current_center_options();
$letters = range('A', 'Z');

if ($view->name == 'fsi_people_faculty' && $view->current_display == 'all_faculty_attach') {  
  
//  // get available letters.
//  foreach ($rows as $id => $row) {
//
//    $existing_letters[] = $row->link;
//    $urls[] = $row->url;
//  }
//  
//  print '<div class="views-summary views-summary-unformatted all-faculty-alphapager">';
//  $page_item = menu_get_item();
//  $arg_letter = (isset($page_item['page_arguments'][2])) ? $page_item['page_arguments'][2] : NULL;
//
//  foreach ($group_letters as $group_k => $group_letter) {
//    $group_arr = explode('-', $group_letter);
//    $out_group = $group_arr[0] . '-' . $group_arr[count($group_arr) - 1];
//
//    // Check result availability for group.
//    $exist = '';
//    $url_links = array();
//    foreach ($group_arr as $g_letter) {
//      if (!empty($existing_letters) && in_array($g_letter, $existing_letters)) {
//        $exist = $group_k;
//      }
//      $url_links[strtolower($g_letter)] = strtolower($g_letter);
//    }
//    // check letter for active.
//    $en_active_class = 0;
//    $arg_letter = _get_current_letter($arg_letter);
//
//    foreach (explode(' ', $arg_letter) as $check_letter) {
//      if (isset($url_links[strtolower($check_letter)])) {
//        $en_active_class = 1;
//      }
//    }
//
//    $active_class = ($en_active_class) ? 'active-letter' : '';
//    $groups_info[$group_k]['current'] = ($en_active_class) ? 1 : 0;
//    $groups_info[$group_k]['letters'] = $url_links;
//    $groups_info[$group_k]['full_url'] = $urls[0];
//    $groups_info[$group_k]['text'] = $out_group;
//    $groups_info[$group_k]['have_result'] = TRUE; //(isset($group_letters[$exist])) ? TRUE : FALSE;
//    $groups_info[$group_k]['link'] = preg_replace('%people\/all-faculty/[a-zA-Z\+]+%i', 'people/all-faculty/' . implode('+', $url_links), $urls[0]);
//  }
//  $nav = fsi_alpha_pagination_nav($groups_info, $arg_letter);
//  print implode(' ', $nav);
//  print '</div>';
}
elseif ($view->name == 'people' && $view->current_display == 'people_alpha_dir_full') {
//  // get available letters.
//  foreach ($rows as $id => $row) {
//    // Special case when it's not possible to alter contextual filter (field_centers_programs)/(summary).
////    if ($domain_id != 1) {
////      if (isset($view->exposed_raw_input['center'])) {
////        $wrapper = entity_metadata_wrapper('node', $row->nid);
////        $centers = $wrapper->field_centers_programs->value();
////        if ($centers) {
////          $center_nids = array();
////          foreach ($centers as $key => $center) {
////            $center_nids[] = $center->nid;
////          }
////        }
////      }
////      if (!empty($center_options) && !check_array_vals_in_array($center_options, $center_nids)) {
////        continue;
////      }
////    }
//
//    $existing_letters[] = $row->link;
//    $urls[] = $row->url;
//  }
//
//  print '<div class="views-summary views-summary-unformatted directory-alphapager">';
//  $page_item = menu_get_item();
//
//  $arg_letter = (isset($page_item['page_arguments'][2])) ? $page_item['page_arguments'][2] : '';
//
//  foreach ($group_letters as $group_k => $group_letter) {
//    $group_arr = explode('-', $group_letter);
//    $out_group = $group_arr[0] . '-' . $group_arr[count($group_arr) - 1];
//
//    // Check result availability for group.
//    $exist = '';
//    $url_links = array();
//    foreach ($group_arr as $g_letter) {
//      if (!empty($existing_letters) && in_array($g_letter, $existing_letters)) {
//        $exist = $group_k;
//      }
//      $url_links[strtolower($g_letter)] = strtolower($g_letter);
//    }
//    // Check letter for active.
//    $en_active_class = 0;
//    $arg_letter = _get_current_letter($arg_letter);
//
//    // Check for active class.
//    foreach (explode(' ', $arg_letter) as $check_letter) {
//      if (isset($url_links[strtolower($check_letter)])) {
//        $en_active_class = 1;
//      }
//    }
//    $active_class = ($en_active_class) ? 'active-letter' : '';
//    $groups_info[$group_k]['current'] = ($en_active_class) ? 1 : 0;
//    $groups_info[$group_k]['letters'] = $url_links;
//    $groups_info[$group_k]['full_url'] = $urls[0];
//    $groups_info[$group_k]['text'] = $out_group;
//    $groups_info[$group_k]['have_result'] = TRUE; //(isset($group_letters[$exist])) ? TRUE : FALSE;
//    $groups_info[$group_k]['link'] = preg_replace('%people\/directory\/[a-zA-Z\+]+.*\?(.*)%i', 'people/directory/' . implode('+', $url_links) . '?$1', $urls[0]);
//  }
//  $nav = fsi_alpha_pagination_nav($groups_info, $arg_letter);
//  print implode(' ', $nav);
//  print '</div>';
}
// MediaGuide Alpha Pager.
elseif ($view->name == 'people' && $view->current_display == 'm_g_alpha_atach') {
  
//  // get available letters.
//  foreach ($rows as $id => $row) {
//    $existing_letters[] = $row->link;
//    $urls[] = $row->url;
//  }
//
//  print '<div class="views-summary views-summary-unformatted mediaguide-alphapager">';
//  $page_item = menu_get_item();
//  $arg_letter = (isset($page_item['page_arguments'][1])) ? $page_item['page_arguments'][1] : NULL;
//
//  foreach ($group_letters as $group_k => $group_letter) {
//    $group_arr = explode('-', $group_letter);
//    $out_group = $group_arr[0] . '-' . $group_arr[count($group_arr) - 1];
//
//    // Check result availability for group.
//    $exist = '';
//    $url_links = array();
//    foreach ($group_arr as $g_letter) {
//      if (!empty($existing_letters) && in_array($g_letter, $existing_letters)) {
//        $exist = $group_k;
//      }
//      $url_links[strtolower($g_letter)] = strtolower($g_letter);
//    }
//    // check letter for active.
//    $en_active_class = 0;
//    $arg_letter = _get_current_letter($arg_letter);
//
//    foreach (explode(' ', $arg_letter) as $check_letter) {
//      if (isset($url_links[strtolower($check_letter)])) {
//        $en_active_class = 1;
//      }
//    }
//    $active_class = ($en_active_class) ? 'active-letter' : '';
//    $groups_info[$group_k]['current'] = ($en_active_class) ? 1 : 0;
//    $groups_info[$group_k]['letters'] = $url_links;
//    $groups_info[$group_k]['full_url'] = $urls[0];
//    $groups_info[$group_k]['text'] = $out_group;
//    $groups_info[$group_k]['have_result'] = TRUE; //(isset($group_letters[$exist])) ? TRUE : FALSE;
//    $groups_info[$group_k]['link'] = preg_replace('%people\/mediaguide\/[a-zA-Z\+]+.*\?(.*)%i', 'people/mediaguide/' . implode('+', $url_links) . '?$1', $urls[0]);
//  }
//  $nav = fsi_alpha_pagination_nav($groups_info, $arg_letter);
//  print implode(' ', $nav);
//  print '</div>';
}
else {
  ?>  

  <?php foreach ($rows as $id => $row): ?>
    <?php print (!empty($options['inline']) ? '<span' : '<div') . ' class="views-summary views-summary-unformatted">'; ?>
    <?php
    if (!empty($row->separator)) {
      print $row->separator;
    }
    ?>
    <a href="<?php print $row->url; ?>"<?php print !empty($row_classes[$id]) ? ' class="' . $row_classes[$id] . '"' : ''; ?>><?php print $row->link; ?></a>
    <?php if (!empty($options['count'])): ?>
      (<?php print $row->count; ?>)
    <?php endif; ?>
    <?php print !empty($options['inline']) ? '</span>' : '</div>'; ?>
  <?php endforeach; ?>

<?php } ?>