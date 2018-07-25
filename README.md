# Local development

In the project root directory run the following command to generate the site

```bash
bundle exec jekyll build
```

If you would like the site to be regenerated automatically with every change then add the ```--watch``` option

Don't forget to run a web server to serve your site. You can use the PHP built-in one with the following command

```bash
php -S localhost:8080 _site/index.html
```
