/*
 * Comments for GitHub Pages via Liquid/Jekyll
 *
 * Copyright 2015 Joe Friedrichsen
 * Released under the Apache 2.0 license.
 *
 * Learn more at https://github.com/wireddown/ghpages-ghcomments
 *
 */

/* Globals */

var ShortMonthForIndex = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };
var AccessToken = "";
var IssueUrl = "";
var CommentsUrl = "";
var CommentsArray = [];
var StateChallenge = "";
var WriteMode = "write", PreviewMode = "preview";

var AllCommentsDiv = document.getElementById("gpgc_all_comments");
var NoCommentsDiv = document.getElementById("gpgc_no_comments");
var ActionsDiv = document.getElementById("gpgc_actions");
var ShowCommentsButton = document.getElementById("show_comments_button");

var DisabledCommentsDiv = document.getElementById("gpgc_disabled");
var NewCommentDiv = document.getElementById("gpgc_new_comment");
var WriteButton = document.getElementById("write_button");
var WriteDiv = document.getElementById("write_div");
var CommentMarkdown = document.getElementById("new_comment_field");
var PreviewButton = document.getElementById("preview_button");
var PreviewDiv = document.getElementById("preview_div");

var ReaderGitHubUrl = document.getElementById("gpgc_reader_url");
var ReaderAvatarUrl = document.getElementById("gpgc_reader_avatar");
var ReaderLogin = document.getElementById("gpgc_reader_login");
var LoginButton = document.getElementById("login_button");
var SubmitButton = document.getElementById("submit_button");

var HelpMessageDiv = document.getElementById("help_message");
var ErrorDiv = document.getElementById("gpgc_reader_error");

/* main */

function gpgc_main() {
  if (gpgc.enable_diagnostics)
  {
    verifyInitialConditions();
    verifyCss();
  }

  if (gpgc.new_comments_disabled) {
    disableNewCommentForm();  
  } else {
    initializeData();
    initializeEvents();
    initializeNewCommentForm();
  }

  findAndCollectComments(gpgc.repo_id, gpgc.issue_title);
}

/* Data */

function initializeData() {
  retrieveToken();
}

function retrieveToken() {
  AccessToken = localStorage.getItem("AccessToken");
  if (AccessToken === null) {
    AccessToken = "";
  }
}

function persistToken() {
  localStorage.setItem("AccessToken", AccessToken);
}

function clearToken() {
  AccessToken = "";
  authenticateUser();
  persistToken();
}

/* Events */

function initializeEvents() {
  window.addEventListener("message", onMessage);
}

function onMessage(event) {
  if (event.data.type === undefined) { return; }

  switch (event.data.type) {
  case "login":
    if (event.origin === gpgc.site_url && event.data.state === StateChallenge) {
      handleLogin(event.data.code);
    }
    return;
  default:
    showFatalError("Unknown event: " + JSON.stringify(event.data));
    return;
  }
}

/* New comment form */

function disableNewCommentForm() {
  hideElement(NewCommentDiv);
  showElement(DisabledCommentsDiv);
}

function initializeNewCommentForm() {
  authenticateUser();
  updateCommentFormMode(WriteMode, /* reset: */ false);
}

function updateCommentFormMode(newMode, reset) {
  var elementsToShow = [];
  var elementsToHide = [];

  if (newMode === PreviewMode) {
    WriteButton.onclick = function () { updateCommentFormMode(WriteMode, /* reset: */ false); };
    WriteButton.classList.remove("selected");
    PreviewButton.onclick = null;
    PreviewButton.classList.add("selected");
    elementsToHide.push(WriteDiv);
    elementsToShow.push(PreviewDiv);
    PreviewDiv.innerHTML = "";
    renderMarkdown(CommentMarkdown.value);
  } else if (newMode === WriteMode) {
    WriteButton.onclick = null;
    WriteButton.classList.add("selected");
    PreviewButton.onclick = function () { updateCommentFormMode(PreviewMode, /* reset: */ false); };
    PreviewButton.classList.remove("selected");
    elementsToShow.push(WriteDiv);
    elementsToHide.push(PreviewDiv);
  }

  updateElements(elementsToShow, elementsToHide, /* elementsToEnable: */ null, /* elementsToDisable: */ null);

  if (reset) {
    CommentMarkdown.value = "";
    PreviewDiv.innerHTML = "";
  }
}

