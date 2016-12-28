DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
Rscript -e "source('$DIR/rmarkdown.r'); convertRMarkdown(images.dir='$DIR/assets/images')"