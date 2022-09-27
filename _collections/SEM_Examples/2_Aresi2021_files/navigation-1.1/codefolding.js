
window.initializeCodeFolding = function(show) {

  // handlers for show-all and hide all
  $("#rmd-show-all-code").click(function() {
    $('div.r-code-collapse').each(function() {
      $(this).collapse('show');
    });
  });
  $("#rmd-hide-all-code").click(function() {
    $('div.r-code-collapse').each(function() {
      $(this).collapse('hide');
    });
  });

  // index for unique code element ids
  var currentIndex = 1;

  // select all R code blocks
  var rCodeBlocks = $('pre.r, pre.python, pre.bash, pre.sql, pre.cpp, pre.stan, pre.julia, pre.foldable');
  rCodeBlocks.each(function() {

    // create a collapsable div to wrap the code in
    var div = $('<div class="collapse r-code-collapse"></div>');
    var showThis = (show || $(this).hasClass('fold-show')) && !$(this).hasClass('fold-hide');
    var id = 'rcode-643E0F36' + currentIndex++;
    div.attr('id', id);
    $(this).before(div);
    $(this).detach().appendTo(div);

    // add a show code button right above
    var showCodeText = $('<span>' + (showThis ? 'Hide' : 'Code') + '</span>');
    var showCodeButton = $('<button type="button" class="btn btn-default btn-xs btn-secondary btn-sm code-folding-btn pull-right float-right"></button>');
    showCodeButton.append(showCodeText);
    showCodeButton
        .attr('data-toggle', 'collapse')
        .attr('data-target', '#' + id)
        .attr('aria-expanded', showThis)
        .attr('aria-controls', id);

    var buttonRow = $('<div class="row"></div>');
    var buttonCol = $('<div class="col-md-12"></div>');

    buttonCol.append(showCodeButton);
    buttonRow.append(buttonCol);

    div.before(buttonRow);

    // show the div if necessary
    if (showThis) div.collapse('show');

    // update state of button on show/hide
    //   * Change text
    //   * add a class for intermediate states styling
    div.on('hide.bs.collapse', function () {
      showCodeText.text('Code');
      showCodeButton.addClass('btn-collapsing');
    });
    div.on('hidden.bs.collapse', function () {
      showCodeButton.removeClass('btn-collapsing');
    });
    div.on('show.bs.collapse', function () {
      showCodeText.text('Hide');
      showCodeButton.addClass('btn-expanding');
    });
    div.on('shown.bs.collapse', function () {
      showCodeButton.removeClass('btn-expanding');
    });

  });

}
