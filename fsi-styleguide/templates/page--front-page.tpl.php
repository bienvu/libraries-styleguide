<div class="page-wrapper">
  <div id="skipnav" class="element-invisible">
    <div class="container">
      <p>Skip to:</p>
      <ul>
        <li><a href="#content" class="element-invisible element-focusable"><?php print t('Skip to content'); ?></a></li>
        <?php if ($main_menu): ?>
        <li><a href="#main-menu" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a></li>
        <?php endif; ?>
      </ul>
    </div>
  </div>

  <?php if($page['second_topheader']): ?>
  <section class="second-red-header clearfix">
    <div class="container">
      <div class="container-fluid">
          <?php print render($page['second_topheader']); ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <!-- /#skipnav -->
  <?php if (($user->uid) && ($secondary_nav)): ?>
  <div id="secondary-menu" class="clearfix"> <?php print render($secondary_nav); ?> </div>
  <!-- /#secondary-menu -->
  <?php endif; ?>
  <?php if (($page['header']) || ($page['search_box']) || ($page['navigation'])): ?>
    <header id="header" class="subdomain-header js-header">
      <div class="subdomain-header__main">
        <?php if ($page['header']): ?>
          <?php print render($page['header']); ?>
        <?php endif; ?>
        <?php if ($page['search_box']): ?>
          <div class="subdomain-nav-search subdomain-nav-search--scroll js-subdomain-nav-search hidden-on-mobiletabletonly">
            <span class="subdomain-nav-search__btn"></span>
            <div class="subdomain-nav-search__inner container">
              <?php if (!empty($page['navigation'])): ?>
                <!-- {# Logo and close btn mobile #}-->
                <div class="subdomain-nav-search__logo">
                  <span class="subdomain-nav-search__close-btn"></span>
                </div>
                <!-- {# Search #}-->
                <?php if ($page['search_box']): ?>
                  <div class="subdomain-search">
                    <div class="search-icon"><i class="icon-search"></i></div>
                    <div class="search-box">
                      <?php print render($page['search_box']); ?>
                    </div>
                  </div>
                <?php endif; ?>
                <!-- {# Menu #}-->
                <?php print render($page['navigation']); ?>
              <?php endif; ?>
            </div>
          </div>
        <?php endif; ?>
        <div class="subdomain-nav-search js-subdomain-nav-search">
          <span class="subdomain-nav-search__btn hidden-on-desktop"></span>
          <div class="subdomain-nav-search__inner container">
            <?php if (!empty($page['navigation'])): ?>
              <!-- {# Logo and close btn mobile #}-->
              <div class="subdomain-nav-search__logo">
                <span class="subdomain-nav-search__close-btn"></span>
              </div>
              <!--  {# Search #}-->
              <?php if ($page['search_box']): ?>
                <div class="subdomain-search">
                  <div class="search-icon"><i class="icon-search"></i></div>
                  <div class="search-box">
                    <?php print render($page['search_box']); ?>
                  </div>
                </div>
              <?php endif; ?>
              <!--  {# Menu #}-->
              <?php print render($page['navigation']); ?>
            <?php endif; ?>
          </div>
        </div>
        <?php if (!empty($page['sticky_navigation'])): ?>
          <?php print render($page['sticky_navigation']); ?>
        <?php endif; ?>
      </div>
    </header>
  <?php endif; ?>
  <!-- /#header -->

  <!-- /#main, /#main-wrapper -->
  <div id="main-subdomain" class="clearfix">
    <?php if ($page['main_top']): ?>
    <div id="main-top" class="row-fluid"> <?php print render($page['main_top']); ?> </div>
    <?php endif; ?>
    <?php if ($page['main_upper']): ?>
    <div id="main-upper" class="row-fluid"> <?php print render($page['main_upper']); ?> </div>
    <?php endif; ?>
    <div id="main-content" class="row">
      <?php if ($page['sidebar_first']): ?>
      <div id="sidebar-first" class="sidebar span3">
        <div class="row-fluid"><?php print render($page['sidebar_first']); ?></div>
      </div>
      <!-- /#sidebar-first -->
      <?php endif; ?>
      <div id="content" class="<?php if (($page['sidebar_first']) && ($page['sidebar_second'])): print 'span6'; elseif (($page['sidebar_first']) || ($page['sidebar_second'])): print 'span9'; else: print 'span12'; endif; ?>">
        <div id="content-wrapper">
          <div id="content-head" class="row-fluid">
            <div class="container">
              <div class="container-fluid">
                <div id="highlighted" class="clearfix"><?php print render($page['highlighted']); ?></div>
                <?php if ($tabs): ?>
                  <div class="tabs"> <?php print render($tabs); ?> </div>
                <?php endif; ?>
                <?php if ($messages): ?>
                  <div id="console" class="clearfix"><?php print $messages; ?></div>
                <?php endif; ?>
                <?php if ($page['help']): ?>
                  <div id="help" class="clearfix"> <?php print render($page['help']); ?> </div>
                <?php endif; ?>
                <?php if ($action_links): ?>
                  <ul class="action-links">
                    <?php print render($action_links); ?>
                  </ul>
                <?php endif; ?>
              </div>
            </div>
          </div>

          <?php if ($page['content_top']): ?>
          <div id="content-top" class="row-fluid"> <?php print render($page['content_top']); ?> </div>
          <?php endif; ?>
          <?php if ($page['content_upper']): ?>
          <div id="content-upper" class="row-fluid"> <?php print render($page['content_upper']); ?> </div>
          <?php endif; ?>
          <?php if (($page['content']) || ($feed_icons)): ?>
          <div id="content-body" class="row-fluid"> <?php print render($page['content']); ?> <?php print $feed_icons; ?> </div>
          <?php endif; ?>
          <?php if ($page['content_row2']): ?>
          <div id="content-row2" class="row-fluid"> <?php print render($page['content_row2']); ?> </div>
          <?php endif; ?>
          <?php if (($page['content_col2-1']) || ($page['content_col2-2'])): ?>
          <div id="content-col2" class="row-fluid">
            <?php if ($page['content_col2-1']): ?>
            <div class="span6">
              <div id="content-col2-1" class="span12 clearfix clear-row"> <?php print render($page['content_col2-1']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col2-2']): ?>
            <div class="span6">
              <div id="content-col2-2" class="span12 clearfix clear-row"> <?php print render($page['content_col2-2']); ?> </div>
            </div>
            <?php endif; ?>
          </div>
          <?php endif; ?>
          <?php if ($page['content_row3']): ?>
          <div id="content-row3" class="row-fluid"> <?php print render($page['content_row3']); ?> </div>
          <?php endif; ?>
          <?php if (($page['content_col3-1']) || ($page['content_col3-2']) || ($page['content_col3-3'])): ?>
          <div id="content-col3" class="row-fluid">
            <?php if ($page['content_col3-1']): ?>
            <div class="span4">
              <div id="content-col3-1" class="span12 clearfix clear-row"> <?php print render($page['content_col3-1']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col3-2']): ?>
            <div class="span4">
              <div id="content-col3-2" class="span12 clearfix clear-row"> <?php print render($page['content_col3-2']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col3-3']): ?>
            <div class="span4">
              <div id="content-col3-3" class="span12 clearfix clear-row"> <?php print render($page['content_col3-3']); ?> </div>
            </div>
            <?php endif; ?>
          </div>
          <?php endif; ?>
          <?php if ($page['content_row4']): ?>
          <div id="content-row4" class="row-fluid"> <?php print render($page['content_row4']); ?> </div>
          <?php endif; ?>
          <?php if (($page['content_col4-1']) || ($page['content_col4-2']) || ($page['content_col4-3']) || ($page['content_col4-4'])): ?>
          <div id="content-col4" class="row-fluid">
            <?php if ($page['content_col4-1']): ?>
            <div class="span3">
              <div id="content-col4-1" class="span12 clearfix clear-row"> <?php print render($page['content_col4-1']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col4-2']): ?>
            <div class="span3">
              <div id="content-col4-2" class="span12 clearfix clear-row"> <?php print render($page['content_col4-2']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col4-3']): ?>
            <div class="span3">
              <div id="content-col4-3" class="span12 clearfix clear-row"> <?php print render($page['content_col4-3']); ?> </div>
            </div>
            <?php endif; ?>
            <?php if ($page['content_col4-4']): ?>
            <div class="span3">
              <div id="content-col4-4" class="span12 clearfix clear-row"> <?php print render($page['content_col4-4']); ?> </div>
            </div>
            <?php endif; ?>
          </div>
          <?php endif; ?>
          <?php if ($page['content_lower']): ?>
          <div id="content-lower" class="row-fluid"> <?php print render($page['content_lower']); ?> </div>
          <?php endif; ?>
          <?php if ($page['content_bottom']): ?>
          <div id="content-bottom" class="row-fluid"> <?php print render($page['content_bottom']); ?> </div>
          <?php endif; ?>
        </div>
        <!-- /#content-wrap -->
      </div>
      <!-- /#content -->
      <?php if ($page['sidebar_second']): ?>
      <div id="sidebar-second" class="sidebar span3">
        <div class="row-fluid"><?php print render($page['sidebar_second']); ?></div>
      </div>
      <!-- /#sidebar-second -->
      <?php endif; ?>
    </div>
    <?php if ($page['main_lower']): ?>
    <div id="main-lower" class="row-fluid"> <?php print render($page['main_lower']); ?> </div>
    <?php endif; ?>
    <?php if ($page['main_bottom']): ?>
    <div id="main-bottom" class="row-fluid"> <?php print render($page['main_bottom']); ?> </div>
    <?php endif; ?>
  </div>
  <!-- /#main, /#main-wrapper -->
  <?php if ($page['footer']): ?>
  <div id="footer" class="clearfix">
    <div class="container">
      <div id="footer-content" class="row-fluid"> <?php print render($page['footer']); ?> </div>
    </div>
  </div>
  <!-- /#footer -->
  <?php endif; ?>

  <section class="direction minusMargin">
    <?php if ($page['footer_social']): ?>
    <div class="footer-social">
      <div class="container">
        <div class="container-fluid">
          <?php print render($page['footer_social']); ?>
        </div>
      </div>
    </div>
    <?php endif; ?>
  </section>

  <?php if ($page['footer_center'] || $page['footer_copyrights']): ?>
    <footer class="footer">
      <?php if ($page['footer_center']): ?>
        <section class="footer-panel bg--stanford-cgray">
          <div class="container">
            <?php print render($page['footer_center']); ?>
          </div>
        </section>
      <?php endif; ?>
      <div id="back-top" class="back-top hidden-on-tablet">
        <div class="back-top__inner">
          <span class="back-top__item back-top__icon js-back-top icon-chevron-up"></span>
          <span class="back-top__item">Top</span>
        </div>
      </div>
      <?php if ($page['footer_copyrights']): ?>
        <section class="footer-global bg--cardinal">
          <div class="container">
            <?php print render($page['footer_copyrights']); ?>
          </div>
        </section>
      <?php endif; ?>
    </footer>
  <?php endif; ?>
</div>
