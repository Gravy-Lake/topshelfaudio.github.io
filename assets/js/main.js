(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 17;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>"):
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  });

  introCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).data('filter')
    });
    aos_init();
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

jQuery(function ($) {
  'use strict'
  var supportsAudio = !!document.createElement('audio').canPlayType;
  if (supportsAudio) {
      // initialize plyr
      var player = new Plyr('#audio1', {
          controls: [
              'restart',
              'play',
              'progress',
              'current-time',
              'duration',
              'mute',
              'volume',
              'download'
          ]
      });
      // initialize playlist and controls
      var index = 0,
          playing = false,
          mediaPath = 'https://archive.org/download/mythium/',
          extension = '',
          tracks = [{
              "track": 1,
              "name": "All This Is - Joe L.'s Studio",
              "duration": "2:46",
              "file": "JLS_ATI"
          }, {
              "track": 2,
              "name": "The Forsaken - Broadwing Studio (Final Mix)",
              "duration": "8:30",
              "file": "BS_TF"
          }, {
              "track": 3,
              "name": "All The King's Men - Broadwing Studio (Final Mix)",
              "duration": "5:01",
              "file": "BS_ATKM"
          }, {
              "track": 4,
              "name": "The Forsaken - Broadwing Studio (First Mix)",
              "duration": "8:31",
              "file": "BSFM_TF"
          }, {
              "track": 5,
              "name": "All The King's Men - Broadwing Studio (First Mix)",
              "duration": "5:05",
              "file": "BSFM_ATKM"
          }],
          buildPlaylist = $.each(tracks, function(key, value) {
              var trackNumber = value.track,
                  trackName = value.name,
                  trackDuration = value.duration;
              if (trackNumber.toString().length === 1) {
                  trackNumber = '0' + trackNumber;
              }
              $('#plList').append('<li> \
                  <div class="plItem"> \
                      <span class="plNum">' + trackNumber + '.</span> \
                      <span class="plTitle">' + trackName + '</span> \
                      <span class="plLength">' + trackDuration + '</span> \
                  </div> \
              </li>');
          }),
          trackCount = tracks.length,
          npAction = $('#npAction'),
          npTitle = $('#npTitle'),
          audio = $('#audio1').on('play', function () {
              playing = true;
              npAction.text('Now Playing...');
          }).on('pause', function () {
              playing = false;
              npAction.text('Paused...');
          }).on('ended', function () {
              npAction.text('Paused...');
              if ((index + 1) < trackCount) {
                  index++;
                  loadTrack(index);
                  audio.play();
              } else {
                  audio.pause();
                  index = 0;
                  loadTrack(index);
              }
          }).get(0),
          btnPrev = $('#btnPrev').on('click', function () {
              if ((index - 1) > -1) {
                  index--;
                  loadTrack(index);
                  if (playing) {
                      audio.play();
                  }
              } else {
                  audio.pause();
                  index = 0;
                  loadTrack(index);
              }
          }),
          btnNext = $('#btnNext').on('click', function () {
              if ((index + 1) < trackCount) {
                  index++;
                  loadTrack(index);
                  if (playing) {
                      audio.play();
                  }
              } else {
                  audio.pause();
                  index = 0;
                  loadTrack(index);
              }
          }),
          li = $('#plList li').on('click', function () {
              var id = parseInt($(this).index());
              if (id !== index) {
                  playTrack(id);
              }
          }),
          loadTrack = function (id) {
              $('.plSel').removeClass('plSel');
              $('#plList li:eq(' + id + ')').addClass('plSel');
              npTitle.text(tracks[id].name);
              index = id;
              audio.src = mediaPath + tracks[id].file + extension;
              updateDownload(id, audio.src);
          },
          updateDownload = function (id, source) {
              player.on('loadedmetadata', function () {
                  $('a[data-plyr="download"]').attr('href', source);
              });
          },
          playTrack = function (id) {
              loadTrack(id);
              audio.play();
          };
      extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
      loadTrack(index);
  } else {
      // no audio support
      $('.column').addClass('hidden');
      var noSupport = $('#audio1').text();
      $('.container').append('<p class="no-support">' + noSupport + '</p>');
  }
});
