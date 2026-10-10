(function () {
  // Mobile menu toggle
  var button = document.querySelector(".site-nav .menu-icon");
  var menu = document.querySelector(".site-nav .menu");
  if (button && menu) {
    button.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Table of contents for posts with `toc: true`
  var toc = document.querySelector("[data-toc]");
  var content = document.querySelector(".post-content");
  if (toc && content) {
    var list = toc.querySelector("ul");
    var headings = content.querySelectorAll("h2[id], h3[id]");
    headings.forEach(function (heading) {
      var item = document.createElement("li");
      item.className = "toc-" + heading.tagName.toLowerCase();
      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent;
      item.appendChild(link);
      list.appendChild(item);
    });
    if (headings.length > 0) toc.hidden = false;
  }
  // Chip filters driven by the URL hash: blog categories (/blog/#llm) and publication topics (/publications/#nlp)
  var setupFilter = function (chips, groupSelector) {
    if (!chips) return;
    var applyFilter = function () {
      var current = decodeURIComponent(location.hash.slice(1));
      if (!chips.querySelector('[data-category="' + current + '"]')) current = "";
      chips.querySelectorAll("[data-category]").forEach(function (chip) {
        var active = chip.getAttribute("data-category") === current;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-current", active ? "true" : "false");
      });
      document.querySelectorAll(groupSelector).forEach(function (group) {
        var visible = 0;
        group.querySelectorAll("[data-categories]").forEach(function (item) {
          var match = !current || item.getAttribute("data-categories").split(" ").indexOf(current) !== -1;
          item.hidden = !match;
          if (match) visible++;
        });
        group.hidden = visible === 0;
      });
    };
    chips.querySelector('[data-category=""]').addEventListener("click", function (event) {
      event.preventDefault();
      history.pushState(null, "", location.pathname);
      applyFilter();
    });
    window.addEventListener("hashchange", applyFilter);
    applyFilter();
  };
  setupFilter(document.querySelector("[data-blog-categories]"), "[data-blog-year]");
  setupFilter(document.querySelector("[data-pub-tags]"), "[data-filter-group]");
})();
