#' This R script will process all R markdown files (those with in_ext file extention,
#' .rmd by default) in the current working directory. Files with a status of
#' 'processed' will be converted to markdown (with out_ext file extention, '.markdown'
#' by default). It will change the published parameter to 'true' and change the
#' status parameter to 'publish'.
#' 
#' @param path_site path to the local root storing the site files
#' @param dir_rmd directory containing R Markdown files (inputs)
#' @param dir_md directory containing markdown files (outputs)
#' @param url_images where to store/get images created from plots directory +"/" (relative to path_site)
#' @param out_ext the file extention to use for processed files.
#' @param in_ext the file extention of input files to process.
#' @param recursive should rmd files in subdirectories be processed.
#' @return nothing.
#' @author Jason Bryer <jason@bryer.org> edited by Andy South and Matthew Upson <matthew.a.upson@gmail.com>

rmd2md <- function(
  path_site = getwd(),
  dir_rmd = "_rmd",
  dir_md = "_posts",                              
  #dir_images = "figures",
  url_images = "figures/",
  out_ext = '.md', 
  in_ext = '.Rmd', 
  recursive = FALSE                 
  ) {
  
  require(knitr, quietly=TRUE, warn.conflicts=FALSE)
  require(testthat, quietly=TRUE, warn.conflicts=FALSE)
  
  #andy change to avoid path problems when running without sh on windows 
  
  files <- list.files(
    path = file.path(path_site,dir_rmd), 
    pattern = in_ext, 
    ignore.case = TRUE, 
    recursive = recursive
  )
  
  test_that(
    "There are relevant files in the relevant folder",
    expect_false(length(files)==0)
  )
  
  for(f in files) {
    
    content <- readLines(
      file.path(path_site,dir_rmd,f)
    )
    
    # Which lines include the yaml
    
    frontMatter <- which(substr(content, 1, 3) == '---')
    
    test_that(
      "Yaml contains a status and published line", {
        expect_false(which(substr(content, 1, 7) == 'status:') == 0)
        expect_false(which(substr(content, 1, 10) == 'published:') == 0)  
      })
    
    statusLine <- which(
      substr(content, 1, 7) == 'status:'
    )
    
    publishedLine <- which(
      substr(content, 1, 10) == 'published:'
    )
    
    status <- unlist(strsplit(content[statusLine], ':'))[2]
    status <- sub('[[:space:]]+$', '', status)
    status <- sub('^[[:space:]]+', '', status)
      
    if (tolower(status) == 'process') {
    
    #This is a bit of a hack but if a line has zero length (i.e. a
    #black line), it will be removed in the resulting markdown file.
    #This will ensure that all line returns are retained.
    content[nchar(content) == 0] <- ' '
    message(paste('Processing ', f, sep=''))

    # This line does not work to change the status and published lines.
    
    content[statusLine] <- 'status: publish'
    content[publishedLine] <- 'published: true'
    
    #andy change to path
    
    outFile <- file.path(
      path_site, 
      dir_md, 
      paste0(substr(f, 1, (nchar(f)-(nchar(in_ext)))), out_ext)
    )
    

    print("**********************************************************")
    print(paste("Writing file to:", outFile))
    print("**********************************************************")    
    
    test_that(
      "Outfile has been produced and makes sense",
      {
      expect_is(outFile,"character")
      #expect_true(exists(outFile))
      expect_true(dir.exists(file.path(path_site,dir_md)))
      }
    )
    
    # render_markdown(strict=TRUE)
    # render_markdown(strict=FALSE) #code didn't render properly on blog
    
    # andy change to render for jekyll
    render_jekyll(highlight = "pygments")
    # render_jekyll(highlight = "prettify") #for javascript
    
    opts_knit$set(out.format='markdown') 
    
    # andy BEWARE don't set base.dir!! it caused me problems
    # "base.dir is never used when composing the URL of the figures; it is 
    # only used to save the figures to a different directory. 
    # The URL of an image is always base.url + fig.path"
    # https://groups.google.com/forum/#!topic/knitr/18aXpOmsumQ
    
    opts_knit$set(base.url = "/")
    opts_chunk$set(fig.path = url_images)                     
    # andy I could try to make figures bigger
    # but that might make not work so well on mobile
    # opts_chunk$set(fig.width  = 8.5,)
    #               fig.height = 5.25)

    try(
      knit(
        text = content, 
        output = outFile
        ), 
      silent = FALSE
      )
    
    } else {
    
      print(
        paste("Ignoring", file.path(path_site,dir_rmd,f))
        )
      
    }
  }
  invisible()
  
  # Last thing is to remove exif tags from jpgs in figures folder
  # Requires linux tool exiv2. Check system is linux first...
  
  os <- Sys.info()['sysname']
  
  if (os == "Linux") {
  
  system("exiv2 rm figures/*.jpg")
    
  } else {
    
   warning("exiv2 tool not available on non-linux systems. Be aware that exif data attached to JPEG files will be published too!")
     
  }

    
}

rmd2md()
