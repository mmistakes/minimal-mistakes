# Building Query Connect: A Natural Language Interface for E-commerce Analytics

In this blog post, I'll walk you through how I built Query Connect, an innovative solution that combines the power of Google Cloud's BigQuery, Vertex AI's Gemini model, and Streamlit to create a natural language interface for e-commerce data analysis.

## The Vision

Imagine being able to ask your database questions in plain English and get instant, visualized responses. That's exactly what Query Connect achieves. Whether you're asking about top-selling products, customer behavior patterns, or inventory status, the system translates your natural language queries into precise SQL and presents the results in an intuitive format.

## Technical Architecture

### Core Components

1. **Data Storage**: BigQuery for scalable data warehousing
2. **Natural Language Processing**: Vertex AI's Gemini model
3. **Frontend**: Streamlit for the web interface
4. **Data Visualization**: Plotly for interactive charts

### Function Declaration System

The heart of Query Connect is its sophisticated function declaration system. Here's how we define our core functions:

```python
list_datasets_func = FunctionDeclaration(
    name="list_datasets",
    description="Get a list of datasets that will help answer the user's question",
    parameters={
        "type": "object",
        "properties": {},
    },
)

sql_query_func = FunctionDeclaration(
    name="sql_query",
    description="Get information from data in BigQuery using SQL queries with proper date handling",
    parameters={
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": """SQL query that will help give quantitative answers to the user's question..."""
            }
        },
        "required": ["query"],
    },
)
```

### Intelligent Visualization Selection

One of the most interesting features is the automatic visualization type selection based on data characteristics:

```python
def determine_visualization_type(query_results: List[Dict[str, Any]]) -> str:
    df = pd.DataFrame(query_results)
    
    # Check for temporal data
    temporal_columns = df.select_dtypes(include=['datetime64']).columns
    if len(temporal_columns) > 0:
        return "time_series"
    
    # Check for geographic data
    if all(col in df.columns for col in ['latitude', 'longitude']):
        return "geographic"
    
    # Check for categorical vs numerical data
    numerical_columns = df.select_dtypes(include=[np.number]).columns
    if len(numerical_columns) >= 2:
        return "correlation"
    elif len(numerical_columns) == 1:
        return "distribution"
    
    return "comparison"
```

## Data Processing Pipeline

### 1. Query Processing
When a user submits a question, Query Connect:
1. Processes the natural language input through Gemini
2. Identifies required database operations
3. Generates optimized SQL queries
4. Executes queries with proper error handling

### 2. Data Quality Checks

The system includes comprehensive data quality validation:

```python
def check_data_quality(table_id: str, columns: str) -> Dict[str, Any]:
    quality_checks = {}
    for column in columns_list:
        query = f"""
        SELECT
            COUNT(*) as total_rows,
            COUNT(DISTINCT {column}) as unique_values,
            COUNT(CASE WHEN {column} IS NULL THEN 1 END) as null_count,
            COUNT(CASE WHEN TRIM({column}) = '' THEN 1 END) as empty_string_count
        FROM `{table_id}`
        """
        results = client.query(query).to_dataframe()
        quality_checks[column] = results.to_dict('records')[0]
    
    return quality_checks
```

### 3. Visualization Generation

Query Connect automatically generates appropriate visualizations using Plotly:

```python
def generate_visualization(query_results: str, viz_type: str, title: str) -> go.Figure:
    df = pd.DataFrame(eval(query_results))
    
    if viz_type == "time_series":
        fig = px.line(df, x=df.columns[0], y=df.columns[1], title=title)
    elif viz_type == "distribution":
        fig = px.histogram(df, x=df.columns[0], title=title)
    # Additional visualization types...
    
    return fig
```

## Security and Error Handling

### Secure Credential Management

```python
credentials_dict = {
    "type": "service_account",
    "project_id": st.secrets["gcp_project_id"],
    "private_key_id": st.secrets["gcp_private_key_id"],
    "private_key": st.secrets["gcp_private_key"],
    # Additional credentials...
}
```

### Query Safety

- Resource usage limits through BigQuery job configuration
- Query sanitization
- Error handling with user-friendly messages

## User Interface Design

The Streamlit interface is organized into three main sections:

1. **Dataset Overview**: Information about available data
2. **Example Questions**: Pre-built queries for common analyses
3. **Chat Interface**: The main query input area

### Interactive Elements

```python
tab1, tab2, tab3 = st.tabs(["Dataset Overview", "Available Data", "Example Questions"])

with tab1:
    st.markdown("""
        Explore a comprehensive ecommerce dataset containing detailed information about:
        
        | Category | Description |
        |----------|-------------|
        | 🛍️ Products & Orders | Complete order history and product details |
        | 👥 Customer Behavior | Customer demographics and purchase patterns |
        | 📈 Sales Metrics | Revenue, margins, and performance indicators |
        | 🔍 Product Analytics | Categories, attributes, and inventory data |
    """)
```

## Performance Optimization

Several techniques ensure optimal performance:

1. **Query Optimization**
   - Smart date handling
   - Efficient table joins
   - Result size limits

2. **Response Caching**
   - Session state management
   - Efficient data storage

3. **Resource Management**
   - Maximum bytes billed limits
   - Query timeout settings

## Deployment

The deployment process is streamlined using a bash script that:

1. Enables required Google Cloud services
2. Sets up the BigQuery dataset
3. Installs dependencies
4. Launches the Streamlit application

```bash
#!/usr/bin/env bash
# Enable required services
gcloud services enable aiplatform.googleapis.com
gcloud services enable bigquery.googleapis.com
gcloud services enable bigquerydatatransfer.googleapis.com

# Set up dataset
bq mk --force=true --dataset thelook_ecommerce
# Additional setup steps...
```

## Future Improvements

1. **Enhanced Natural Language Processing**
   - Context awareness
   - Query refinement suggestions
   - Multi-language support

2. **Advanced Visualizations**
   - Custom chart types
   - Interactive dashboards
   - Export capabilities

3. **Performance Enhancements**
   - Query optimization
   - Caching improvements
   - Parallel processing

## Conclusion

Query Connect demonstrates how modern cloud services and AI can be combined to create powerful, user-friendly data analysis tools. The project showcases the potential of natural language interfaces in democratizing data analysis and making complex database operations accessible to non-technical users.

The complete code is available on [GitHub](https://github.com/yourusername/query-connect), and we welcome contributions from the community. Whether you're interested in improving the natural language processing, adding new visualization types, or enhancing the user interface, there's room for innovation and improvement.

Feel free to reach out with questions or suggestions through GitHub issues or discussions!