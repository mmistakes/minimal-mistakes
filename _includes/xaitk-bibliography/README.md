The xaitk-bibliography is statically generated due to limitations in the Github Pages support for jekyll plugins.

To rebuild the bibliography:

	1) Save the bibtex you want to render under references.bib in the current directory
	2) Run the command `bundle exec jekyll clean` to clear the current generated files
	3) Run the command `bundle exec jekyll build` from the current directory

To configure bibliography generation, edit `_config.yml` in accordance with desired settings,
as found [here](https://github.com/inukshuk/jekyll-scholar)