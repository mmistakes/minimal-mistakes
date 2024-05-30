---
title: "Data-Efficient Learning with Neural Programs"
layout: single
excerpt: ""
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image:
  teaser:
  actions:
    - label: "Paper"
      url: 
    - label: "Code"
      url:
authors:


---
<style>
.histogram-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
}

.histogram-row > * {
    flex: 0 0 48%; /* this ensures the child takes up 48% of the parent's width (leaving a bit of space between them) */
}

</style>

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


<script>
$(document).ready(function(){
    // Iterate over each figure
    $("figure.sopfig").each(function(){
        var $figure = $(this);
        var imgSrc = $figure.find("img").attr("src");
        var jsonURL = imgSrc.replace(".png", ".json").replace("/figs/", "/json/");
        var jsonURLorig;
        if (imgSrc.includes("good/")) {
            jsonURLorig = imgSrc.replace("/figs/", "/json/").replace(/good\/.*$/, "original.json");
        } else if (imgSrc.includes("bad/")) {
            jsonURLorig = imgSrc.replace("/figs/", "/json/").replace(/bad\/.*$/, "original.json");
        }
        console.log(jsonURLorig);

        // Fetch the JSON data from jsonURL
        $.getJSON(jsonURL, function(data){
            var predClass = data.pred_class;

            // Fetch the JSON data from jsonURLorig inside the previous callback
            $.getJSON(jsonURLorig, function(dataOrig){
                var predClassOrig = dataOrig.pred_class;
                var predClassColor = (predClass === predClassOrig) ? "#3a66a3" : "#b23030";
                var captionText = "<strong>Mask Weight</strong>: " +
                  (data.mask_weight == 1 || data.mask_weight == 0 ? data.mask_weight.toFixed(1) : data.mask_weight) +
                  "<br><strong>Probability</strong>: " +
                  (data.pred_prob == 1 || data.pred_prob == 0 ? data.pred_prob.toFixed(1) : data.pred_prob) +
                  "<br><strong>Predicted</strong>: <span style='color:" + predClassColor + "'>" + predClass + "</span>";

                $figure.find("figcaption").html(captionText);
            });
        });
    });
});
</script>
