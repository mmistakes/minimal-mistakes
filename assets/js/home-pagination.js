(function() {
  function getCurrentPage(totalPages) {
    var url = new URL(window.location.href);
    var requestedPage = parseInt(url.searchParams.get("page"), 10);

    if (Number.isNaN(requestedPage) || requestedPage < 1) {
      return 1;
    }

    if (requestedPage > totalPages) {
      return totalPages;
    }

    return requestedPage;
  }

  function buildPageUrl(pageNumber) {
    var url = new URL(window.location.href);

    if (pageNumber <= 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", pageNumber);
    }

    url.hash = "recent-posts";

    return url.pathname + url.search + url.hash;
  }

  function createPageItem(label, href, options) {
    var item = document.createElement("li");
    var link = document.createElement("a");

    link.textContent = label;

    if (options.disabled) {
      link.href = "#";
      link.className = options.current ? "disabled current" : "disabled";
    } else {
      link.href = href;
    }

    item.appendChild(link);
    return item;
  }

  function createEllipsisItem() {
    return createPageItem("…", "#", { disabled: true, current: false });
  }

  function getVisiblePages(currentPage, totalPages) {
    var pages = [];
    var start;
    var end;
    var pageNumber;

    if (totalPages <= 7) {
      for (pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
        pages.push(pageNumber);
      }
      return pages;
    }

    pages.push(1);

    start = Math.max(2, currentPage - 1);
    end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 4) {
      start = 2;
      end = 4;
    }

    if (currentPage >= totalPages - 3) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    if (start > 2) {
      pages.push("ellipsis");
    }

    for (pageNumber = start; pageNumber <= end; pageNumber += 1) {
      pages.push(pageNumber);
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  }

  function renderNavigation(nav, labels, currentPage, totalPages) {
    var list = document.createElement("ul");
    var visiblePages = getVisiblePages(currentPage, totalPages);

    nav.innerHTML = "";

    if (totalPages <= 1) {
      nav.hidden = true;
      return;
    }

    if (currentPage > 1) {
      list.appendChild(createPageItem(labels.previous, buildPageUrl(currentPage - 1), { disabled: false, current: false }));
    } else {
      list.appendChild(createPageItem(labels.previous, "#", { disabled: true, current: false }));
    }

    visiblePages.forEach(function(pageNumber) {
      if (pageNumber === "ellipsis") {
        list.appendChild(createEllipsisItem());
        return;
      }

      if (pageNumber === currentPage) {
        list.appendChild(createPageItem(String(pageNumber), "#", { disabled: true, current: true }));
        return;
      }

      list.appendChild(createPageItem(String(pageNumber), buildPageUrl(pageNumber), { disabled: false, current: false }));
    });

    if (currentPage < totalPages) {
      list.appendChild(createPageItem(labels.next, buildPageUrl(currentPage + 1), { disabled: false, current: false }));
    } else {
      list.appendChild(createPageItem(labels.next, "#", { disabled: true, current: false }));
    }

    nav.appendChild(list);
    nav.hidden = false;
  }

  function renderPage(container) {
    var items = Array.prototype.slice.call(container.querySelectorAll("[data-home-post-item]"));
    var nav = container.nextElementSibling;
    var perPage = parseInt(container.getAttribute("data-posts-per-page"), 10) || 10;
    var totalPages = Math.max(1, Math.ceil(items.length / perPage));
    var currentPage = getCurrentPage(totalPages);
    var start = (currentPage - 1) * perPage;
    var end = start + perPage;
    var labels = {
      previous: container.getAttribute("data-prev-label") || "Previous",
      next: container.getAttribute("data-next-label") || "Next",
      page: container.getAttribute("data-page-label") || "Page"
    };

    items.forEach(function(item, index) {
      item.hidden = !(index >= start && index < end);
    });

    if (nav && nav.hasAttribute("data-home-pagination-nav")) {
      nav.setAttribute("aria-label", labels.page);
      renderNavigation(nav, labels, currentPage, totalPages);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    Array.prototype.slice.call(document.querySelectorAll("[data-home-pagination]")).forEach(function(container) {
      renderPage(container);
    });
  });
})();