function updateCommenterInformation(userJson) {
  ReaderGitHubUrl.href = userJson.html_url;
  ReaderAvatarUrl.src = userJson.avatar_url;
  ReaderLogin.innerHTML = userJson.login;
}

/* GitHub: User authentication */

function authenticateUser() {
  if (AccessToken.length === 40) {
    var userIdUrl = "https://api.github.com/user";
    getGitHubApiRequestWithCompletion(
      userIdUrl,
      /* data: */ null,
      AccessToken,
      /* onPreRequest: */ noop,
      onUserAuthenticated,
      onUserAuthenticationError
    );
  } else if (AccessToken.length === 0) {
    onAuthenticateUserFailed();
    showCommentHelpMessage("To leave a comment, please login to GitHub.");
  } else {
    onAuthenticateUserFailed();
    showFatalError("An OAuth token must be 40 characters long, this one is " + AccessToken.length + " long.");
  }
}

function onUserAuthenticated(checkAuthenticationRequest) {
  var elementsToShow = [ SubmitButton ];
  var elementsToHide = [ LoginButton ];
  var elementsToEnable = [ SubmitButton ];
  var elementsToDisable = [  ];
  persistToken();
  updateCommenterInformation(JSON.parse(checkAuthenticationRequest.responseText));
  clearCommentHelp();
  updateElements(elementsToShow, elementsToHide, elementsToEnable, elementsToDisable);
}

function onUserAuthenticationError(checkAuthenticationRequest) {
  AccessToken = "";
  var helpErrorMessage = "Sorry, it looks like your login failed. Please try again, or <a href='https://github.com/settings/applications'>reset</a> your <strong>ghpages-ghcomments</strong> authorization.";
  var isRawHtml = false;
  if (gpgc.enable_diagnostics) {
    helpErrorMessage = "<h3><strong>gpgc</strong> Error: Authentication Failed</h3><p>Could not authenticate OAuth token</p><p>GitHub response:</p><p><pre>" + checkAuthenticationRequest.responseText + "</pre></p>";
    isRawHtml = true;
  }

  showCommentHelpError(helpErrorMessage, isRawHtml);
  onAuthenticateUserFailed();
  return;
}

function onAuthenticateUserFailed() {
  var elementsToShow = [ LoginButton ];
  var elementsToHide = [ SubmitButton ];
  var elementsToEnable = [ LoginButton ];
  var elementsToDisable = [ SubmitButton ];
  updateElements(elementsToShow, elementsToHide, elementsToEnable, elementsToDisable);
  updateCommenterInformation({
    login: "You",
    html_url: "https://github.com/wireddown/ghpages-ghcomments",
    avatar_url: "https://raw.githubusercontent.com/wireddown/ghpages-ghcomments/gh-pages/public/apple-touch-icon-precomposed.png"
  });
}

/* GitHub: Web app login */

function loginToGitHub() {
  var challengeArray = new Uint32Array(2);
  window.crypto.getRandomValues(challengeArray);
  StateChallenge = challengeArray[0].toString() + challengeArray[1].toString();
  var data = {
    "client_id": gpgc.github_application_client_id,
    "scope": "public_repo",
    "state": StateChallenge,
    "redirect_uri": gpgc.github_application_login_redirect_url
  };

  var urlParameters = Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
  }).join("&");

  window.open(
    "https://github.com/login/oauth/authorize?" + urlParameters,
    "Log In to GitHub",
    "resizable,scrollbars,status,width=1024,height=620"
  );
}

function handleLogin(code) {
  disableElement(LoginButton);
  clearCommentHelp();
  showCommentHelpMessage("<em>Finishing login...<em>");
  getTokenUsingCode(code);
}

