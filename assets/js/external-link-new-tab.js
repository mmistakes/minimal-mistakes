function handleExternalLinks () {
    var host = location.host
    var allLinks = document.querySelectorAll('a')
    forEach(allLinks, function (elem, index) {
      checkExternalLink(elem, host)
    })
  }
  
  function checkExternalLink (item, hostname) {
    var href = item.href
    var itemHost = href.replace(/https?:\/\/([^\/]+)(.*)/, '$1')
    if (itemHost !== '' && itemHost !== hostname) {
      item.target = '_blank'
    }
  }
  
  function forEach (array, callback, scope) {
    for (var i = 0; i < array.length; ++i) {
      callback.call(scope, array[i], i)
    }
  }
  
  handleExternalLinks ()