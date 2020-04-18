/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function() {
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

  // Close search screen with Esc key
  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
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
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500
  });

  // Gumshoe scroll spy init
  if($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  }

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

  // Add anchors for headings
  $('.page__content').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
      var anchor = document.createElement("a");
      anchor.className = 'header-link';
      anchor.href = '#' + id;
      anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fa fa-link\"></i>';
      anchor.title = "Permalink";
      $(this).append(anchor);
    }
  });
    
// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function ($) {
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;


    $("#comment-form-submit").html(
      '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Sending...'
    );
    $(form).addClass('disabled');

    $.ajax({
      type: $(this).attr('method'),
      url:  $(this).attr('action'),
      data: $(this).serialize(),
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        showModal('Comment submitted', 'Thanks! Your comment is <a href="https://github.com/travisdowns/travisdowns.github.io/pulls">pending</a>. It will appear when approved.');

        $("#comment-form-submit")
          .html("Submit");

        $(form)[0].reset();
        $(form).removeClass('disabled');
        grecaptcha.reset();
      },
      error: function (err) {
        console.log(err);
        var ecode = (err.responseJSON || {}).errorCode || "unknown";
        showModal('Error', 'An error occured.<br>[' + ecode + ']');
        $("#comment-form-submit").html("Submit")
        $(form).removeClass('disabled');
        grecaptcha.reset();
      }
    });
    return false;
  });

  $('.js-close-modal').click(function () {
    $('body').removeClass('show-modal');
  });

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);
    $('body').addClass('show-modal');
  }
})(jQuery);

// Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
// addComment.moveForm is called from comment.html when the reply link is clicked.
var addComment = {
  // commId - the id attribute of the comment replied to (e.g., "comment-10")
  // parentId - the numeric index of comment repleid to (e.g., 10)
  // respondId - the string 'respond', I guess
  // postId - the page slug
  moveForm: function( commId, parentId, respondId, postId, parentUid ) {
    var div, element, style, cssHidden,
    t           = this,                    //t is the addComment object, with functions moveForm and I, and variable respondId
    comm        = t.I( commId ),                                // whole comment
    respond     = t.I( respondId ),                             // whole new comment form
    cancel      = t.I( 'cancel-comment-reply-link' ),           // whole reply cancel link
    parent      = t.I( 'comment-replying-to' ),                 // hidden element in the comment
    parentuidF  = t.I( 'comment-replying-to-uid' ),             // a hidden element in the comment
    post        = t.I( 'comment-post-slug' ),                   // null
    commentForm = respond.getElementsByTagName( 'form' )[0];    // the <form> part of the comment_form div

    if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if ( ! t.I( 'sm-temp-form-div' ) ) {
      div = document.createElement( 'div' );
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore( div, respond ); //create and insert a bookmark div right before comment form
    }

    comm.parentNode.insertBefore( respond, comm.nextSibling );  //move the form from the bottom to above the next sibling
    if ( post && postId ) {
      post.value = postId;
    }
    parent.value = parentId;
    parentuidF.value = parentUid;
    cancel.style.display = '';                        //make the cancel link visible

    cancel.onclick = function() {
      var t       = addComment,
      temp    = t.I( 'sm-temp-form-div' ),            //temp is the original bookmark
      respond = t.I( t.respondId );                   //respond is the comment form

      if ( ! temp || ! respond ) {
        return;
      }

      t.I( 'comment-replying-to' ).value = null;      // forget the identity of the reply-to comment
      t.I( 'comment-replying-to-uid' ).value = null;
      temp.parentNode.insertBefore( respond, temp );  //move the comment form to its original location
      temp.parentNode.removeChild( temp );            //remove the bookmark div
      this.style.display = 'none';                    //make the cancel link invisible
      this.onclick = null;                            //retire the onclick handler
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     * Try/catch used just to avoid errors in IE 7- which return visibility
     * 'inherit' when the visibility value is inherited from an ancestor.
     */
    try {
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ( 'getComputedStyle' in window ) {
          style = window.getComputedStyle( element );
        // IE 8.
        } else if ( document.documentElement.currentStyle ) {
        style = element.currentStyle;
        }

      /*
       * For display none, do the same thing jQuery does. For visibility,
       * check the element computed style since browsers are already doing
       * the job for us. In fact, the visibility computed style is the actual
       * computed value and already takes into account the element ancestors.
       */
        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
};
});
