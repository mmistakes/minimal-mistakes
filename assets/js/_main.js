/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function() {
  // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    };

  bumpIt();
  $(window).resize(jQuery.throttle(250, function() {
    bumpIt();
  }));

  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function() {
    var show =
      $(".author__urls-wrapper button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function() {
    stickySideBar();
  });

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Search toggle
  $(".search__toggle").on("click", function() {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function() {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling

  // Bind popstate event listener to support back/forward buttons.
  var smoothScrolling = false;
  $(window).bind("popstate", function (event) {
    $.smoothScroll({
      scrollTarget: location.hash,
      offset: -20,
      beforeScroll: function() { smoothScrolling = true; },
      afterScroll: function() { smoothScrolling = false; }
    });
  });
  // Override clicking on links to smooth scroll
  $('a[href*="#"]').bind("click", function (event) {
    if (this.pathname === location.pathname && this.hash) {
      event.preventDefault();
      history.pushState(null, null, this.hash);
      $(window).trigger("popstate");
    }
  });
  // Smooth scroll on page load if there is a hash in the URL.
  if (location.hash) {
    $(window).trigger("popstate");
  }

  // Scrollspy equivalent: update hash fragment while scrolling.
  $(window).scroll(jQuery.throttle(250, function() {
    // Don't run while smooth scrolling (from clicking on a link).
    if (smoothScrolling) return;
    var scrollTop = $(window).scrollTop() + 20 + 1;  // 20 = offset
    var links = [];
    $("nav.toc a").each(function() {
      var link = $(this);
      var href = link.attr("href");
      if (href && href[0] == "#") {
        var element = $(href);
        links.push({
          link: link,
          href: href,
          top: element.offset().top
        });
        link.removeClass('active');
      }
    });
    for (var i = 0; i < links.length; i++) {
      var top = links[i].top;
      var bottom = (i < links.length - 1 ? links[i+1].top : Infinity);
      if (top <= scrollTop && scrollTop < bottom) {
        // Mark all ancestors as active
        links[i].link.parents("li").children("a").addClass('active');
        if (links[i].href !== location.hash) {
          history.replaceState(null, null, links[i].href);
        }
        return;
      }
    }
    if ('#' !== location.hash) {
      history.replaceState(null, null, '#');
    }
  }));

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']"
  ).addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });
});