function getTokenUsingCode(code) {
  getGitHubApiRequestWithCompletion(
    gpgc.github_application_code_authenticator_url + code,
    /* data: */ null,
    /* accessToken: */ null,
    /* onPreRequest: */ noop,
    onTokenRetrieved,
    onRetrieveTokenFailed
  );
}

function onTokenRetrieved(retrieveTokenRequest) {
  var tokenResponse = JSON.parse(retrieveTokenRequest.responseText);
  if (tokenResponse.token !== undefined) {
    AccessToken = tokenResponse.token;
    persistToken();
  } else {
    onRetrieveTokenFailed(retrieveTokenRequest);
  }

  authenticateUser();
}

function onRetrieveTokenFailed(retrieveTokenRequest) {
  enableElement(LoginButton);
  clearCommentHelp();
  showFatalError("onRetrieveTokenFailed: \n\n" + retrieveTokenRequest.responseText);
}

/* GitHub: Search for comment issue */

function findAndCollectComments(repositoryID, issueTitle) {
  var safeQuery = encodeURI(issueTitle);
  var seachQueryUrl = "https://api.github.com/search/issues?q=" + safeQuery + "+repo:" + repositoryID + "+type:issue+in:title";
  getGitHubApiRequestWithCompletion(
    seachQueryUrl,
    /* data: */ null,
    AccessToken,
    /* onPreRequest: */ noop,
    onSearchComplete,
    onSearchError
  );
}

function onSearchComplete(searchRequest) {
  var searchResults = JSON.parse(searchRequest.responseText);
  if (searchResults.total_count === 1) {
    var shouldQueryComments = !isIssueMuted(searchResults.items[0].labels);
    if (shouldQueryComments) {
      IssueUrl = searchResults.items[0].html_url;
      CommentsUrl = searchResults.items[0].comments_url;
      getGitHubApiRequestWithCompletion(
        CommentsUrl,
        /* data: */ null,
        AccessToken,
        /* onPreRequest: */ noop,
        onQueryComments,
        onQueryCommentsError
      );
    } else {
      disableNewCommentForm();
    }
  } else {
    onSearchError(searchRequest);
  }
}

function onSearchError(searchRequest) {
  if (gpgc.enable_diagnostics) {
    var searchErrorMessage = "";
    if (searchRequest.status !== 200) {
      searchErrorMessage = "<h3><strong>gpgc</strong> Error: Search Failed</h3><p>Could not search GitHub repository <strong><a href='https://www.github.com/" + gpgc.repo_id + "'>" + gpgc.repo_id + "</a></strong>.</p><p>GitHub response:</p><p><pre>" + searchRequest.responseText + "</pre></p><p>Check:<ul><li><code>repo_owner</code> in <code>_data/gpgc.yml</code> for typos.</li><li><code>repo_name</code> in <code>_data/gpgc.yml</code> for typos.</li></ul></p>";
    }

    var missingIssueMessage = "";
    var searchResults = JSON.parse(searchRequest.responseText);
    if (searchResults.total_count !== undefined && searchResults.total_count === 0) {
      missingIssueMessage = "<h3><strong>gpgc</strong> Error: Missing Issue</h3><p>Could not find comment issue with the title <em>" + gpgc.issue_title + "</em> in the repository <strong><a href='https://www.github.com/" + gpgc.repo_id + "'>" + gpgc.repo_id + "</a></strong>.</p><p>Check:<ul><li>for typos in the Jekyll <code>title</code> front matter for this post: <code>" + gpgc.page_path + "</code>.</li><li>that the <code>repo_name</code> in <code>_data/gpgc.yml</code> matches the repository for this site.</li><li>the terminal output from <code>git push</code> for other error messages if the git hooks are installed.</li></ul></p>";
    }

    var allMessagesHtml = searchErrorMessage + missingIssueMessage;
    if (allMessagesHtml.length > 0) {
      allMessagesHtml += "<h3>Search Help</h3><p>Verify your site's configuration with the <a href='http://downtothewire.io/ghpages-ghcomments/setup/'>setup instructions</a> and refer to the <a href='http://downtothewire.io/ghpages-ghcomments/advanced/verbose-usage/'>verbose usage</a> for step-by-step details.</p><p>Contact <strong><a href='https://github.com/wireddown/ghpages-ghcomments/issues'>ghpages-ghcomments</a></strong> for more help.</p>";

      ErrorDiv.innerHTML += allMessagesHtml;
      showElement(ErrorDiv);
    }
  } else {
    if (searchRequest.status === 401) {
      AccessToken = "";
      findAndCollectComments(gpgc.repo_id, gpgc.issue_title);
    } else {
      showFatalError("onSearchError: \n\n" + searchRequest.responseText);
    }
  }
}

