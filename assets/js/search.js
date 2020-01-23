 /* Copyright (c) 2017 MvvmCross */
 
 (function() {

     var titleBoost = 1;
     var authorBoost = 1;
     var categoryBoost = 1;
     var content = 1;

     var contentLength = 300;

     function displaySearchResults(results, store) {
         var searchResults = document.getElementById('search-results');

         if (results.length) {
             var appendString = '';

             for (var i = 0; i < results.length; i++) { // Iterate over the results
                 var item = store[results[i].ref];
                 appendString += '<li><a href="..' + item.url + '"><h3>' + item.title + '</h3></a>';
                 appendString += '<p>' + item.content.substring(0, contentLength) + '...</p></li>';
             }
             searchResults.innerHTML = appendString;
         } else {
             searchResults.innerHTML = '<li>No results found</li>';
         }
     }
    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
         document.getElementById('search').setAttribute("value", searchTerm);
         if (searchTerm) {
             var idx = lunr(function() {
                 this.field('id');
                 this.field('title', {
                     boost: titleBoost
                 });
                 this.field('author', {
                     boost: authorBoost
                 });
                 this.field('category', {
                     boost: categoryBoost
                 });
                 this.field('content', {
                     boost: content
                 });
             });

             for (var key in window.store) { // Add the data to lunr
                 idx.add({
                     'id': key,
                     'title': window.store[key].title,
                     'author': window.store[key].author,
                     'category': window.store[key].category,
                     'content': window.store[key].content
                 });

                 var results = idx.search(searchTerm); // Get lunr to perform a search
                 displaySearchResults(results, window.store); 
             }
         }
     }
 })();
