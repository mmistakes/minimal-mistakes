
window.initializeSourceEmbed = function(filename) {
  $("#rmd-download-source").click(function() {
    var src = $("#rmd-source-code").html();
    var a = document.createElement('a');
    a.href = "data:text/x-r-markdown;base64," + src;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};
