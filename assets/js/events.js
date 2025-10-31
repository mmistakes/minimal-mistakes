
(function(){
  function track(eventName, params){
    try {
      if (window.gtag) { window.gtag('event', eventName, params || {}); }
      if (window.dataLayer) { window.dataLayer.push(Object.assign({event: eventName}, params||{})); }
    } catch(e){ /* noop */ }
  }
  // Track CTA clicks
  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    if (a.textContent && /book|diagnosis|assessment|review|fit conversation/i.test(a.textContent)){
      track('cta_click', {link_text: a.textContent.trim(), link_url: href});
    }
    if (/\/book\/$/.test(href)) {
      track('calendly_open', {link_text: a.textContent.trim(), link_url: href});
    }
    if (/Download now/i.test(a.textContent)) {
      track('resource_download', {resource: a.getAttribute('href')});
    }
  }, true);

  // Expose for manual use
  window.SmartWaveTrack = track;
})();

function isOutbound(url){try{var u=new URL(url,window.location.href);return u.host!==window.location.host;}catch(e){return false;}}
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href]'); if(!a) return;
  var href = a.getAttribute('href');
  if (isOutbound(href)){ SmartWaveTrack('outbound_click', {link_text:(a.textContent||'').trim(), link_url: href}); }
}, true);
