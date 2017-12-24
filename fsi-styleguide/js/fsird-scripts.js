(function (window, document, $) {
  function func_resize(){
    var width = window.innerWidth || document.documentElement.clientWidth;
    // Tabs Js
    if(width > 1023) {
      $('.calendar-event__schedule').removeClass('active');
      $('.calendar-event__list').removeClass('hidden');
    }
    else {
    }
  }

  func_resize();

  var resizeTimer;
  $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      func_resize();
    }, 250);
  });

  $( document ).ready(function() {
    var calendarFilter = $('.page-events .calendar-event__filter');
      calendarFilter.after('<div class="js-calendar-schedule--show hidden-on-desktop calendar-event__schedule__icon">Event Calendar</div>');

    var scheduleCalendar = function (e) {
      e.preventDefault();
      var $this = $(this),
        $calendar = $this.parents('.page-events'),
        $sheduleList = $('.calendar-event__schedule', $calendar),
        $calendarList = $('.calendar-event__list', $calendar);

      $sheduleList.toggleClass('active');
      $calendarList.toggleClass('hidden');
    };

    $('.js-calendar-schedule--show').on('click', scheduleCalendar);
  });

}(this, this.document, this.jQuery));