function isIssueMuted(labelsArray) {
  for (var i = 0; i < labelsArray.length; i++) {
    if (labelsArray[i].name === "GPGC Muted") {
      return true;
    }
  }

  return false;
}

/* GitHub: Retrieve comments */

function onQueryComments(commentRequest) {
  CommentsArray = CommentsArray.concat(JSON.parse(commentRequest.responseText));
  var commentsPages = commentRequest.getResponseHeader("Link");
  if (commentsPages) {
    var commentsLinks = commentsPages.split(",");
    for (var i = 0; i < commentsLinks.length; i++) {
      if (commentsLinks[i].search('rel="next"') > 0) {
        var linkStart = commentsLinks[i].search("<");
        var linkStop = commentsLinks[i].search(">");
        var nextLink = commentsLinks[i].substring(linkStart + 1, linkStop);
        getGitHubApiRequestWithCompletion(
          nextLink,
          /* data: */ null,
          AccessToken,
          /* onPreRequest: */ noop,
          onQueryComments,
          onQueryCommentsError);
        return;
      }
    }
    updateCommentsAndActions(CommentsArray);
  }
  else {
    updateCommentsAndActions(CommentsArray);
  }
}

function onQueryCommentsError(commentRequest) {
  showFatalError("onQueryCommentsError: \n\n" + commentRequest.responseText);
}

/* GitHub: Render markdown */

function renderMarkdown(markdown) {
  renderUrl = "https://api.github.com/markdown";
  markdownBundle = {
    text: markdown,
    mode: "gfm",
    context: gpgc.repo_id
  };
  postGitHubApiRequestWithCompletion(
    renderUrl,
    JSON.stringify(markdownBundle),
    AccessToken,
    onRenderRequestStarted,
    onMarkdownRendered,
    onMarkdownRenderError
  );
}

function onRenderRequestStarted() {
  PreviewDiv.innerHTML = "<p><em>Rendering...</em></p>";
}

function onMarkdownRendered(renderRequest) {
  var renderedHtml = renderRequest.responseText;
  PreviewDiv.innerHTML = renderedHtml;
}

function onMarkdownRenderError(renderRequest) {
  var helpErrorMessage = "Sorry, something surprising happened. Please try again.";
  var isRawHtml = false;
  if (gpgc.enable_diagnostics) {
    helpErrorMessage = "<h3><strong>gpgc</strong> Error: Render Failed</h3><p>Could not render comment markdown</p><p>GitHub response:</p><p><pre>" + renderRequest.responseText + "</pre></p>";
    isRawHtml = true;
  }

  showCommentHelpError(helpErrorMessage, isRawHtml);
  return;
}

/* GitHub: Post comment */

function postComment() {
  if (CommentMarkdown.value.length === 0) {
    showCommentHelpError("Sorry, but your comment is empty. Please try again.", /* isRawHtml: */ false);
    return;
  } else {
    clearCommentHelp();
  }

  var createCommentJson = { body: CommentMarkdown.value };
  postGitHubApiRequestWithCompletion(
    CommentsUrl,
    JSON.stringify(createCommentJson),
    AccessToken,
    onPostCommentStarted,
    onCommentPosted,
    onPostCommentError
  );
}

