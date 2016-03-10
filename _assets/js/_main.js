/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

/* fitvids.js */

$(function() {
	$("article").fitVids();
});


/* add lightbox class to all image links */

$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");


/* Magnific-Popup options */

$(document).ready(function() {
  $(".image-popup").magnificPopup({
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: "<a href='%url%'>Image #%curr%</a> could not be loaded.",
    },
    removalDelay: 300, // delay in milliseconds before popup is removed
    mainClass: "mfp-fade"
  });
});