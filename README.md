---
<!---
This is MD file so it needs the front matter or the build will fail
-->
---

# Local development

The site needs to be built and served by a web browser. To do them at the same time
use the following command, in the root of your project:

```bash
bundle exec jekyll serve
```

This command will also watch for changes in the site and rebuild it automatically.

If you prefer not to use the server provided by Jekyll you need to first build the site
with

```bash
bundle exec jekyll build
```

And then use a web server to serve the site, like for example the PHP built-in one

```bash
php -S localhost:8080 -t _site
```

P.S. For some reason using the PHP built-in server does nto work well when rebulding the
site because of some style changes. I would recommend using Jekyll to serve the site.