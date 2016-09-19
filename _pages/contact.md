---
title: "Contact Us"
layout: single
excerpt: "Contact Us Form"
sitemap: false
permalink: /contact.html
---

<link href="formstyle.css" rel="stylesheet">

## Please provide your name, email address and a short message 

**Note**: Please do not use this form for enquiries specific to the interactive applications.  
Contact the application developer directly for questions or issues with the Shiny apps.

<div class="contactform">
<form id="contactform" method="POST">
  <label for="fname">Name</label>
  <input type="text" name="name" placeholder="Your name">
  <label for="fname">Email Address</label>  
  <input type="email" name="_replyto" placeholder="Your email">
  <input type="hidden" name="_subject" value="New submission" />
  <label for="fname">Your Message</label>
  <textarea name="body" placeholder="Your message"></textarea>
  <input type="submit" value="Send">
  <input type="hidden" name="_next" value="/thanks.html" />
  <input type="text" name="_gotcha" style="display:none" />
</form>
</div>
<script>
    var contactform =  document.getElementById('contactform');
    contactform.setAttribute('action', '//formspree.io/' + 'barefootecologist' + '@' + 'gmail' + '.' + 'com');
</script>
