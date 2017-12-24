<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array) : An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array) : An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php) :
 * - $title_prefix (array) : An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array) : An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array) : Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array) : Actions local to the page, such as 'Add menu' on
 *   the menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 * - $copyright
 *
 * Regions:
 * - $page['header']: Header top.
 * - $page['navigation']: Navigation.
 * - $page['header_bottom']: Header bottom.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>

<div id="page-wrapper">
  <header class="header js-header">
    <?php if ($page['header']) : ?>
      <div class="header__panel">
        <?php print render($page['header']); ?>
      </div>
    <?php endif; ?>

    <div class="header__top container">
      <div class="header__logo-responsive">
        <?php if ($logo) : ?>
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo-responsive">
            <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
          </a>
        <?php endif; ?>
      </div>
      <?php if ($main_menu) : ?>
        <span class="header__menu-button"></span>
      <?php endif; ?>
    </div>

    <div class="header__inner">
      <div class="header__inner__container container">
        <?php if ($page['navigation']) : ?>
          <div class="header__group">
            <?php print render($page['navigation']); ?>
          </div>
        <?php endif; ?>

        <nav class="header__nav">
          <span class="header__nav__button"></span>
          <div class="header__logo">
            <?php if ($logo) : ?>
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
                <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
              </a>
            <?php endif; ?>
          </div>

          <?php if ($secondary_menu) : ?>
            <div class="short-nav short-nav--nav">
              <span class="short-nav__button js-short-nav__button"></span>
              <div class="short-nav__content"><?php print $secondary_menu; ?></div>
            </div>
          <?php endif; ?>

          <?php if ($main_menu) : ?>
            <?php print $main_menu; ?>
          <?php endif; ?>
        </nav>
      </div>
    </div>

    <?php if ($page['header_bottom']) : ?>
      <div class="header__sticky-nav">
        <div class="container"><?php print render($page['header_bottom']); ?></div>
      </div>
    <?php endif; ?>
  </header> <!-- /#header -->

  <?php if ($messages) : ?>
    <div id="messages"><div class="section clearfix">
      <?php print $messages; ?>
    </div></div> <!-- /.section, /#messages -->
  <?php endif; ?>

  <main id="main" role="main" class="<?php print $content_classes; ?>">
    <?php if ($page['sidebar_first']) : ?>
      <aside id="sidebar-first" class="sidebar">
        <?php print render($page['sidebar_first']); ?>
      </aside> <!-- /.section, /#sidebar-first -->
    <?php endif; ?>

    <section id="content" class="content">
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if ($title) : ?>
        <h1 class="page-title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php if ($tabs) : ?>
        <div class="tabs"><?php print render($tabs); ?></div>
      <?php endif; ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links) : ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
    </section> <!-- /.section, /#content -->

    <?php if ($page['sidebar_second']) : ?>
      <aside id="sidebar-second" class="sidebar">
        <?php print render($page['sidebar_second']); ?>
      </aside> <!-- /.section, /#sidebar-second -->
    <?php endif; ?>
  </main> <!-- /#main,-->

  <footer class="footer bg--baltic-sea">
    <?php if ($page['footer_firstcolumn'] || $page['footer_secondcolumn'] || $page['footer_thirdcolumn'] || $page['footer_fourthcolumn'] || $page['footer']): ?>
      <section class="footer-panel">
        <div class="container">
          <?php if ($page['footer_firstcolumn'] || $page['footer_secondcolumn'] || $page['footer_thirdcolumn'] || $page['footer_fourthcolumn']): ?>
            <div class="footer-panel__top">
              <?php if ($page['footer_firstcolumn']) : ?>
                <div class="footer-panel__top__item">
                <?php print render($page['footer_firstcolumn']); ?>
                </div>
              <?php endif; ?>

              <?php if ($page['footer_secondcolumn']) : ?>
                <div class="footer-panel__top__item">
                <?php print render($page['footer_secondcolumn']); ?>
                </div>
              <?php endif; ?>

              <?php if ($page['footer_thirdcolumn']) : ?>
                <div class="footer-panel__top__item">
                <?php print render($page['footer_thirdcolumn']); ?>
                </div>
              <?php endif; ?>

              <?php if ($page['footer_fourthcolumn']) : ?>
                <div class="footer-panel__top__item">
                <?php print render($page['footer_fourthcolumn']); ?>
                </div>
              <?php endif; ?>
            </div>
          <?php endif; ?>
        </div>
      </section><!-- /#footer-columns -->
    <?php endif; ?>
    <section class="footer-bottom bg--bunker">
      <div class="container">
        <div class="footer-bottom__logo">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"></a>
        </div>
        <?php print render($page['footer']); ?>
      </div>
    </section>
  </footer><!--  /#footer -->

</div> <!--/#page-wrapper -->


