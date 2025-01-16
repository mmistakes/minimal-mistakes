## Script to render Rmarkdown to pdf
# Author: Tyler Pollard
# Date: 22Aug2024

library(rmarkdown)

render(input = "assets/Resume/Resume.Rmd", 
       output_format = "pdf_document", 
       output_dir = "assets/download",
       output_file = "resume.pdf")