function onPostCommentStarted() {
  showCommentHelpMessage("<em>Posting comment...</em>");
}

function onCommentPosted(postCommentRequest) {
  var commentInformation = JSON.parse(postCommentRequest.responseText);
  var newComment = formatComment(commentInformation.user.avatar_url, commentInformation.user.html_url, commentInformation.user.login, commentInformation.body_html, commentInformation.updated_at);
  AllCommentsDiv.innerHTML += newComment;
  showAllComments();
  updateCommentFormMode(WriteMode, /* reset: */ true);
  clearCommentHelp();
}

function onPostCommentError(postCommentRequest) {
  var helpErrorMessage = "Sorry, something surprising happened. Please try again.";
  var isRawHtml = false;
  if (gpgc.enable_diagnostics) {
    helpErrorMessage = "<h3><strong>gpgc</strong> Error: Comment Failed</h3><p>Could not create a new comment</p><p>GitHub response:</p><p><pre>" + postCommentRequest.responseText + "</pre></p>";
    isRawHtml = true;
  }

  showCommentHelpError(helpErrorMessage, isRawHtml);
}

/* Comments */

function updateCommentsAndActions(allComments) {
  var elementsToShow = [];
  var elementsToHide = [];

  if (allComments.length === 0) {
    elementsToShow.push(NoCommentsDiv);
  } else {
    var allCommentsHtml = formatAllComments(CommentsArray);
    AllCommentsDiv.innerHTML = allCommentsHtml + AllCommentsDiv.innerHTML;

    var commentOrComments = allComments.length === 1 ? "Comment" : "Comments";
    ShowCommentsButton.innerHTML = "Show " + allComments.length + " " + commentOrComments;

    if (typeof gpgc.use_show_action === "boolean" && gpgc.use_show_action) {
      elementsToShow.push(ActionsDiv);
      elementsToHide.push(AllCommentsDiv);
    } else {
      elementsToHide.push(ActionsDiv);
      elementsToShow.push(AllCommentsDiv);
    }
  }

  updateElements(elementsToShow, elementsToHide, /* elementsToEnable: */ null, /* elementsToDisable: */ null);
}

function formatAllComments(allComments) {
  var allCommentsHtml = "";
  for (var i = 0; i < allComments.length; i++) {
    var user = allComments[i].user;
    allCommentsHtml += formatComment(user.avatar_url, user.html_url, user.login, allComments[i].body_html, allComments[i].updated_at);
  }

  return allCommentsHtml;
}

function formatComment(userAvatarUrl, userHtmlUrl, userLogin, commentBodyHtml, commentTimeStamp) {
  var commentDate = new Date(commentTimeStamp);
  var shortMonth = ShortMonthForIndex[commentDate.getMonth()];
  var commentHtml = "<div class='gpgc-comment'>";
  commentHtml += "<div class='gpgc-comment-header'>";
  commentHtml += "<a href='" + userHtmlUrl + "'><img class='gpgc-avatar' src='" + userAvatarUrl + "' height='42' />" + userLogin + "</a> ";
  commentHtml += "<small>on " + commentDate.getDate() + " " + shortMonth + " " + commentDate.getFullYear() + "</small>";
  commentHtml += "</div>";
  commentHtml += "<div class='gpgc-comment-contents'>" + commentBodyHtml + "</div>";
  commentHtml += "</div>";
  return commentHtml;
}

function showAllComments(allComments) {
  var elementsToShow = [ AllCommentsDiv ];
  var elementsToHide = [ ActionsDiv, NoCommentsDiv ];
  updateElements(elementsToShow, elementsToHide, /* elementsToEnable: */ null, /* elementsToDisable: */ null);
}

/* Help and error messages */

function showCommentHelpMessage(message) {
  showCommentHelp(message, /* isRawHtml: */ false, "gpgc-help-message", "gpgc-help-error");
}

