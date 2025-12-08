---
title: "Post with Flowchart"
categories:
  - know-how
tags:
  - mermaid
  - flowchart

---

## My Sample Diagram

Here is a simple **flowchart**:

```mermaid
graph TD;
    A[Start] --> B(Process Input);
    B --> C{Check Status?};
    C -- Yes --> D[Finish];
    C -- No --> B;
```

### Steps to generate using _minimal mistakes_ theme
1.  Add the following codes to the custom.html under root/head folder (if not present, create it).
>
        <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
        <script>
        // Configuration block
          mermaid.initialize({
            // Tell Mermaid to look inside elements with class 'language-mermaid'
            startOnLoad: false,
            theme: 'default', // Options: 'default', 'dark', 'forest', 'neutral'
            securityLevel: 'loose' 
          });
        // Function to process and render the diagrams after the page is loaded
          function initMermaid() {
            // Find all the code blocks marked with 'language-mermaid'
            document.querySelectorAll('.language-mermaid').forEach(function(codeElement) {
              // Get the raw diagram text
              let graphDefinition = codeElement.textContent;
        // Create a new div to hold the rendered diagram
          let wrapper = document.createElement('div');
          wrapper.className = 'mermaid';
          wrapper.textContent = graphDefinition;
        // Replace the original code block with the new div
          codeElement.parentNode.replaceWith(wrapper);
        });
        // Render the diagrams found in the new divs
        mermaid.init(undefined, '.mermaid');
          }
        // Run the initialization function once the entire page is ready
            document.addEventListener('DOMContentLoaded', initMermaid);
          </script>

2. Use the mermaid syntax to represent the diagrams

_follow this_ [link!](https://vijayakumarcnp.github.io/know-how/bomonike-aibenchmark/) if you want maths formulas to be displayed in your content