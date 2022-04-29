document.addEventListener('scroll', _ => {
  var docElem = document.documentElement;
  var docBody = document.body;
  var scrollTop = (docBody.scrollTop || docElem.scrollTop);
  var height = docElem.scrollHeight - docElem.clientHeight;

  progress = scrollTop / height * 100;

  if ( progress > 0) {
    progressBar = document.querySelector('#progress-bar');
    progressBar.style.setProperty('--progress', progress + '%');
  } else {
    progressBar.style.setProperty('--progress', '0%');
  }
});

