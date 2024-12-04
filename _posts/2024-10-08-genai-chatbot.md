# Building a RAG Search System with Azure AI and Streamlit

In this post, I'll walk you through how I built a Retrieval-Augmented Generation (RAG) search system using Azure AI services and Streamlit. This project combines the power of Azure Cognitive Search with Large Language Models to create an intelligent chatbot that can answer questions based on your own knowledge base.

## What is RAG?

Before diving into the implementation details, let's understand what RAG is. Retrieval-Augmented Generation is a technique that enhances Large Language Models by allowing them to access and use external knowledge. Instead of relying solely on the model's trained knowledge, RAG systems first retrieve relevant information from a curated knowledge base and then use that information to generate more accurate and contextual responses.

## System Architecture

The system consists of several key components:

1. **Document Processing Pipeline**: Handles PDF documents by:
   - Splitting them into pages
   - Extracting text (including tables)
   - Chunking content into manageable sections
   - Uploading to Azure Blob Storage

2. **Azure Cognitive Search**: Indexes and stores the processed documents for efficient retrieval

3. **Streamlit Interface**: Provides a user-friendly chat interface with:
   - Persona selection
   - Conversation history
   - Dynamic response generation

## Key Implementation Features

### Document Processing

One of the most interesting aspects of this project is how it handles document processing. The system can process PDF documents intelligently:

```python
def get_document_text(filename):
    if localpdfparser:
        reader = PdfReader(filename)
        pages = reader.pages
        for page_num, p in enumerate(pages):
            page_text = p.extract_text()
            page_map.append((page_num, offset, page_text))
    else:
        form_recognizer_client = DocumentAnalysisClient(...)
        # Use Azure Form Recognizer for advanced document analysis
```

The system can even handle complex tables by converting them to HTML format:

```python
def table_to_html(table):
    table_html = "<table>"
    rows = [sorted([cell for cell in table.cells if cell.row_index == i], 
            key=lambda cell: cell.column_index) 
            for i in range(table.row_count)]
    # Process table structure...
    return table_html
```

### Smart Text Chunking

To optimize search performance, the system implements intelligent text chunking:

1. Maintains context across chunks with overlapping sections
2. Respects sentence boundaries
3. Handles special cases like tables spanning multiple chunks

### Azure Search Integration

The search index is designed to support semantic search capabilities:

```python
search_index = SearchIndex(
    name=index,
    fields=[
        SimpleField(name="id", type="Edm.String", key=True),
        SearchableField(name="content", type="Edm.String", analyzer_name="en.microsoft"),
        SimpleField(name="category", type="Edm.String", filterable=True, facetable=True),
        # Additional fields...
    ],
    semantic_settings=SemanticSettings(...)
)
```

## The User Experience

The Streamlit interface provides a clean, chat-like experience where users can:

1. Select different personas (e.g., TLM Manager, PSD Manager)
2. Ask questions naturally
3. See conversation history
4. Get responses with source references

## Deployment and Configuration

The system is designed to be easily deployable with minimal configuration:

1. Configure Azure services in `secrets.toml`:
   ```toml
   [default]
   searchservice = "your-search-service-name"
   searchkey = "your-search-service-admin-api-key"
   index = "your-index-name"
   ```

2. Run with a simple command:
   ```bash
   streamlit run app.py
   ```

## Technical Considerations

When building this system, I had to address several technical challenges:

1. **Document Processing**: Handling various PDF formats and table structures
2. **Chunking Strategy**: Balancing chunk size with context preservation
3. **Search Relevance**: Tuning search parameters for optimal results
4. **Response Generation**: Creating contextual prompts for the LLM

## Future Improvements

Some potential enhancements I'm considering:

1. Multi-language support
2. Advanced document preprocessing options
3. Custom embeddings for improved search relevance
4. Real-time document updates

## Conclusion

This RAG search system demonstrates how to combine Azure AI services with modern UI frameworks to create a powerful, user-friendly search experience. The modular architecture makes it easy to extend and customize for different use cases.

Feel free to check out the [GitHub repository](https://github.com/your-username/rag-search-azure-ai) for the complete code and documentation.

## Resources

- [Azure Cognitive Search Documentation](https://docs.microsoft.com/en-us/azure/search/)
- [Streamlit Documentation](https://docs.streamlit.io/)
- [Python PDF Processing](https://pypdf.readthedocs.io/)