function showCommentHelpError(error, isRawHtml) {
  showCommentHelp(error, isRawHtml, "gpgc-help-error", "gpgc-help-message");
}

function showCommentHelp(message, isRawHtml, cssClassToAdd, cssClassToRemove) {
  if (isRawHtml) {
    HelpMessageDiv.innerHTML = message;
  } else {
    HelpMessageDiv.innerHTML = "<p>" + message + "</p>";
  }
  HelpMessageDiv.classList.add(cssClassToAdd);
  HelpMessageDiv.classList.remove(cssClassToRemove);
  showElement(HelpMessageDiv);
}

function clearCommentHelp() {
  HelpMessageDiv.innerHTML = "";
  HelpMessageDiv.classList.remove("gpgc-help-message");
  HelpMessageDiv.classList.remove("gpgc-help-error");
  hideElement(HelpMessageDiv);
}

function showFatalError(internalMessage) {
  var nextStepMessage = "<p>If you're the site owner, please set <code>enable_diagnostics</code> to <code>true</code> in <code>_data/gpgc.yml</code> to see more details.</p>";
  if (gpgc.enable_diagnostics) {
    nextStepMessage = "<p>If you're the site owner, please contact <strong><a href='https://github.com/wireddown/ghpages-ghcomments/issues'>ghpages-ghcomments</a></strong> for help.</p><p><strong>Internal message</strong></p><pre>" + internalMessage + "</pre>";
  }

  ErrorDiv.innerHTML += "<h2>Oops!</h2><p>Something surprising happened.</p>" + nextStepMessage;
  showElement(ErrorDiv);
}

/* Visual element manipulation */

function updateElements(elementsToShow, elementsToHide, elementsToEnable, elementsToDisable) {
  if (elementsToShow !== null) { showElements(elementsToShow); }
  if (elementsToHide !== null) { hideElements(elementsToHide); }
  if (elementsToEnable !== null) { enableElements(elementsToEnable); }
  if (elementsToDisable !== null) { disableElements(elementsToDisable); }
}

function updateElementVisibility(element, makeVisible) {
  if (makeVisible) {
    element.classList.remove("gpgc-hidden");
  } else {
    element.classList.add("gpgc-hidden");
  }
}

function showElement(element) {
  updateElementVisibility(element, /* makeVisible: */ true);
}

function showElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    showElement(elementList[i]);
  }
}

function hideElement(element) {
  updateElementVisibility(element, /* makeVisible: */ false);
}

function hideElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    hideElement(elementList[i]);
  }
}

function updateElementInteractivity(element, makeInteractive) {
  if (makeInteractive) {
    element.disabled = false;
  } else {
    element.disabled = true;
  }
}

function enableElement(elementToEnable) {
  updateElementInteractivity(elementToEnable, /* makeInteractive: */ true);
}

function enableElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    enableElement(elementList[i]);
  }
}

function disableElement(elementToDisable) {
  updateElementInteractivity(elementToDisable, /* makeInteractive: */ false);
}

function disableElements(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    disableElement(elementList[i]);
  }
}

/* Async web requests */

function getGitHubApiRequestWithCompletion(url, data, accessToken, onPreRequest, onSuccess, onError) {
  doGitHubApiRequestWithCompletion("GET", url, data, accessToken, onPreRequest, onSuccess, onError);
}

function postGitHubApiRequestWithCompletion(url, data, accessToken, onPreRequest, onSuccess, onError) {
  doGitHubApiRequestWithCompletion("POST", url, data, accessToken, onPreRequest, onSuccess, onError);
}

function doGitHubApiRequestWithCompletion(method, url, data, accessToken, onPreRequest, onSuccess, onError) {
  var gitHubRequest = new XMLHttpRequest();
  gitHubRequest.open(method, url, /* async: */ true);

  if (accessToken !== null && accessToken !== "") {
    gitHubRequest.setRequestHeader("Authorization", "token " + accessToken);
  }

  gitHubRequest.setRequestHeader("Accept", "application/vnd.github.v3.html+json");
  gitHubRequest.onreadystatechange = function () { onRequestReadyStateChange(gitHubRequest, onSuccess, onError); };

  onPreRequest();
  gitHubRequest.send(data);
}

