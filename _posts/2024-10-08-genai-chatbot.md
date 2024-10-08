# Building an Intelligent Chatbot with Streamlit, Azure Search, and GPT

Are you interested in creating a powerful, context-aware chatbot for your website or application? In this blog post, I'll walk you through the process of building a smart chatbot using Streamlit, Azure Cognitive Search, and GPT. This project combines the ease of use of Streamlit for creating web apps, the robust search capabilities of Azure, and the natural language processing power of GPT.

## Project Overview

Our chatbot is designed to answer user queries by searching through a knowledge base and generating context-aware responses. It features:

1. A user-friendly interface built with Streamlit
2. Integration with Azure Cognitive Search for efficient information retrieval
3. GPT-powered response generation for natural, contextual answers
4. Multiple persona options for varied interaction styles
5. Chat history tracking for a more coherent conversation flow

Let's dive into the key components and how they work together!

## The Code

Here's a breakdown of the main parts of our chatbot application:

### Imports and Setup

```python
import os
import time
import streamlit as st
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
from azure.search.documents.models import QueryType
from gpt_return_st import *
from PIL import Image
import base64
```

We start by importing necessary libraries. Streamlit for the web interface, Azure SDK for search functionality, and custom modules for GPT integration.

### Persona Definitions

```python
PERSONAS = {
    "TLM Manager": st.secrets["tlm_manager"],
    "PSD Manager": st.secrets["psd_manager"]
}
```

We define different personas for our chatbot, allowing users to interact with different "personalities" or knowledge bases.

### Streamlit UI Setup

```python
st.set_page_config(page_title="My AskAI Query Chatbot", layout="wide")
st.title("How may I help you today?")

persona_selected = st.selectbox("Select a Persona:", options=list(PERSONAS.keys()))

st.markdown("### 🤖 Ask your Question:")
user_input = st.text_input('Enter your question here:', 'At what temperature can I use the Ora technology')
```

This section sets up the Streamlit interface, including the title, persona selection dropdown, and input field for user questions.

### Azure Search Integration

```python
service_name = st.secrets["searchservice"]
key = st.secrets["searchkey"]
searchservice = st.secrets["searchservice"]
endpoint = "https://{}.search.windows.net/".format(searchservice)
index_name = st.secrets["index"]
azure_credential = AzureKeyCredential(key)

search_client = SearchClient(endpoint=endpoint, index_name=index_name, credential=azure_credential)
```

Here, we set up the connection to Azure Cognitive Search using the provided credentials and create a search client.

### Search and Response Generation

```python
results = search_client.search(user_input,
                               filter=filter,
                               query_type=QueryType.SEMANTIC,
                               query_language="en-us",
                               query_speller="lexicon",
                               semantic_configuration_name="content-search",
                               top=3)

# Extract content and references
# ...

prompt = create_prompt(content, user_input)
conversation.append({"role": "user", "content": user_input})

reply = generate_answer(conversation)
answer = reply.choices[0].message.content
```

This section performs the search query, extracts relevant content, and generates a response using GPT.

### Chat History Management

```python
if 'conversation_history' not in st.session_state:
    st.session_state.conversation_history = []

# ... (display chat history in sidebar)

st.session_state.conversation_history.append((user_input, answer))
```

We manage and display the chat history, storing it in Streamlit's session state for persistence across interactions.

## How It Works

1. **User Interface**: The user selects a persona and enters a question through the Streamlit interface.
2. **Azure Search**: The question is sent to Azure Cognitive Search, which returns relevant information from the knowledge base.
3. **Context Preparation**: The search results, along with the chat history and selected persona, are used to create a context for GPT.
4. **GPT Response**: The prepared context is sent to GPT, which generates a natural language response.
5. **Display and Storage**: The response is displayed to the user and stored in the chat history.

## Conclusion

This project demonstrates how to combine Streamlit, Azure Cognitive Search, and GPT to create a powerful, context-aware chatbot. The resulting application is not only intelligent but also user-friendly and easily customizable.

By leveraging Azure's search capabilities and GPT's language understanding, we've created a chatbot that can provide accurate, contextual responses to user queries. The multi-persona feature adds an extra layer of versatility, allowing the chatbot to adapt its tone and knowledge base to different scenarios.

Feel free to adapt this code for your own projects, and don't hesitate to explore further enhancements like adding more personas, improving the UI, or integrating with other APIs to expand the chatbot's capabilities.

Happy coding!