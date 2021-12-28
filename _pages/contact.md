---
permalink: /contact/
layout: single
title: "Contact Me"
author_profile: false
sidebar:
  nav: "docs"
---

<!-- modify this form HTML and place wherever you want your form -->
<form
  action="https://formspree.io/f/xjvlkgev"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="_replyto">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <div class="g-recaptcha" data-sitekey="6Lfg7dEdAAAAALTszhU1TgsvxmMzj7s7d7It0dxA"></div> <!-- replace with your recaptcha SITE key not secret key -->
      <br/>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>