function noop() {
}

function onRequestReadyStateChange(httpRequest, onSuccess, onError) {
  if (httpRequest.readyState !== 4) { return; }
  if (httpRequest.status === 200 || httpRequest.status === 201) {
    onSuccess(httpRequest);
  } else {
    onError(httpRequest);
  }
}

/* Diagnostics */

function verifyCss() {
  var css = document.styleSheets;
  var foundCssInHead = false;
  var fetchedCss = false;
  for (var i = 0; i < css.length; i++) {
    if (css[i].href.match("gpgc_styles.css")) {
      foundCssInHead = true;
      if (css[i].cssRules.length > 0) {
        fetchedCss = true;
      }
      break;
    }
  }

  var missingCssMessage = "";
  if (! foundCssInHead) {
    missingCssMessage = "<h3><strong>gpgc</strong> Error: Missing CSS</h3><p><code>gpgc_styles.css</code> is not in the &lt;head&gt; element.</p><p>Add a <code>&lt;link&gt;</code> element to <code>_includes/head.hml</code>.</p>";
  }

  var css404Message = "";
  if (! fetchedCss && foundCssInHead) {
    css404Message = "<h3><strong>gpgc</strong> Error: CSS 404</h3><p>Could not retrieve <code>gpgc_styles.css</code> from your site.</p><p>Check <code>_includes/head.hml</code> for typos.</p>";
  }

  var allMessagesHtml = missingCssMessage + css404Message;
  showGeneralHelp(allMessagesHtml);
}

function verifyInitialConditions() {
  var missingPropertyMessage = "<h3><strong>gpgc</strong> Error: Incomplete Configuration</h3><p>The following settings are missing:</p>";
  var stringPropertyNames = ["site_url", "page_path", "issue_title", "repo_id", "github_application_client_id", "github_application_code_authenticator_url", "github_application_login_redirect_url"];
  var booleanPropertyNames = ["new_comments_disabled", "use_show_action", "enable_diagnostics"];
  var missingPropertyCounter = 0;

  for (var index in stringPropertyNames) {
    var stringProperty = stringPropertyNames[index];
    if (gpgc[stringProperty].length < 1) {
      if (missingPropertyCounter == 0) {
        missingPropertyMessage = missingPropertyMessage + "<ol>";
      }

      missingPropertyMessage = missingPropertyMessage + "<li>" + stringProperty + "</li>";
      missingPropertyCounter++;
    }
  }

  for (var index in booleanPropertyNames) {
    var booleanProperty = booleanPropertyNames[index];
    if (typeof(gpgc[booleanProperty]) != "boolean") {
      if (missingPropertyCounter == 0) {
        missingPropertyMessage = missingPropertyMessage + "<ol>";
      }

      missingPropertyMessage = missingPropertyMessage + "<li>" + booleanProperty + "</li>";
      missingPropertyCounter++;
    }
  }

  if (missingPropertyCounter > 0) {
    missingPropertyMessage = missingPropertyMessage + "</ol>";
    showGeneralHelp(missingPropertyMessage);
  }
}

function showGeneralHelp(allMessagesHtml) {
  if (allMessagesHtml.length > 0) {
    allMessagesHtml += "<h3>Help</h3><p>Verify your site's configuration with the <a href='http://downtothewire.io/ghpages-ghcomments/setup/'>setup instructions</a> and refer to the <a href='http://downtothewire.io/ghpages-ghcomments/advanced/verbose-usage/'>verbose usage</a> for step-by-step details.</p><p>Contact <strong><a href='https://github.com/wireddown/ghpages-ghcomments/issues'>ghpages-ghcomments</a></strong> for more help.</p>";

    ErrorDiv.innerHTML += allMessagesHtml;
    showElement(ErrorDiv);
  }
}