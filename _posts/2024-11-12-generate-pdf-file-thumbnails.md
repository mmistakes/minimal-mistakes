---
layout: single
title: "Generating Thumbnails for PDF Files in SwiftUI"
date: 2024-11-12 14:55:00 +0530
excerpt: "Learn how to generate thumbnails for PDF files in SwiftUI by reading files with fileImporter and creating thumbnail images with PDFKit"
seo_title: "SwiftUI PDF Thumbnail Generation Tutorial"
seo_description: "A guide to generating PDF thumbnails in SwiftUI by reading files with fileImporter and using custom thumbnail generation."
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
---
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/L19GYmhJL7A?controls=0" frameborder="0" allowfullscreen></iframe>


The following article is a companion piece to my Multimodal Chat app using Gemini SDK tutorial published a while ago. One of the essential parts of the app is to provide a preview of the data selected for processing with Gemini. In case of PDF files, this requires generating a thumbnail of the document(s) selected. Selecting documents can be done using the `.fileImporter` modifier by specifying the file types you want to allow as input for processing. If file import succeeds, you get an array of file urls pointing to the actual files on disk. Then, we can process them as follows:

## Code Breakdown
The `processDocumentItem(for:)` function handles reading file data and generating a thumbnail if the file is a PDF. It returns a tuple containing the file type, file data, and thumbnail image.

```
@MainActor
func processDocumentItem(for url: URL) throws -> (String, Data, UIImage) {
    let readResult = readFileData(from: url)
    switch readResult {
    case .success(let data):
        if url.pathExtension.lowercased() == "pdf" {
            let thumbnail = try generatePDFThumbnail(for: url)
            return ("application/pdf", data, thumbnail)
        } else {
            throw NSError(domain: "UnsupportedTypeError", code: -4, userInfo: [NSLocalizedDescriptionKey: "Unsupported file type"])
        }
    case .failure(let error):
        throw NSError(domain: "DataError", code: -4, userInfo: [NSLocalizedDescriptionKey: "Failed to read from url: \(url), error: \(error.localizedDescription)"])
    }
}
```

### How It Works ?
* Read File Data: The function first calls `readFileData(from:)` to load the file's contents as Data.
* Generate Thumbnail for PDFs: If the file is a PDF `(url.pathExtension.lowercased() == "pdf")`, the code generates a thumbnail using `generatePDFThumbnail(for:)`.
* Handle Errors: If reading the file fails or the file is not a PDF, the function throws an error.

### Helper Function: `readFileData(from:)`
This helper function reads data from the file URL. It uses `startAccessingSecurityScopedResource()` to ensure proper file access when working with sandboxed files, which is common in SwiftUI’s `fileImporter`.
```
private func readFileData(from url: URL) -> Result<Data, Error> {
    let accessing = url.startAccessingSecurityScopedResource()
    defer {
        if accessing {
            url.stopAccessingSecurityScopedResource()
        }
    }
    return Result { try Data(contentsOf: url) }
}
```

### Thumbnail Generation: `generatePDFThumbnail(for:)`
The `generatePDFThumbnail(for:)` function creates a thumbnail image from the first page of the PDF. Using `PDFKit` and `UIGraphicsImageRenderer`, it draws the page onto an image at a scaled size.
```
private func generatePDFThumbnail(for url: URL) throws -> UIImage {
    guard let document = PDFDocument(url: url), let page = document.page(at: 0) else {
        throw NSError(domain: "ThumbnailServiceError", code: -4, userInfo: [NSLocalizedDescriptionKey: "Failed to load PDF document"])
    }
    
    let pdfSize = page.bounds(for: .mediaBox).size
    let scale = min(largestImageDimension / pdfSize.width, largestImageDimension / pdfSize.height)
    let thumbnailSize = CGSize(width: pdfSize.width * scale, height: pdfSize.height * scale)

    let renderer = UIGraphicsImageRenderer(size: thumbnailSize)
    let thumbnail = renderer.image { ctx in
        UIColor.white.set()
        ctx.fill(CGRect(origin: .zero, size: thumbnailSize))
        ctx.cgContext.translateBy(x: 0.0, y: thumbnailSize.height)
        ctx.cgContext.scaleBy(x: 1.0, y: -1.0)
        ctx.cgContext.drawPDFPage(page.pageRef!)
    }
    return thumbnail
}
```
#### Steps
* Load the PDF Document: The function retrieves the PDF document and the first page.
* Calculate Thumbnail Size: It scales the page to a maximum dimension (largestImageDimension) to fit within a defined thumbnail size.
* Draw the Page: The `UIGraphicsImageRenderer` draws the page onto a new `UIImage`, which is returned as the thumbnail.

## Summary
This approach efficiently generates thumbnails for PDFs by reading the file data, identifying file types, and using custom drawing for PDFs. It provides a robust way to integrate PDF thumbnail generation into SwiftUI apps. You can watch the tutorial on [YouTube](https://youtu.be/L19GYmhJL7A) or checkout the complete source code on [GitHub](https://github.com/anupdsouza/ios-gemini-chat/tree/multimodal)

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
